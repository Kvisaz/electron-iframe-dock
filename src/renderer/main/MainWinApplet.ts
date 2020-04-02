import {IWindowApplet} from '../../common-electron/ElectronAppInterfaces';
import {AppEvents} from '../../common-electron/connector/AppEventBus';
import {ElectronWindowApplet} from '../../common-electron/window/ElectronWindowApplet';
import {IStringFile} from '../../common/commonInterfaces';

export class MainWinApplet extends ElectronWindowApplet implements IWindowApplet {

    constructor(eventBusName:string) {
        super(eventBusName);

        const localEvents: Array<string> = [
            AppEvents.FileOpenResult,
            AppEvents.MainWindowStartFinish
        ];

        const inEvents: Array<string> = [
            AppEvents.FileOpenResult,
            AppEvents.MainWindowStartFinish
        ];

        const outEvents: Array<string> = [];

        this.connectEventBuses(
            localEvents,
            inEvents,
            outEvents
            );
    }

    start(): void {
        console.log('👋 👋 👋 MainWinApplet 👋 👋 ');
    }

    /*****************************
     *  Event Handlers
     ****************************/
    private onFileOpenResult(e: string, stringFile: IStringFile) {
        console.log('👋 onFileOpenResult', e, stringFile.path);
        console.log(stringFile.content);

        const el = document.querySelector('textarea');
        el.value = stringFile.content;
    }

    private onMainWindowStartFinish(e: string, d: any) {
        console.log('👋 MainWindowStartFinish', e, d);
    }

    /*****************************
     *  other...
     ****************************/

}
