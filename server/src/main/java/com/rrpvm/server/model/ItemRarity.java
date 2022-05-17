package com.rrpvm.server.model;

import com.sun.istack.NotNull;

public enum ItemRarity {
    IMMORTAL("immortal"),ARCANE("arcane"),COMMON("common"),MYTHICAL("mythical");
    private String rarity;

    ItemRarity(@NotNull String rarity) {
        this.rarity = rarity;
    }

    public String getRarity() {
        return this.rarity;
    }
}
