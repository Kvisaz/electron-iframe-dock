import {BrowserWindow, screen} from "electron";

export function createMainWindow(url: string): Promise<Electron.BrowserWindow> {
    // как открыть на весь экран - да сделать его размеры, как у дисплея
    const {width, height} = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        show: false,
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true // нужно для ipcRenderer
        }
    });

    // показывает когда окно готово
    win.once('ready-to-show', () => {
        win.show()
    })

    win.removeMenu();

    // comment this before publish
    win.webContents.openDevTools();

    // and load the index.html of the app
    return win.loadURL(url)
        .then(() => win);
}
