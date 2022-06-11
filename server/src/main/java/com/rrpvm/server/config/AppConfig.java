package com.rrpvm.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import java.util.concurrent.locks.ReentrantLock;

@Configuration
public class AppConfig {
    @Bean
    @Scope("prototype")
    public ReentrantLock createReentrantLock(){
        return new ReentrantLock();
    }
}
