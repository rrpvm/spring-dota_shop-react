package com.rrpvm.server.controller.ipublic.general;

import com.rrpvm.server.exception.ipublic.ResourceConvertException;
import com.rrpvm.server.exception.ipublic.ResourceEmptyException;
import com.rrpvm.server.exception.ipublic.ResourceNotFoundException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Paths;

@RestController
@RequestMapping("/public/v1/resources")
@CrossOrigin("http://localhost:3000")
public class ResourceHandler {
    @GetMapping(value = "/image/{url}", produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_GIF_VALUE})
    @ResponseStatus(value = HttpStatus.OK)
    public ResponseEntity<Resource> image(@PathVariable String url) throws ResourceNotFoundException, ResourceConvertException, ResourceEmptyException {
        String uri = null;
        ByteArrayResource inputStream = null;
        try {
            uri = getClass().getResource("/").getPath().concat("static/images/" + url).substring(1);
            inputStream = new ByteArrayResource(Files.readAllBytes(Paths.get(uri)));
        } catch (InvalidPathException e) {
            throw new ResourceNotFoundException();
        } catch (IOException e) {
            throw new ResourceConvertException();
        }
        if (inputStream.contentLength() == 0) throw new ResourceEmptyException();
        return ResponseEntity.status(HttpStatus.OK).contentLength(inputStream.contentLength()).body(inputStream);
    }
}
