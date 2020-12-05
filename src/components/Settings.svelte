<script>
  import { showNotification } from "../utils/notifications.js";
  function isDenied() {
    return (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    );
  }

  let notificationsEnabled = false;
  if (localStorage.getItem("notis") !== null && !isDenied()) {
    notificationsEnabled = localStorage.getItem("notis") === "true";
  }

  let soundsEnabled = true;
  if (localStorage.getItem("soun") !== null) {
    if (localStorage.getItem("soun") === "false") {
      soundsEnabled = false;
    }
  } else {
    localStorage.setItem("soun", "true");
  }

  function changeNotificationSettings() {
    if (isDenied()) {
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          localStorage.setItem("notis", true);
          showNotification();
        } else {
          notificationsEnabled = false;
        }
      });
    } else {
      if (!notificationsEnabled) {
        localStorage.setItem("notis", false);
      } else {
        localStorage.setItem("notis", true);
        showNotification();
      }
    }
  }
</script>

<style>
  .card {
    padding: 1em 0;
    text-align: left;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 50% 50%;
  }

  /* Customize the label (the container) */
  .container {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 1.1em;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    border-radius: 2px;
    position: relative;
    margin: 0.6em;
    height: 22px;
    width: 22px;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #f15252;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>

<main class="card">
  <label class="container" style="padding-left: 1em;">
    <input
      bind:checked={notificationsEnabled}
      on:change={() => {
        changeNotificationSettings();
      }}
      type="checkbox"
      id="notifications"
      name="notifications" />
    <span class="checkmark" />
    Notifications
  </label>

  <label class="container">
    <input
      disabled={!notificationsEnabled}
      bind:checked={soundsEnabled}
      on:change={() => {
        if (soundsEnabled) {
          localStorage.setItem('soun', 'true');
        } else {
          localStorage.setItem('soun', 'false');
        }
      }}
      type="checkbox"
      id="sounds"
      name="sounds" />
    <span class="checkmark" />
    Sound
  </label>
</main>
