import {IWindowApplet} from '../ElectronAppInterfaces';
import {IEventBus, IEventBusConnector} from '../../common/commonInterfaces';
import {EventBus, subscribeObject} from '../../common/EventBus';
import {WindowEventConnector} from '../connector/WindowEventConnector';

export class ElectronWindowApplet implements IWindowApplet {
    protected eventBus: IEventBus;

    constructor(windowName: string) {
        this.eventBus = EventBus.getInstance(windowName);
    }

    start(): void {
        console.log('..... ElectronWindowApplet .... ');
    }

    protected connectEventBuses(
        localEvents: Array<string>,
        inEvents: Array<string>,
        outEvents: Array<string>
    ) {

        this.subscribeLocalEvents(localEvents);
        this.connectAppEventBus(inEvents, outEvents);
    }

    private subscribeLocalEvents(eventNames: Array<string>) {
        subscribeObject(eventNames,
            this,
            this.eventBus);
    }

    private connectAppEventBus(inEvents: Array<string>, outEvents: Array<string>) {
        const eventConnector: IEventBusConnector = new WindowEventConnector(this.eventBus);
        eventConnector.connect(inEvents, outEvents)
    }
}
