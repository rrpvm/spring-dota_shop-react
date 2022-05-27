export default class SortBarItem {
    private readonly _sortFunction: CallableFunction;
    private readonly _name: string;
    private _sortLowerToHigher: boolean;
    constructor(sortFunc: CallableFunction, name: string, Az: boolean = true) {
        this._sortFunction = sortFunc;
        this._name = name;
        this._sortLowerToHigher = Az;
    }
    get sortFunction(): CallableFunction {
        return this._sortFunction;
    }
    get name(): string {
        return this._name;
    }
    get isLowerToHigher(): boolean {
        return this._sortLowerToHigher;
    }
    set sortLowerToHigher(value: boolean) {
        this._sortLowerToHigher = value;
    }
}