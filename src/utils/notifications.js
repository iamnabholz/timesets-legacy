const sound = '/assets/now-sound.mp3';

function play() {
    const audio = new Audio(sound);
    audio.play();
}

export function playSound() {
    play();
}

export function showNotification(notificationTitle, notificationBody) {

    if (localStorage.getItem("soun") === "true") {
        play();
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