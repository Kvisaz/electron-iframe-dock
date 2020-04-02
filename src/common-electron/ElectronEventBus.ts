import {IEventBus, IEventListener} from '../common/commonInterfaces';

export class ElectronEventBus  implements IEventBus{
    private eventEmitter: NodeJS.EventEmitter;

    constructor(eventEmitter: NodeJS.EventEmitter) {

    }

    emit(eventName: string, data?: any): any {
        this.eventEmitter.emit(eventName, data);
    }

    sub(eventName: string, callback: IEventListener): any {
        this.eventEmitter.on(eventName, callback);
    }

}
