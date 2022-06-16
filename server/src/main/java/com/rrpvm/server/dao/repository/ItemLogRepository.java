package com.rrpvm.server.dao.repository;

import com.rrpvm.server.model.entity.ItemSell;
import com.rrpvm.server.model.entity.ItemSellLog;
import com.rrpvm.server.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ItemLogRepository extends JpaRepository<ItemSellLog, Long> {
    List<ItemSellLog> findItemSellLogsByConsumer(User consumer);

    List<ItemSellLog> findItemSellLogsByItem(ItemSell item);
}
