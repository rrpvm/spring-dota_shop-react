import IMultiComboBoxItem from "../model/IMultiComboBoxItem";
export interface IMultiComboBoxProp {
    selectedItems: IMultiComboBoxItem[];
    allVariants: IMultiComboBoxItem[];
    dataBindCallback: (newSelectItems: IMultiComboBoxItem[]) => void;
}