/**************
 *  Events
 *************/
export interface IEventBus {
    emit(eventName: string, data?: any): any;

    sub(eventName: string, callback: IEventListener): any;
}

export interface IEventListener {
    (eventName: string, data?: any): void
}

export interface ISimpleEventListener {
    (data?: any): void
}

export interface IEventListeners {
    [message: string]: Array<IEventListener>;
}

export interface IMap<T> {
    [key: string]: T
}

export interface IArrayMap<T> {
    [key: string]: Array<T>
}

export interface IBuilder<T, P> {
    build(props?: P): T
}

export interface IObject {
    [key: string]: any;
}

// транслятор локальной шины с другими процессами
export interface IEventBusConnector {
    connect(inEvents: Array<string>, outEvents:Array<string>): void;

    // транслировать наружу
    out(events: Array<string>): void;

    // принимать события
    in(events: Array<string>): void;
}

export interface IStringFile {
    path: string;
    content: string;
}
