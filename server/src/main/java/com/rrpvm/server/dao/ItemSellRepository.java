package com.rrpvm.server.dao;

import com.rrpvm.server.model.ItemSell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ItemSellRepository extends JpaRepository<ItemSell,Long> {
    ItemSell findByItemName(String itemName);
}
