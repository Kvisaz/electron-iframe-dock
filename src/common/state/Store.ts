import {IAppState, IPropListener, IPropListeners} from './StateInterfaces';
import {Task} from '../Task';

export class Store {
    private readonly state: IAppState;
    // массив слушателей по изменениям каждого свойства
    private listenersHash: IPropListeners;

    get: IAppState;

    constructor(appState: IAppState) {
        this.state = appState;
        this.listenersHash = {};

        this.get = new Proxy(appState, {
            set(target, prop, val) {
                console.warn('Store.get[key] is read-only')
                return false;
            }
        })
    }

    // Store обновляет State и вызывает подписчиков только для указанных State
    update(props: object) {
        Object.keys(props).forEach(key => {
            // @ts-ignore
            this.state[key] = props[key];

            const propListeners = this.listenersHash[key];
            if (propListeners) {
                propListeners.forEach(l =>
                    Task.order(l(this.state[key]))
                )
            }
        });
    }

    subscribe(propName: string, listener: IPropListener) {
        if (this.listenersHash[propName] == null) {
            this.listenersHash[propName] = [];
        }
        this.listenersHash[propName].push(listener);
    }

    unsubscribe(propName: string, listener: IPropListener) {
        const listeners = this.listenersHash[propName];
        if (listeners == null || listeners.length == 0) return;
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
    }
}
