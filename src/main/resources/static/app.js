var stompClient = null;

var commandKey;
var commandText;
var contentUrl;
var soundUrl;
var notificationCss;
var commandDuration;

function setConnected(connected) {

}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/golden/notification', function (notification) {

            var notBody = JSON.parse(notification.body);

            commandKey = notBody.commandKey;
            commandText = notBody.text;
            contentUrl = notBody.contentUrl;
            soundUrl = notBody.soundUrl;
            notificationCss = notBody.commandCss;
            commandDuration = 10000;

            addNotification(commandKey, commandText, contentUrl, soundUrl, notificationCss, commandDuration);
        });
    });
}


function hideNotification(){
    $("#notification").hide();
}

function addNotification(commandKey, notificationText, contentUrl, soundUrl, css, duration){


    $("#notification").css('top', css.contentPositionV + "px");
    $("#notification").css('left', css.contentPositionH + "px");
    $("#notification").css('width', css.contentWidth);

    $("#notification-display-text").text(notificationText);
    $("#notification-display-text").css('color', css.textColor);
    $("#notification-display-text").css('font-size', css.textSize + "px");


    $("#notification-display-source").css('width', css.contentWidth);
    $("#notification-display-source").css('height', css.contentHeight);

    $("#notification-display-text").text(notificationText);
    $("#notification-display-source").attr("src", contentUrl);

    $("#notification").show();

    setTimeout(hideNotification, duration);
}


$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( document ).ready(function() {setTimeout(connect, 4000);});
});