package com.rrpvm.server.controller;

import com.rrpvm.server.dao.ItemSellRepository;
import com.rrpvm.server.model.ItemSell;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminViewController {
    @Autowired
    private ItemSellRepository itemRepository;

    @PostMapping("/item")
    public ResponseEntity<String> createItem(@RequestBody @NotNull ItemSell item) {
        ItemSell existedItem = itemRepository.findByItemName(item.getItemName());
        if(existedItem == null){
            ItemSell result = itemRepository.save(item);
            if(result != null)
            return ResponseEntity.ok(result.getItemImage());
        }
        else{
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(null);
    }
}
