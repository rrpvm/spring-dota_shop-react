package com.rrpvm.server.dto.response;

import com.rrpvm.server.model.ItemRarity;

public class ItemRarityDTO {
    private int id;
    private String rarity;

    public ItemRarityDTO(int id, String rarity) {
        this.id = id;
        this.rarity = rarity;
    }
    public ItemRarityDTO(ItemRarity rarity) {
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
