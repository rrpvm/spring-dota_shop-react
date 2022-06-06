package com.rrpvm.server.dto.request;

import org.springframework.web.multipart.MultipartFile;

public class ItemSellDTO {
    private String itemName;
    private String itemHero;
    private String itemRarity;
    private Double itemPrice;
    private int itemAvailable;

    public ItemSellDTO(String itemName, String itemHero, String itemRarity, Double itemPrice, int itemAvailable) {
        this.itemName = itemName;
        this.itemHero = itemHero;
        this.itemRarity = itemRarity;
        this.itemPrice = itemPrice;
        this.itemAvailable = itemAvailable;
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

    public int getItemAvailable() {
        return itemAvailable;
    }

}
