package com.rrpvm.server.model;

import com.sun.istack.NotNull;

public enum ItemRarity {
    COMMON("common", "#b0c3d9"),
    UNCOMMON("uncommon", "#5e98d9"),
    RARE("rare", "#4b69ff"),
    MYTHICAL("mythical","#8847ff"),
    LEGENDARY("legendary","#d32ce6"),
    IMMORTAL("immortal","#b28a33"),
    ARCANA("arcana","#ade55c");
    private String rarity;
    private String hexColor;

    ItemRarity(@NotNull String rarity, @NotNull String hexColor) {
        this.rarity = rarity;
        this.hexColor = hexColor;
    }

    public String getRarity() {
        return this.rarity;
    }

    public String getHexColor() {
        return this.hexColor;
    }
}
