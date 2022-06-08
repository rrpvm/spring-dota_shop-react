package com.rrpvm.server.model.entity;

import com.rrpvm.server.dto.request.ItemSellDTO;
import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "items")
public class ItemSell {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long itemId;
    @Column(name = "item_name")
    private String itemName;
    @Column(name = "item_hero")
    private String itemHero;
    @Column(name = "item_rarity")
    private String itemRarity;
    @Column(name = "item_price")
    private double itemPrice;
    @Column(name = "item_available")
    private int itemsAvailable;
    @Column(name = "item_image")
    private String itemImageURL;

    public ItemSell(@NotNull String itemName, @NotNull String itemHero, @NotNull String itemRarity, @NotNull String itemImageURL, double itemPrice, int itemsAvailable) {
        this.itemName = itemName;
        this.itemHero = itemHero;
        this.itemRarity = itemRarity;
        this.itemPrice = itemPrice;
        this.itemsAvailable = itemsAvailable;
        this.itemImageURL = itemImageURL;
    }
    public ItemSell(@NotNull ItemSellDTO vOther, String itemImageURL) {
        this.itemName = vOther.getItemName();
        this.itemHero = vOther.getItemHero();
        this.itemRarity = vOther.getItemRarity();
        this.itemPrice = vOther.getItemPrice();
        this.itemsAvailable = vOther.getItemAvailable();
        this.itemImageURL = itemImageURL;
    }
    public ItemSell() {

    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemHero() {
        return itemHero;
    }

    public void setItemHero(String itemHero) {
        this.itemHero = itemHero;
    }

    public String getItemRarity() {
        return itemRarity;
    }

    public void setItemRarity(String itemRarity) {
        this.itemRarity = itemRarity;
    }

    public double getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(double itemPrice) {
        this.itemPrice = itemPrice;
    }

    public int getItemsAvailable() {
        return itemsAvailable;
    }

    public void setItemsAvailable(int itemsAvailable) {
        this.itemsAvailable = itemsAvailable;
    }

    public String getItemImageURL() {
        return itemImageURL;
    }

    public void setItemImageURL(String itemImage) {
        this.itemImageURL = itemImage;
    }
}
