import CheckBoxListPropAdapter from "./CheckBoxListPropAdapter";

export default class CheckBoxListProp extends CheckBoxListPropAdapter {
    value: boolean;
    constructor(id: number, name: string, hexColor: string, value: boolean) {
        super(id, name, hexColor);
        this.value = value;
    }
};