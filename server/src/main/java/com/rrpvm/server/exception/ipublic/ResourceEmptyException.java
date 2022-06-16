package com.rrpvm.server.exception.ipublic;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NO_CONTENT)
public class ResourceEmptyException extends RuntimeException {
}
