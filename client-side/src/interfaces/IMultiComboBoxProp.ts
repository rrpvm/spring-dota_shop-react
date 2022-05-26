export interface IMultiComboBoxProp {
    selectedItems: string[];
    allVariants: string[];
    dataBindCallback: (newSelectItems: string[]) => void;
}