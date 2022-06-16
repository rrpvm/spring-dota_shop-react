package com.rrpvm.server.exception.ipublic;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.IOException;
@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such files")
public class ResourceNotFoundException extends IOException {
}
