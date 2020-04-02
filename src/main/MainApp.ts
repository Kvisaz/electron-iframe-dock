import {BrowserWindow} from "electron";
import {IEventBus, IStringFile} from '../common/commonInterfaces';
import {EventBus, subscribeObject} from '../common/EventBus';
import {AppEventBus, AppEvents} from '../common-electron/connector/AppEventBus';
import {IAppState} from '../common/state/StateInterfaces';
import {AppState} from './logic/AppState';
import {Store} from '../common/state/Store';
import {MainAppEventConnector} from '../common-electron/connector/MainAppEventConnector';
import {MainWindowBuilder} from '../renderer/main/MainWindowBuilder';
import {FileManager} from '../common-electron/services/FileManager';

export class MainApp {
    private eventBus: IEventBus;

    private fileManager: FileManager;
    private store: Store;

    private mainWindow: BrowserWindow;
    private children: Array<BrowserWindow>;

    constructor() {
        this.children = [];
    }

    start() {
        this.initCore();

        this.subscribeLocalEvents();

        new MainWindowBuilder()
            .build()
            .then(win => this.onMainWindowStart(win));
    }

    private initCore() {
        this.children = [];
        const newState: IAppState = new AppState();
        const savedState: IAppState = null; // todo

        this.store = new Store(savedState || newState);
        this.eventBus = EventBus.getInstance(AppEventBus.MAIN_PROCESS);
        this.fileManager = new FileManager();
    }

    /*****************************
     *  Event Handlers
     ****************************/

    private subscribeLocalEvents() {
        subscribeObject([
                AppEvents.FileOpenStart,
                AppEvents.MainWindowStartFinish
            ],
            this,
            this.eventBus);
    }

    private async onFileOpenStart() {
        const value: IStringFile = await this.fileManager.openFileAsString([
            {name: 'Текстовые файлы', extensions: ['txt','html', 'htm','css', 'js', 'ts','.json']},
            {name: 'TXT', extensions: ['txt']},
            {name: 'HTML', extensions: ['html', 'htm']},
            {name: 'CSS,JS', extensions: ['css', 'js', 'ts', 'jsx', 'tsx']},
            {name: 'Все файлы', extensions: ['*']}
        ]);
        this.fileOpenResult(value)
    }

    private onMainWindowStartFinish(e: string, d: any) {
        console.warn('MainWindowStartFinish', e, d);
    }


    /*****************************
     *  other
     ****************************/

    private connectOtherProcessEvents() {
        // send local events to other window
        const eventBusConnector = new MainAppEventConnector(this.children, this.eventBus);

        eventBusConnector.out([
            AppEvents.FileOpenResult,
            AppEvents.MainWindowStartFinish
        ]);
    }


    private fileOpenResult(value: IStringFile) {
        this.store.update({
            documentLastFilePath: value.path
        })
        this.eventBus.emit(AppEvents.FileOpenResult, value);
    }

    private onMainWindowStart(win: BrowserWindow) {
        this.mainWindow = win;
        this.children.push(win);

        this.connectOtherProcessEvents();

        console.log('onMainWindowStart.............');
        this.eventBus.emit(AppEvents.MainWindowStartFinish, 'hello')
    }
}
