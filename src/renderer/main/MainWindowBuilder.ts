import {BrowserWindow, screen} from "electron";
import {MainMenu} from './MainMenu';
import {IElectronWindowBuilder} from '../../common-electron/ElectronAppInterfaces';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

export class MainWindowBuilder implements IElectronWindowBuilder {

    build(props?: object): Promise<Electron.BrowserWindow> {
        // как открыть на весь экран - да сделать его размеры, как у дисплея
        const {width, height} = screen.getPrimaryDisplay().workAreaSize;
        const win = new BrowserWindow({
            show: false,
            width: width,
            height: height,
            backgroundColor: '#9dd4bc',
            webPreferences: {
                nodeIntegration: true // нужно для ipcRenderer
            }
        });

        // показывает когда окно готово
        win.once('ready-to-show', () => {
            win.show()
        })

        win.setMenu(MainMenu.buildTemplate(win));

        // Open the DevTools.
        win.webContents.openDevTools();

        // and load the index.html of the app
        return win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
            .then(none => win);
    }
}
