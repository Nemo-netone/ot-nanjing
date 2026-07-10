package com.config;

import com.baomidou.mybatisplus.plugins.PaginationInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisPlusConfig {

    @Value("${DB_TYPE:mysql}")
    private String dbType;

    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor interceptor = new PaginationInterceptor();
        interceptor.setDialectType(dbType);
        return interceptor;
    }
}
