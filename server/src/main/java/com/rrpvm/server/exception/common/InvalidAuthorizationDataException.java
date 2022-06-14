package com.rrpvm.server.exception.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "invalid data")
public class InvalidAuthorizationDataException extends  Exception {
}
