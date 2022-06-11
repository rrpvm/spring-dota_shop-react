package com.rrpvm.server.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.IOException;

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY, reason = "failed to convert image to an array of bytes")
public class ResourceConvertException extends IOException {
}
