import {IEventBus, IEventBusConnector} from '../../common/commonInterfaces';

export class CommonConnector implements IEventBusConnector{
    constructor(protected localBus: IEventBus) {
    }
    connect(inEvents: Array<string>, out: Array<string>): void {
        this.in(inEvents);
        this.out(out);
    }

    in(events: Array<string>): void {
    }

    out(events: Array<string>): void {
    }
}
