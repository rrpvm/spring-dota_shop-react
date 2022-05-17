package com.rrpvm.server.controller;

import com.rrpvm.server.dao.ItemSellRepository;
import com.rrpvm.server.model.ItemSell;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminViewController {
    @Autowired
    private ItemSellRepository itemRepository;
    @PostMapping("/update")
    public ResponseEntity<Nullable> getItemsLength(@RequestBody  @NotNull ItemSell item) {
        System.out.println(item.getItemImage());
        return ResponseEntity.ok(null);
    }
}
