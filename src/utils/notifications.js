export function showNotification(notificationTitle, notificationBody) {
    var notification = new Notification(
        notificationTitle || "Notifications have been enabled", {
            body: notificationBody || "Now you will be notified when a timer has finished",
            icon: "/android-chrome-512x512.png",
            silent: (localStorage.getItem("soun") === "true")
        }
    );
    notification.onclick = function () {
        window.focus();
    };
}