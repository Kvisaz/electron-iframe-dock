export class Task {
    static order<T>(f: () => T): Promise<T> {
        return new Promise((resolve => {
            setTimeout(() => {
                const result: T = f();
                resolve(result);
            })
        }));
    }
}
