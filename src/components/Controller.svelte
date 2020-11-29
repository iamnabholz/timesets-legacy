<script>
  import { showNotification } from "../utils/notifications.js";

  import Timer from "tiny-timer";
  import { timers, controller } from "../store.js";

  const timer = new Timer();

  let title = "";
  let currentTime = "00:00";
  let currentId = 0;
  let iconToShow = "start";

  let paused = false;

  const start = () => {
    if ($timers.length != 0) {
      if (timer.status == "stopped") {
        let time = $timers[currentId].time;
        title = $timers[currentId].name;

        timer.start(time * 60000, 1000);
        $controller[0].id = $timers[currentId].id;
        $controller[0].running = true;
        iconToShow = "pause";
      } else if (timer.status == "running") {
        paused = true;
        iconToShow = "start";
        timer.pause();
      } else if (timer.status == "paused") {
        paused = false;
        timer.resume();
        iconToShow = "pause";
      }
    }
  };

  function stop() {
    timer.stop();
    title = "";
    currentTime = "00:00";
    $controller[0].id = null;
    $controller[0].running = false;
    currentId = 0;
    paused = false;
    iconToShow = "start";
  }

  timer.on("tick", ms => {
    currentTime = timeAdapter(ms);
  });

  timer.on("done", () => {
    // flash or whatever xd
    $timers[currentId].completed = true;
    currentId = currentId + 1;

    if (currentId < $timers.length) {
      showNotification(
        "The timer " + "'" + title + "'" + " has finished.",
        "Starting the " + "'" + title + "'" + " timer"
      );
      start();
    } else {
      showNotification("All timers have been finished!", "NICE");
      stop();
    }
  });

  timer.on("statusChanged", status => ($controller[0].status = status));

  function timeAdapter(ms) {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .actions {
    display: grid;
    grid-template-columns: 30% 40% 30%;
    padding-top: 0.4em;
    justify-content: center;
    align-items: center;
    width: 200px;
  }

  .timer-title {
    min-height: 3.2em;
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 2em;
    font-weight: 600;
  }

  h3 {
    opacity: 0.6;
    font-style: italic;
    font-size: 1.4em;
    font-weight: 400;
  }

  .time-text {
    font-size: 6em;
    font-weight: 600;
  }

  .blink {
    animation: blinker 2s ease-in-out infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
</style>

<main class="card">
  <div class="timer-title">
    {#if title !== '' && title !== null}
      <h1>{title}</h1>
    {:else}
      <h3>Start</h3>
    {/if}
  </div>

  <p class="time-text" class:blink={paused}>{currentTime}</p>

  <section class="actions">
    <input
      disabled={$controller[0].running == true ? false : true}
      type="image"
      on:click={stop}
      src="/icons/stop-active.svg"
      alt="Stop timer." />

    <input
      type="image"
      on:click={start}
      src={'/icons/' + iconToShow + '.svg'}
      alt="Start or pause timer." />

  </section>
</main>

<svelte:head>
  <title>
    {$controller[0].running ? title + ' - ' + currentTime : 'TIMESETS'}
  </title>
</svelte:head>
