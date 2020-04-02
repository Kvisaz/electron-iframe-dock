import {app, globalShortcut, BrowserWindow, Menu} from 'electron';
import {IEventBus} from '../../common/commonInterfaces';
import {EventBus} from '../../common/EventBus';
import {AppEventBus, AppEvents} from '../../common-electron/connector/AppEventBus';

const mainBus: IEventBus = EventBus.getInstance(AppEventBus.MAIN_PROCESS);

const openFile = () => mainBus.emit(AppEvents.FileOpenStart);

app.on('ready', () => {
    // Регистрация слушателя сочетания клавиш 'CommandOrControl+Y'.
    globalShortcut.register('CommandOrControl+O', openFile)
})

mainBus.sub(AppEvents.FileOpenResult, (eventName, data) => {
    console.log('AppEvents.FileOpenResult', data);
})

export class MainMenu {
    static buildTemplate(window: BrowserWindow): Menu {
        return Menu.buildFromTemplate([
            {
                label: 'Open File',
                accelerator: 'CommandOrControl+O',
                click: openFile
            },
            {
                label: app.getName(),
                submenu: [
                    {label: `Hello`, click: () => console.log("Hello world")}
                ]
            },
            {
                label: 'Edit',
                // роли автоматически выполняются системным API!
                submenu: [
                    {label: 'Undo', role: 'undo'},
                    {type: 'separator'},
                    {label: 'Redo', role: 'redo'},
                    {label: 'Cut', role: 'cut'},
                    {label: 'Copy', role: 'copy'},
                    {label: 'Paste', role: 'paste'},
                ]
            },
            {
                label: 'Custom Menu',
                submenu: [/* We'll add more actions */]
            }
        ])
    }
}
