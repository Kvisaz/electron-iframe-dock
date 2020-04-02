import {dialog, OpenDialogReturnValue, FileFilter} from 'electron';

export class FileDialog {

    openFile(fileFilters: FileFilter[] = null): Promise<OpenDialogReturnValue> {
        return dialog
            .showOpenDialog({
                filters: fileFilters,
                properties: ['openFile'],
            })
    }
}

