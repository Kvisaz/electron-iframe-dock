export interface IAppState {
    [key: string]: any
}

export interface IPropListeners {
    [key: string]: Array<IPropListener>
}

export interface IPropListener {
    (prop: any): any
}
