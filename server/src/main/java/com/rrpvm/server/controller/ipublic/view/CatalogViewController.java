package com.rrpvm.server.controller.ipublic.view;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Arrays;
import java.util.stream.Collectors;

import com.rrpvm.server.dao.repository.ItemSellRepository;
import com.rrpvm.server.dto.response.ItemRarityDTO;
import com.rrpvm.server.model.ItemRarity;
import com.rrpvm.server.model.entity.ItemSell;


@RestController
@RequestMapping("public/v1/catalog")
@CrossOrigin("http://localhost:3000")
public class CatalogViewController {
    private final ItemSellRepository itemRepository;

    CatalogViewController(ItemSellRepository itemSellRepository) {
        this.itemRepository = itemSellRepository;
    }

    @GetMapping("/items")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ItemSell>> getItems(@RequestParam(required = false) String[] rarity, @RequestParam(required = false, name = "name") String nameContains) {
        if (rarity == null) return ResponseEntity.noContent().build();
        if (nameContains == null) nameContains = new String("");
        nameContains = String.format("%%%s%%", nameContains);//%nameContains%
        List<ItemSell> items = itemRepository.findAllByItemRaritiesAndNameContainingIgnoreCase(
                new ArrayList<>(Arrays.asList(rarity))
                        .stream()
                        .map(item -> item.toLowerCase())
                        .collect(Collectors.toList()), nameContains
        );
        if (items.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(items);
    }

    @GetMapping("/rarities")//get_rarities
    public ResponseEntity<List<ItemRarityDTO>> sendItemsRarity() {
        return ResponseEntity.ok
                (Arrays.stream(ItemRarity.values())
                        .map((item) -> new ItemRarityDTO(item))
                        .collect(Collectors.toCollection(LinkedList::new)));
    }
}
