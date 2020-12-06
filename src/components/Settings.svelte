<script>
  import { fly, fade } from "svelte/transition";
  import { expoOut } from "svelte/easing";

  import { timers } from "../store.js";

  import { showNotification } from "../utils/notifications.js";
  function isDenied() {
    return (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    );
  }

  const audio = new Audio();

  let shown = false;

  export const showOptions = () => {
    shown = true;
  };

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
  .settings-card {
    padding-top: 1em;
    text-align: left;
    display: grid;
    grid-template-rows: repeat(5, auto);
  }

  h1 {
    font-size: 1.6em;
  }

  p {
    padding: 0 0 2em 2.6em;
    color: grey;
  }

  /* Customize the label (the checkbox-container) */
  .checkbox-container {
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
  .checkbox-container input {
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
  .checkbox-container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .checkbox-container input:checked ~ .checkmark {
    background-color: #f15252;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .checkbox-container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkbox-container .checkmark:after {
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

  button {
    margin: 0.4em 0;
  }

  a {
    color: #202020;
    text-decoration: none;
    transition: 0.1s linear;
  }

  a:hover {
    transform: translate(-1px, -1px);
    text-decoration: underline;
  }

  .support-information {
    padding-top: 2em;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (prefers-color-scheme: dark) {
    a {
      color: white;
    }
  }
</style>

{#if shown}
  <div
    class="modal-background"
    in:fade={{ duration: 50 }}
    out:fade={{ delay: 50, duration: 100 }}>
    <section
      class="modal card"
      in:fly={{ y: 200, duration: 250, delay: 50, easing: expoOut }}
      out:fly={{ y: 200, duration: 250, easing: expoOut }}>
      <h1>Settings</h1>
      <div class="settings-card">
        {#if 'Notification' in window}
          <label class="checkbox-container">
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
          <p>
            Every time a timer is completed we will send you a notification.
          </p>
        {/if}

        <label class="checkbox-container">
          <input
            bind:checked={soundsEnabled}
            on:change={() => {
              if (soundsEnabled) {
                localStorage.setItem('soun', 'true');
                audio.play();
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
        <p>Play a sound when a timer is completed.</p>

        <button
          on:click={() => {
            timers.reset();
            location.reload();
            return false;
          }}>
          RESET TIMERS
        </button>
        <p style="padding: 0; text-align: center;">
          This will replace all your created timers with the defaults.
        </p>

        <button
          style="margin-top: 2em;"
          on:click={() => {
            shown = false;
          }}>
          CLOSE
        </button>
      </div>

      <div class="support-information">
        <span>
          by
          <a href="https://nabholz.work/" target="_blank">
            nabholz.work &#8599;&#xFE0E;
          </a>
        </span>
        <a href="https://ko-fi.com/Z8Z82TKAA" target="_blank">
          <img
            height="36"
            style="border:0px;height:36px;"
            src="https://cdn.ko-fi.com/cdn/kofi3.png?v=2"
            border="0"
            alt="Buy Me a Coffee at ko-fi.com" />
        </a>
      </div>
      <p style="padding: 1em 0 0 0; text-align: center;">TIMESETS v1.1.12</p>

    </section>
  </div>
{/if}
