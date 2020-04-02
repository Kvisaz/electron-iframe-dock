import {BrowserWindow, ipcMain, WebContents} from "electron";
import {IEventBus, IEventBusConnector} from '../../common/commonInterfaces';
import {CommonConnector} from './CommonConnector';

// функция коннектора - соединить локальные шины с системной шиной Electron
export class MainAppEventConnector extends CommonConnector implements IEventBusConnector {
    private childrenEmitters: Array<WebContents>;

    constructor(childrenWindows: Array<BrowserWindow>, localBus: IEventBus) {
        super(localBus);
        this.childrenEmitters = childrenWindows.map(w => w.webContents);
    }

    in(events: Array<string>): void {
        events.forEach(name => {
            ipcMain.on(name, ((event, args) => this.localBus.emit(name, args)))
        })
    }

    out(events: Array<string>): void {
        events.forEach(name => {
            this.localBus.sub(name, (eventName, data) => {
                this.childrenEmitters.forEach(emitter => {
                    emitter.send(name, data)
                })
            })
        })
    }
}
