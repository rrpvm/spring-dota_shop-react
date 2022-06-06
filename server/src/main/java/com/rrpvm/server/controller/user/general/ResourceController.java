package com.rrpvm.server.controller.user.general;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@RequestMapping("/resources")
@CrossOrigin("*")
public class ResourceController {
    @GetMapping(value = "/static/images/{url}", produces = {MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity<Resource> image(@PathVariable String url) {
        URI uri = null;
        ByteArrayResource inputStream = null;
        try {
            uri = getClass().getResource("/static/images/" + url).toURI();
            inputStream = new ByteArrayResource(Files.readAllBytes(Paths.get(uri)));
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(inputStream.contentLength())
                .body(inputStream);
    }
}
