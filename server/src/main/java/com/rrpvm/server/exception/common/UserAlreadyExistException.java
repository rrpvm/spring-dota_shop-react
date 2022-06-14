package com.rrpvm.server.exception.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "username already exist")
public class UserAlreadyExistException extends Exception{
}
