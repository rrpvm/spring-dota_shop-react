export default class MultiComboBoxItem {
    private readonly _text: string;
    private readonly _id: number;
    constructor(id: number, text: string) {
        this._id = id;
        this._text = text;
    }
    public get text(): string {
        return this._text;
    }
    public get id(): number {
        return this._id;
    }
}