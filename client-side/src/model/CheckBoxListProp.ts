import CheckBoxListPropAdapter from "./CheckBoxListPropAdapter";

export default class CheckBoxListProp extends CheckBoxListPropAdapter {
    value: boolean = true;
    constructor(id: number, name: string, hexColor: string, value: boolean) {
        super(id, name, hexColor);
        this.value = value;
    }
};