import RarityInfoDTO from "../RarityInfoDTO";


export default class ItemViewDTO {
    private _itemId: number;
    private _itemName: string;
    private _itemHero: string;
    private _itemRarity: RarityInfoDTO;
    private _itemPrice: number;
    private _itemsAvailable: number;
    private _itemImageURL: string;

    constructor(itemId: number, itemName: string, itemHero: string, itemRarity: RarityInfoDTO, itemPrice: number, itemsAvaliable: number, itemImageURL: string) {
        this._itemId = itemId;
        this._itemName = itemName;
        this._itemHero = itemHero;
        this._itemRarity = itemRarity;
        this._itemPrice = itemPrice;
        this._itemsAvailable = itemsAvaliable;
        this._itemImageURL = itemImageURL;
    }

    get itemId(): number {
        return this._itemId;
    }

    set itemId(value: number) {
        this._itemId = value;
    }

    get itemName(): string {
        return this._itemName;
    }

    set itemName(value: string) {
        this._itemName = value;
    }

    get itemHero(): string {
        return this._itemHero;
    }

    set itemHero(value: string) {
        this._itemHero = value;
    }

    get itemRarity(): RarityInfoDTO {
        return this._itemRarity;
    }

    set itemRarity(value: RarityInfoDTO) {
        this._itemRarity = value;
    }

    get itemPrice(): number {
        return this._itemPrice;
    }

    set itemPrice(value: number) {
        this._itemPrice = value;
    }

    get itemsAvailable(): number {
        return this._itemsAvailable;
    }

    set itemsAvailable(value: number) {
        this._itemsAvailable = value;
    }

    get itemImageURL(): string {
        return this._itemImageURL;
    }

    set itemImageURL(value: string) {
        this._itemImageURL = value;
    }
}