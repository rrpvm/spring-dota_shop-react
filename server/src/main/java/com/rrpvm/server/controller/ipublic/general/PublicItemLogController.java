package com.rrpvm.server.controller.ipublic.general;

import com.rrpvm.server.dao.repository.ItemLogRepository;
import com.rrpvm.server.dao.repository.ItemSellRepository;
import com.rrpvm.server.model.entity.ItemSell;
import com.rrpvm.server.model.entity.ItemSellLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/v1/item_logs")
@CrossOrigin("http://localhost:3000")
public class PublicItemLogController {
    @Autowired
    private ItemLogRepository itemLogRepository;
    @Autowired
    private ItemSellRepository itemSellRepository;

    @GetMapping("/log/list")//get all logs
    public ResponseEntity<List<ItemSellLog>> getLogs() {
        return ResponseEntity.ok(itemLogRepository.findAll());
    }

    @GetMapping("/log/list")//get all logs
    public ResponseEntity<List<ItemSellLog>> getLogsOfItem(@RequestParam(name = "item_id") Long itemId) {
        if (itemId == null) {
            ResponseEntity.badRequest().body("item id missing");
        }
        ItemSell itemSell = itemSellRepository.findById(itemId).get();
        if (itemSell == null) {
            ResponseEntity.badRequest().body("item id is incorrect");
        }
        List<ItemSellLog> result = itemLogRepository.findItemSellLogsByItem(itemSell);
        if (result.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(result);
    }
}
