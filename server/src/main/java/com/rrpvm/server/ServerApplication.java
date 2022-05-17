package com.rrpvm.server;

import com.rrpvm.server.dao.ItemSellRepository;
import com.rrpvm.server.model.ItemRarity;
import com.rrpvm.server.model.ItemSell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
    @Autowired
    private ItemSellRepository itemRepository;
    @Override
    public void run(String... args) throws Exception {
       /*  ArrayList<ItemSell> items = new ArrayList<>(Arrays.asList(
                new ItemSell("ethereal blade", "morphling", ItemRarity.IMMORTAL.getRarity(),"", 19.99, 20),
                new ItemSell("crown of tears", "morphling", ItemRarity.IMMORTAL.getRarity(),"", 1.99, 90),
                new ItemSell("blades of alacrity", "morphling", ItemRarity.IMMORTAL.getRarity(), "",10.00, 14),
                new ItemSell("blades of alacrity2", "morphling", ItemRarity.IMMORTAL.getRarity(),"", 14.00, 11),
                new ItemSell("some item", "morphling", ItemRarity.IMMORTAL.getRarity(),"", 11.00, 15))
        );
         itemRepository.saveAll(items);*/
    }
}
