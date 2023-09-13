export class Model {
    private data: string;

    constructor(data: string) {
        this.data = data;
    }

    getData(): string {
        return this.data;
    }

    setData(data: string): void {
        this.data = data;
    }
}