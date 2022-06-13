
//DTO - public access
export default class ItemCreateDTO {
    public itemName:string;
    public itemHero:string;
    public itemRarity:string;
    public itemDescription : string;
    public itemPrice:number;
    public itemsAvailable: number;
    constructor(itemName: string, itemHero: string, itemRarity: string,itemDescription:string, itemPrice: number, itemsAvaliable: number) {
        this.itemName = itemName;
        this.itemHero = itemHero;
        this.itemRarity = itemRarity;
        this.itemDescription = itemDescription;
        this.itemPrice = itemPrice;
        this.itemsAvailable = itemsAvaliable;
    }
};