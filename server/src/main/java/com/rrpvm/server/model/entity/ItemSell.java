package com.rrpvm.server.model.entity;

import com.sun.istack.NotNull;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Size;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.GenerationType;
import javax.persistence.FetchType;

import com.rrpvm.server.dto.request.ItemCreateDTO;

import java.util.List;


@Entity
@Table(name = "items_list")
public class ItemSell {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "item_id")
    private Long itemId;
    @Column(name = "item_name", nullable = false)
    @Size(min = 4, max = 255)
    private String itemName;
    @Column(name = "item_hero", nullable = false)
    @Size(min = 2, max = 255)
    private String itemHero;
    @Column(name = "item_rarity", nullable = false)
    @Size(min = 4, max = 64)
    private String itemRarity;
    @Column(name = "item_description", nullable = false)
    @Size(min = 1, max = 2048)
    private String itemDescription;
    @Column(name = "item_price", nullable = false)
    @DecimalMin(value = "0")
    private double itemPrice;
    @Column(name = "item_available", nullable = false)
    @DecimalMin(value = "0")
    private int itemsAvailable;
    @Column(name = "item_image", nullable = false)
    private String itemImageURL;
    @OneToMany(fetch = FetchType.LAZY, targetEntity = ItemSoldLog.class)
    @JoinTable(name = "items_sell_history",
            joinColumns = {
                    @JoinColumn(name = "item_id", referencedColumnName = "item_id", nullable = false, unique = false)
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "consumer_id", referencedColumnName = "consumer_id", nullable = false, unique = false),
                    @JoinColumn(name = "log_id", referencedColumnName = "log_id", nullable = false, unique = false)
            })
    private List<ItemSoldLog> liquidityLog;

    public ItemSell(@NotNull String itemName, @NotNull String itemHero, @NotNull String itemRarity, @NotNull String itemDescription, @NotNull String itemImageURL, double itemPrice, int itemsAvailable, List<ItemSoldLog> logs) {
        this.itemName = itemName;
        this.itemHero = itemHero;
        this.itemRarity = itemRarity;
        this.itemDescription = itemDescription;
        this.itemPrice = itemPrice;
        this.itemsAvailable = itemsAvailable;
        this.itemImageURL = itemImageURL;
        this.liquidityLog = logs;
    }

    public ItemSell(@NotNull ItemCreateDTO vOther, String itemImageURL) {
        this.itemDescription = vOther.getDescription();
        this.itemName = vOther.getItemName();
        this.itemHero = vOther.getItemHero();
        this.itemRarity = vOther.getItemRarity();
        this.itemPrice = vOther.getItemPrice();
        this.itemsAvailable = vOther.getItemsAvailable();
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

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public List<ItemSoldLog> getLiquidityLog() {
        return liquidityLog;
    }

    public void setLiquidityLog(List<ItemSoldLog> liquidityLog) {
        this.liquidityLog = liquidityLog;
    }
}
