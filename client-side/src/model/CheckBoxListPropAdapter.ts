import ItemRarityDTO from "./ItemRarityDTO";

export default class CheckBoxListPropAdapter {
    id: number;
    value: boolean;
    name: string;
    hexColor: string;
    constructor(id: number, value: boolean, name: string, hexColor: string) {
        this.id = id;
        this.value = value;
        this.name = name;
        this.hexColor = hexColor;
    }
    static build = (itemRarity: ItemRarityDTO) => {
        return new CheckBoxListPropAdapter(itemRarity.id, false, itemRarity.rarity, itemRarity.hexColor);
    };
};