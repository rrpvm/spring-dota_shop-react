package com.rrpvm.server.dto;

import com.rrpvm.server.model.ItemRarity;

public class ItemRarityResponse {
    private int id;
    private String rarity;

    public ItemRarityResponse(int id, String rarity) {
        this.id = id;
        this.rarity = rarity;
    }
    public ItemRarityResponse(ItemRarity rarity) {
        this.id = rarity.ordinal();
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

}
