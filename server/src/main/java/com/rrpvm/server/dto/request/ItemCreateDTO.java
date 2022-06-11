package com.rrpvm.server.dto.request;

public class ItemCreateDTO {
    private final String itemName;
    private final String itemHero;
    private final String itemRarity;
    private final String itemDescription;
    private final Double itemPrice;
    private final int itemsAvailable;

    public ItemCreateDTO(String itemName, String itemHero, String itemRarity,String itemDescription, Double itemPrice,int itemAvailable) {
        this.itemName = itemName;
        this.itemHero = itemHero;
        this.itemRarity = itemRarity;
        this.itemDescription = itemDescription;
        this.itemPrice = itemPrice;
        this.itemsAvailable = itemAvailable;
    }

    public String getItemName() {
        return itemName;
    }

    public String getItemHero() {
        return itemHero;
    }

    public String getItemRarity() {
        return itemRarity;
    }

    public Double getItemPrice() {
        return itemPrice;
    }

    public int getItemsAvailable() {
        return itemsAvailable;
    }

    public String getDescription() {
        return itemDescription;
    }
}
