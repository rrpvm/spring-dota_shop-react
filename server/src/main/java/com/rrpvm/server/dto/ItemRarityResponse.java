package com.rrpvm.server.dto;

import com.rrpvm.server.model.ItemRarity;

public class ItemRarityResponse {
    private int id;
    private String rarity;
    private String hexColor;

    public ItemRarityResponse(int id, String rarity, String hexColor) {
        this.id = id;
        this.rarity = rarity;
        this.hexColor = hexColor;
    }
    public ItemRarityResponse(ItemRarity rarity) {
        this.id = rarity.ordinal();
        this.hexColor = rarity.getHexColor();
        this.rarity = rarity.getRarity();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRarity() {
        return rarity;
    }

    public void setRarity(String rarity) {
        this.rarity = rarity;
    }

    public String getHexColor() {
        return hexColor;
    }

    public void setHexColor(String hexColor) {
        this.hexColor = hexColor;
    }
}
