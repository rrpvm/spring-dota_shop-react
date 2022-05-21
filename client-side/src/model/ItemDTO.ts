export default class ItemDTO{
    itemName : string;
    itemImage : string;
    itemHero : string;
    itemRarity : string;
    itemPrice : number;
    itemsAvaliable : number;
    constructor(itemName : string, itemImage : string, itemHero : string,itemRarity:string, itemPrice : number, itemsAvaliable : number ){
        this.itemHero = itemHero;
        this.itemName = itemName;
        this.itemImage = itemImage;
        this.itemRarity = itemRarity;
        this.itemPrice = itemPrice;
        this.itemsAvaliable = itemsAvaliable;
    }   
};