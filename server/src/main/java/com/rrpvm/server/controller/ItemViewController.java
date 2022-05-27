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
    private static final int ITEMS_IN_COLUMN = 3;

    @GetMapping("/items/{dataPosition}")
    public ResponseEntity<List<ItemSell>> getItems(@RequestParam(required = false) String[] rarity, @PathVariable(required = true) int dataPosition) {
        if (rarity == null) return ResponseEntity.noContent().build();
        List<ItemSell> items = itemRepository.findAllByItemRarities(new ArrayList<>(Arrays.asList(rarity)));
        int avaliableItems = Math.abs(items.size() - dataPosition);
        return ResponseEntity.ok(items.subList(dataPosition, dataPosition + Math.min(ITEMS_IN_COLUMN, avaliableItems)));
    }

    @GetMapping("/items/length")
    public ResponseEntity<Integer> sendItemsLength(@RequestParam(required = false) String[] rarity) {
        if (rarity == null) return ResponseEntity.noContent().build();
        List<ItemSell> items = itemRepository.findAllByItemRarities(new LinkedList<>(Arrays.asList(rarity)));
        return ResponseEntity.ok(items.size());
    }

    @GetMapping("/rarities")//get_rarities
    public ResponseEntity<List<ItemRarityResponse>> sendItemsRarity() {
        return ResponseEntity.ok(Arrays.stream(ItemRarity.values()).map((item) -> new ItemRarityResponse(item)).collect(Collectors.toCollection(LinkedList::new)));
    }
}
