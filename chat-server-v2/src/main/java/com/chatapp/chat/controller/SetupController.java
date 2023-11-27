package com.chatapp.chat.controller;

import com.chatapp.chat.service.SetupDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/setup")
public class SetupController {
    @Autowired
    private SetupDataService setupDataService;
    @PostMapping
    public void setupData(){
        setupDataService.setupData();
    }
}
