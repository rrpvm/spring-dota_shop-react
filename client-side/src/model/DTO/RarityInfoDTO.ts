export default class RarityInfoDTO {
    public readonly rarity: string;
    public readonly id: number;
    constructor(rarity: string, id: number) {
        this.rarity = rarity;
        this.id = id;
    }
}