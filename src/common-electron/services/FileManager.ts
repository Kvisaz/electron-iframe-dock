import {FileFilter, OpenDialogReturnValue} from "electron";
import {FileDialog} from './FileDialog';
import {IStringFile} from '../../common/commonInterfaces';

const fs = require('fs');

export class FileManager {
    private fileDialog: FileDialog;

    constructor() {
        this.fileDialog = new FileDialog();
    }

    openFileAsString(fileFilters: FileFilter[] = null): Promise<IStringFile> {
        let path: string = '';

        return this.fileDialog.openFile(fileFilters)
            .then((value: OpenDialogReturnValue) => {
                path = value.filePaths[0];
                return this.readFile(path);
            })
            .then(content => Promise.resolve({
                path: path,
                content: content
            }))
    }

    private readFile(path: string, encoding="utf-8"): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path,
                {encoding: encoding},
                (err: NodeJS.ErrnoException, data: string) => {
                if (err) reject(err);
                else resolve(data);
            });
        })


    }
}
