package com.rrpvm.server.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "user doesnt exist")
public class UserDoesNotExistException extends NullPointerException{//наследование от рантайма - не самая лучшая мысль

}
