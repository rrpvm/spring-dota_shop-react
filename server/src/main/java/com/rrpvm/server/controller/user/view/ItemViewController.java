package com.rrpvm.server.controller.user.view;

import com.rrpvm.server.dao.repository.ItemSellRepository;
import com.rrpvm.server.model.entity.ItemSell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/item")
@CrossOrigin("*")
public class ItemViewController {
    @Autowired
    private ItemSellRepository itemSellRepository;

    @GetMapping("")
    private ResponseEntity<ItemSell> getItem(@RequestParam(name = "id", required = true) int id) {
        ItemSell item = null;
        try {
            item = itemSellRepository.findById((long)id).get();
        } catch (NoSuchElementException e) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(item);
    }
}
