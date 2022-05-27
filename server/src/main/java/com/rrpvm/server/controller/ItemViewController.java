package com.rrpvm.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;

import java.util.*;
import java.util.stream.Collectors;

import com.rrpvm.server.dao.repository.ItemSellRepository;
import com.rrpvm.server.dto.ItemRarityResponse;
import com.rrpvm.server.model.ItemRarity;
import com.rrpvm.server.model.ItemSell;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class ItemViewController {
    @Autowired
    private ItemSellRepository itemRepository;

    @GetMapping("/items")
    public ResponseEntity<List<ItemSell>> getItems(@RequestParam(required = false) String[] rarity, @RequestParam(required = false, name = "name") String nameContains) {
        if (rarity == null) return ResponseEntity.noContent().build();
        final String nameContainingFilter = nameContains == null ? "" : nameContains;
        List<ItemSell> items = itemRepository.findAllByItemRarities(
                        new ArrayList<>(Arrays.asList(rarity)))
                .stream()
                .filter(
                        item -> item.getItemName().trim().toLowerCase().contains(nameContainingFilter.trim())
                ).collect(Collectors.toList());
        return ResponseEntity.ok(items);
    }

    @GetMapping("/rarities")//get_rarities
    public ResponseEntity<List<ItemRarityResponse>> sendItemsRarity() {
        return ResponseEntity.ok(Arrays.stream(ItemRarity.values()).map((item) -> new ItemRarityResponse(item)).collect(Collectors.toCollection(LinkedList::new)));
    }
}
