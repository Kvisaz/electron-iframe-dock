import {IEventBus} from '../../common/commonInterfaces';

export class ElectronEventConnector {
    // local -> external
    static out(bus: IEventBus, ipcBus: NodeJS.EventEmitter, events: Array<string>) {
        events.forEach(eventName => {
            bus.sub(eventName, (e,d)=>{
                ipcBus.emit(e,d);
            })
        })
    }

    // external-> local
    static in(bus: IEventBus, ipcBus: NodeJS.EventEmitter, events: Array<string>) {
        events.forEach(eventName => {
            ipcBus.on(eventName, (eventName, data) => {
                bus.emit(eventName, data)
            })
        })
    }
}
