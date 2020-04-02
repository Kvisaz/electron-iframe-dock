import {Task} from './Task';
import {IEventBus, IEventListener, IEventListeners, IMap, IObject} from './commonInterfaces';
import {ArrayUtils} from './utils/ArrayUtils';
import {StringUtils} from './utils/StringUtils';

/***
 *  Использование
 *  подписаться на сообщения
 *  EventBus
 *      .sub("messageType1", (message, data)=>{})
 *      .sub("messageType2", (message, data)=>{})
 *      .sub("messageType3", (message, data)=>{});
 *
 *  сообщить
 *  EventBus.emit("messageType1", data?:any);
 *
 *  для использования в конкретных играх - уместно объявить класс-потомкс уникальным именем
 *  типа MyGameEvents
 *  и использовать именно MyGameEvents
 */

export class EventBus implements IEventBus {
    private readonly listeners: IEventListeners;

    private static defaultInstance: EventBus; // дефолтная общая шина

    private static instanceMap: IMap<EventBus> = {}; //  именнованные шины

    protected constructor() {
        this.listeners = {};
    }

    /***********
     *  STATIC
     ***********/

    static getInstance(busName?: string): EventBus {
        let instance: EventBus;
        if (busName != null) {
            if (EventBus.instanceMap[busName] == null) EventBus.instanceMap[busName] = new EventBus();
            instance = EventBus.instanceMap[busName];
        } else {
            if (EventBus.defaultInstance == null) EventBus.defaultInstance = new EventBus();
            instance = EventBus.defaultInstance;
        }

        return instance;
    }

    static sub(message: string, listener: IEventListener) {
        const listeners = EventBus.getInstance().getListeners(message)
            || EventBus.getInstance().initListeners(message);
        listeners.push(listener);
    }

    static emit(message: string, data?: any) {
        EventBus.getInstance().emit(message, data);
    }

    /***********
     *  PUBLIC
     ***********/

    getListeners(message: string): Array<IEventListener> {
        return this.listeners[message];
    }

    initListeners(message: string): Array<IEventListener> {
        this.listeners[message] = [];
        return this.listeners[message];
    }

    sub(message: string, listener: IEventListener): EventBus {
        const listeners = this.getListeners(message) || this.initListeners(message);
        listeners.push(listener);
        return this;
    }

    emit(message: string, data?: any) {
        const listeners = this.getListeners(message);
        if (listeners) listeners.forEach(listener => {
            /**
             * каждый листенер исполняется в свою очередь в EventLoop
             * - поэтому ошибка в одном листенере не будет ломать стек с другими
             */
            Task.order(() => {
                listener(message, data);
            })
        });
    }

    // подписать на все перечисленные сообщения 1 обработчик
    subAll(messages: Array<string>, listener: IEventListener): EventBus {
        messages.forEach(message => this.sub(message, listener));
        return this;
    }

    unsub(message: string, listener: IEventListener): EventBus {
        const listeners = this.getListeners(message);
        if (listeners == null) return this;
        ArrayUtils.removeChild(listeners, listener);
        return this;
    }

    bindEventBus(otherBus: IEventBus, eventMap: IEventMap) {
        const thisBus: IEventBus = this;

        Object.keys(eventMap).forEach(localEventName => {
            const otherEventName = eventMap[localEventName];

            // подписываемся на локальные, перевыпускаем на чужую под таким же
            thisBus.sub(
                localEventName,
                (message, data) =>
                    otherBus.emit(message, data)
            );

            // ловим чужие - перевыпускаем как под именем из eventMap
            otherBus.sub(localEventName,
                (localEventName, data) => {
                    thisBus.emit(otherEventName, data)
                });
        });
    }

}



/**
 *  мэппинг одних событий в другие
 */
export interface IEventMap {
    [localEventName: string]: string
}

/**
 *  Подписать объект на массив событий через шину
 *  в объекте должны быть методы-обработчики начинающиеся с `on`+eventName
 * @param eventNames
 * @param obj
 * @param bus
 */

export function subscribeObject(eventNames: Array<string>, obj: IObject, bus: IEventBus) {
    eventNames.forEach(eventName => {

        eventName = StringUtils.capitalizeFirstLetter(eventName);
        const handlerName: string = 'on' + eventName;

        const handler = obj[handlerName] as Function;

        if (handler) {
            bus.sub(eventName, handler.bind(obj));
        } else {
            console.warn(`make event handler for ${eventName}`);
        }
    })
}
