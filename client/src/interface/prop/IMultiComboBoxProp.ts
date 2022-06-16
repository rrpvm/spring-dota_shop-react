import MultiComboBoxItem from "../../model/MultiComboBoxItem";
export interface IMultiComboBoxProp {
    selectedItems: MultiComboBoxItem[];
    allVariants: MultiComboBoxItem[];
    dataBindCallback: (newSelectItems: MultiComboBoxItem[]) => void;
}