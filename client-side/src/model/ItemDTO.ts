export default class ItemDTO {
    private _itemName: string;
    private _itemImage: string;
    private _itemHero: string;
    private _itemRarity: string;
    private _itemPrice: number;
    private _itemsAvaliable: number;
    constructor(itemName: string, itemImage: string, itemHero: string, itemRarity: string, itemPrice: number, itemsAvaliable: number) {
        this._itemHero = itemHero;
        this._itemName = itemName;
        this._itemImage = itemImage;
        this._itemRarity = itemRarity;
        this._itemPrice = itemPrice;
        this._itemsAvaliable = itemsAvaliable;
    }
    public get itemName(): string {
        return this._itemName;
    }
    public get itemImage(): string {
        return this._itemImage;
    }
    public get itemHero(): string {
        return this._itemHero;
    }
    public get itemRarity(): string {
        return this._itemRarity;
    }
    public get itemPrice(): number {
        return this._itemPrice;
    }
    public get itemsAvaliable(): number {
        return this._itemsAvaliable;
    }
};