export default class ItemRarityDTO {
    readonly rarity: string;
    readonly hexColor: string;
    readonly id: number;
    constructor(rarity: string, hexColor: string, id: number) {
        this.rarity = rarity;
        this.hexColor = hexColor;
        this.id = id;
    } 
}