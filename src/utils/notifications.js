const audio = new Audio('/assets/now-sound.ogg');

export function showNotification(notificationTitle, notificationBody) {

    if (localStorage.getItem("soun") === "true") {
        audio.play();
    }


    if ('Notification' in window && localStorage.getItem("notis") === "true") {
        var notification = new Notification(
            notificationTitle || "Notifications have been enabled", {
                body: notificationBody || "Now you will be notified when a timer has finished",
                icon: "/android-chrome-512x512.png",
                silent: true
            }
        );
        notification.onclick = function () {
            window.focus();
        };
    }
}