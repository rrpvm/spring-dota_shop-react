import CheckBoxListProp from "../model/CheckBoxListProp";
export default interface ICheckBoxListProp {
    items: Array<CheckBoxListProp>;
    title : string;
    onCheckboxStateChanged : CallableFunction;
}