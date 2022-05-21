import ItemRarityDTO from "./ItemRarityDTO";

export default class CheckBoxListPropAdapter {
    id: number;
    name: string;
    hexColor: string;
    constructor(id: number, name: string, hexColor: string) {
        this.id = id;  
        this.name = name;
        this.hexColor = hexColor;
    }
    static build = (itemRarity: ItemRarityDTO) => {
        return new CheckBoxListPropAdapter(itemRarity.id, itemRarity.rarity, itemRarity.hexColor);
    };
};