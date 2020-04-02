import {BrowserWindow} from 'electron';
import {IBuilder, ISimpleEventListener} from '../common/commonInterfaces';


export interface IElectronWindowBuilder extends IBuilder<Promise<BrowserWindow>, object> {
}

// приложения в собственных окнах
export interface IWindowApplet {
    start(): void
}

export interface IEventEmitter {
    on(eventName: string, listener: ISimpleEventListener): void;
    emit(eventName:string, ...args: any[]): boolean;
}
