package com.rrpvm.server.controller.admin.view;

import com.rrpvm.server.dto.request.ItemCreateDTO;
import com.rrpvm.server.model.entity.ItemSell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.rrpvm.server.dao.repository.ItemSellRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class CreateItemViewController {
    @Autowired
    private ItemSellRepository itemRepository;

    @PostMapping(value = "/item" ,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<String> createItem(@RequestPart("file_image") MultipartFile itemImageData, @RequestPart("item_data") ItemCreateDTO itemToCreate) {
        if (itemImageData == null || itemToCreate == null) {
            //exception
            return ResponseEntity.badRequest().body("failed");
        }
        try {
            if (itemRepository.findByItemName(itemToCreate.getItemName()) != null)
                return ResponseEntity.badRequest().body("exist");
            byte[] decode = itemImageData.getBytes();
            String fileName = new StringBuilder(itemToCreate.getItemName()).append("_").append(itemImageData.getOriginalFilename()).toString();
            String path = new StringBuilder(getClass().getResource("/static/images/").getFile()).append(fileName).toString();
            File newImage = new File(path);
            FileOutputStream outputStream = new FileOutputStream(newImage);
            outputStream.write(decode);
            outputStream.close();
            itemRepository.save(new ItemSell(itemToCreate, fileName));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok().build();
    }
}
