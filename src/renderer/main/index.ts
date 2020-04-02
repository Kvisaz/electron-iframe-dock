import '../../index.css';
import {MainWinApplet} from './MainWinApplet';
import {IWindowApplet} from '../../common-electron/ElectronAppInterfaces';
import {AppEventBus} from '../../common-electron/connector/AppEventBus';


// запускаем апплет
const applet: IWindowApplet = new MainWinApplet(AppEventBus.WINDOW_MAIN);
applet.start();
