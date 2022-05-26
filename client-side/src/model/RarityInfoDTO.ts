export default class RarityInfoDTO {
    public readonly rarity: string;
    public readonly hexColor: string;
    public readonly id: number;
    constructor(rarity: string, hexColor: string, id: number) {
        this.rarity = rarity;
        this.hexColor = hexColor;
        this.id = id;
    }
}