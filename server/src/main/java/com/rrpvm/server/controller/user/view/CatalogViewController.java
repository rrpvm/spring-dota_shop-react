package com.rrpvm.server.controller.user.view;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;

import java.util.*;
import java.util.stream.Collectors;

import com.rrpvm.server.dao.repository.ItemSellRepository;
import com.rrpvm.server.dto.response.ItemRarityDTO;
import com.rrpvm.server.model.ItemRarity;
import com.rrpvm.server.model.entity.ItemSell;

@RestController
@RequestMapping("public/v1/catalog")
@CrossOrigin("*")
public class CatalogViewController {
    @Autowired
    private ItemSellRepository itemRepository;
    @GetMapping("/items")
    public ResponseEntity<List<ItemSell>> getItems(@RequestParam(required = false) String[] rarity, @RequestParam(required = false, name = "name") String nameContains) {
        if (rarity == null) return ResponseEntity.noContent().build();
        final String nameContainingFilter = new StringBuilder("%").append(nameContains == null ? "" : nameContains).append("%").toString();
        List<ItemSell> items = itemRepository.findAllByItemRaritiesAndNameContainingIgnoreCase(new ArrayList<>(Arrays.asList(rarity)), nameContainingFilter);
        return ResponseEntity.ok(items);
    }
    @GetMapping("/rarities")//get_rarities
    public ResponseEntity<List<ItemRarityDTO>> sendItemsRarity() {
        return ResponseEntity.ok(Arrays.stream(ItemRarity.values()).map((item) -> new ItemRarityDTO(item)).collect(Collectors.toCollection(LinkedList::new)));
    }
}
