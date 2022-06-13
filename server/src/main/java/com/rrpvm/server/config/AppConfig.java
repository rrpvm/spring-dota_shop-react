package com.rrpvm.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import java.util.concurrent.locks.ReentrantLock;

@Configuration
public class AppConfig {
    @Bean
    public CommonsMultipartResolver commonsMultipartResolver() {
        final CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
        commonsMultipartResolver.setMaxUploadSize(-1);//no limits (default 1 mb)
        return commonsMultipartResolver;
    }
    @Bean
    @Scope("prototype")
    public ReentrantLock createReentrantLock() {
        return new ReentrantLock();
    }



}
