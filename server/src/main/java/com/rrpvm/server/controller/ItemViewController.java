package com.rrpvm.server.controller;

import com.rrpvm.server.dao.ItemSellRepository;
import com.rrpvm.server.model.ItemSell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class ItemViewController {
    @Autowired
    private ItemSellRepository itemRepository;
    @GetMapping("/get_items/{dataPosition}")
    public ResponseEntity<List<ItemSell>> getItems(@RequestParam(required = false) String params, @PathVariable(required = true) int dataPosition) {
        final List<ItemSell> items = itemRepository.findAll();
        int avaliableItems = Math.abs(items.size() - dataPosition);
        return ResponseEntity.ok(items.subList(dataPosition, dataPosition + Math.min(3, avaliableItems)));
    }
    @GetMapping("/items_length")
    public ResponseEntity<Integer> getItemsLength() {
        return ResponseEntity.ok(itemRepository.findAll().size());
    }
}
