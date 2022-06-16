package com.rrpvm.server.controller.admin.view;

import com.rrpvm.server.dto.request.ItemCreateDTO;
import com.rrpvm.server.exception.admin.ItemAlreadyExistException;
import com.rrpvm.server.exception.user.ResourcePathAlreadyExist;
import com.rrpvm.server.model.entity.ItemSell;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import com.rrpvm.server.dao.repository.ItemSellRepository;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.concurrent.locks.ReentrantLock;

@RestController
@RequestMapping("/admin/v1/create")
@CrossOrigin(origins = "http://localhost:3000")
public class CreateItemViewController {
    private final ItemSellRepository itemRepository;
    private final ReentrantLock mutex;

    public CreateItemViewController(ItemSellRepository itemRepository, ReentrantLock mutex) {
        this.itemRepository = itemRepository;
        this.mutex = mutex;
    }

    @PostMapping(value = "/item", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> createItem(@RequestPart("file_image") MultipartFile itemImageData,
                                             @RequestPart("item_data") ItemCreateDTO itemToCreate)
            throws NullPointerException, ItemAlreadyExistException, ResourcePathAlreadyExist, IOException {
        if (itemToCreate == null || itemToCreate == null) {
            throw new NullPointerException("data mismatch");//unchecked
        }
        if (itemRepository.findByItemName(itemToCreate.getItemName()) != null)
            throw new ItemAlreadyExistException();
        byte[] decode = itemImageData.getBytes();
        String fileName = new StringBuilder(itemToCreate.getItemName()).append("_").append(itemImageData.getOriginalFilename()).toString();
        String path = new StringBuilder(getClass().getResource("/").getFile().substring(1)).append("static/images/").append(fileName).toString();
        File newImage = new File(path);
        newImage.getParentFile().mkdirs();
        if (newImage.exists()) {
            throw new ResourcePathAlreadyExist();
        }
        try {
            newImage.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
        FileOutputStream outputStream = new FileOutputStream(newImage);
        outputStream.write(decode);
        outputStream.close();
        // mutex.lock();
        itemRepository.save(new ItemSell(itemToCreate, fileName));
        // mutex.unlock();
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(value = {NullPointerException.class})
    private ResponseEntity<String> nullpointerDataExceptionHandler(NullPointerException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }

    @ExceptionHandler(value = {IOException.class})
    private ResponseEntity<Nullable> resolveImageNullpointer() {
        return ResponseEntity.badRequest().body(null);
    }

}
