package com.ethero.bot.euclisays.notifications.controller;

import com.ethero.bot.euclisays.notifications.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notification")
public class NotificationListener {

    private final SimpMessagingTemplate template;

    @Autowired
    public NotificationListener(SimpMessagingTemplate template) {
        this.template = template;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/receive")
    public void getNotification(@RequestBody Notification notification) throws InterruptedException {
        Thread.sleep(1000); // simulated delay
        this.template.convertAndSend("/golden/notification", notification);
    }

}