import {IEventBus, IEventBusConnector} from '../../common/commonInterfaces';
import {ipcRenderer} from "electron";
import {CommonConnector} from './CommonConnector';

export class WindowEventConnector extends CommonConnector  implements IEventBusConnector {
    constructor(localBus: IEventBus) {
        super(localBus);
    }

    in(events: Array<string>): void {
        events.forEach(name => {
            ipcRenderer.on(name, (event, args) => {
                this.localBus.emit(name, args)
            })
        })
    }

    out(events: Array<string>): void {
        events.forEach(name => {
            this.localBus.sub(name, (eventName, data) => {
                ipcRenderer.send(name, data);
            })
        })
    }
}
