package com.rrpvm.server.dao;

import com.rrpvm.server.model.ItemSell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ItemSellRepository extends JpaRepository<ItemSell,Long> {
    ItemSell findByItemName(String itemName);
    List<ItemSell>findAllByItemRarity(String itemRarity);
    @Query( "select item from ItemSell item where item.itemRarity in :itemRarities" )
    List<ItemSell> findAllByItemRarities(@Param("itemRarities") List<String> itemRarities);
}
