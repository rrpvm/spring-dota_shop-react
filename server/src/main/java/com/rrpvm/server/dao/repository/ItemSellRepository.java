package com.rrpvm.server.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.rrpvm.server.model.ItemSell;


public interface ItemSellRepository extends JpaRepository<ItemSell, Long> {
    ItemSell findByItemName(String itemName);

    @Query("select item from ItemSell item where item.itemRarity in :itemRarities")
    List<ItemSell> findAllByItemRarities(@Param("itemRarities") List<String> itemRarities);
}
