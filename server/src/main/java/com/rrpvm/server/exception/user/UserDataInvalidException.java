package com.rrpvm.server.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.IOException;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class UserDataInvalidException extends IOException {
}
