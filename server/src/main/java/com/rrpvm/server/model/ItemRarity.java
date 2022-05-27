package com.rrpvm.server.model;

import com.sun.istack.NotNull;

public enum ItemRarity {
    COMMON("common"),
    UNCOMMON("uncommon"),
    RARE("rare"),
    MYTHICAL("mythical"),
    LEGENDARY("legendary"),
    IMMORTAL("immortal"),
    ARCANA("arcana");
    private String rarity;

    ItemRarity(@NotNull String rarity) {
        this.rarity = rarity;
    }
    public String getRarity() {
        return this.rarity;
    }

}
