export interface IMultiComboBoxProp {
    selectedItems: string[];
    allVariants: string[];
    selectItemCallback: (name: string) => void;
}