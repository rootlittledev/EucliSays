package com.ethero.bot.euclisays.notifications.controller;

import com.ethero.bot.euclisays.notifications.model.Notification;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class NotificationController {

    @MessageMapping("/receive")
    @SendTo("/golden/notification")
    public Notification receiveNotification(Notification notification) throws Exception {
        Thread.sleep(1000); // simulated delay
        return notification;
    }


}
