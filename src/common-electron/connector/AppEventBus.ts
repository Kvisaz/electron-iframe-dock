export const enum AppEventBus {
    MAIN_PROCESS = "MAIN_PROCESS",
    WINDOW_MAIN = "WINDOW_MAIN"
}

export const enum AppEvents {
    MainWindowStartFinish= "MainWindowStartFinish",
    FileOpenResult = "FileOpenResult", // data = IStringFile
    FileOpenStart = "FileOpenStart"
}
