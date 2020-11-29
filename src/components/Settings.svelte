<script>
  import { showNotification } from "../utils/notifications.js";
  function isDenied() {
    return (
      Notification.permission === "denied" &&
      Notification.permission === "default"
    );
  }

  let notificationsEnabled = false;
  if (localStorage.getItem("notis") !== null && !isDenied()) {
    notificationsEnabled = localStorage.getItem("notis") === "true";
  }

  let soundsEnabled = true;
  if (localStorage.getItem("soun") !== null) {
    if (localStorage.getItem("soun") === "true") {
      soundsEnabled = false;
    } else {
      soundsEnabled = true;
    }
  } else {
    localStorage.setItem("soun", "false");
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
  main {
    padding: 1em 0;
    text-align: left;
  }

  .card {
    display: grid;
    align-items: center;
    grid-template-columns: 50% 50%;
  }

  .checkbox {
    display: flex;
    align-items: center;
  }

  input[type="checkbox"] {
    margin: 0.8em;
  }
</style>

<main class="card">
  <div class="checkbox">
    <input
      bind:checked={notificationsEnabled}
      on:change={() => {
        changeNotificationSettings();
      }}
      type="checkbox"
      id="notifications"
      name="notifications" />
    <label for="notifications">Notifications</label>
  </div>

  <div class="checkbox">
    <input
      disabled={!notificationsEnabled}
      bind:checked={soundsEnabled}
      on:change={() => {
        if (soundsEnabled) {
          localStorage.setItem('soun', 'false');
        } else {
          localStorage.setItem('soun', 'true');
        }
      }}
      type="checkbox"
      id="sounds"
      name="sounds" />
    <label for="sounds">Sound</label>
  </div>
</main>
