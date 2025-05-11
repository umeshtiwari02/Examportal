package com.examserver.helper;

public class UserNotFoundException extends Exception{

    UserNotFoundException() {
        super("User with this username is not found in database!!");
    }
    UserNotFoundException(String msg) {
        super(msg);
    }
}
