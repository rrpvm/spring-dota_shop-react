
//DTO - public access
export default class ItemCreateDTO {
    public itemName : string;
    public itemHero:string;
    public itemRarity:string;
    public itemPrice:number;
    public itemsAvailable: number;

    constructor(itemName: string, itemHero: string, itemRarity: string, itemPrice: number, itemsAvaliable: number) {
        this.itemName = itemName;
        this.itemHero = itemHero;
        this.itemRarity = itemRarity;
        this.itemPrice = itemPrice;
        this.itemsAvailable = itemsAvaliable;
    }
};