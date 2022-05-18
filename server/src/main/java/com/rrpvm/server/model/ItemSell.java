package com.rrpvm.server.model;

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
    @Column(name = "item_image")
    @Lob
    private String itemImage;
    @Column(name = "item_hame")
    private String itemHero;
    @Column(name = "item_rarity")
    private String itemRarity;
    @Column(name = "item_price")
    private double itemPrice;
    @Column(name = "item_avaliable")
    private int itemsAvaliable;

    public ItemSell(@NotNull String itemName,@NotNull  String itemHero, @NotNull  String itemRarity,@NotNull String itemImage, double itemPrice, int itemsAvaliable) {
        this.itemName = itemName;
        this.itemHero = itemHero;
        this.itemRarity = itemRarity;
        this.itemPrice = itemPrice;
        this.itemsAvaliable = itemsAvaliable;
        this.itemImage = itemImage;
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

    public int getItemsAvaliable() {
        return itemsAvaliable;
    }

    public void setItemsAvaliable(int itemsAvaliable) {
        this.itemsAvaliable = itemsAvaliable;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }
}
