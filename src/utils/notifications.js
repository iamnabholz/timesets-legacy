let yodelBuffer;

if ('AudioContext' in window || 'webkitAudioContext' in window) {
    // Check for the web audio API. Safari requires the webkit prefix.
    const URL = '/assets/now-sound.ogg';

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext(); // Make it crossbrowser    

    window.fetch(URL)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            yodelBuffer = audioBuffer;
        });
}

function play(audioBuffer) {
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
}

export function playSound() {
    play(yodelBuffer);
}

export function showNotification(notificationTitle, notificationBody) {

    if (localStorage.getItem("soun") === "true") {
        play(yodelBuffer);
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