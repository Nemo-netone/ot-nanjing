package com.controller;

import com.annotation.IgnoreAuth;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @IgnoreAuth
    @RequestMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("service", "ot-nanjing-api");
        result.put("ok", true);
        return result;
    }
}
