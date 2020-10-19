<script>
  import Timer from "tiny-timer";
  import { timers, controller } from "../store.js";

  import { PlayIcon, PauseIcon, StopIcon } from "svelte-mono-icons";

  const timer = new Timer();

  let title = "--------";
  let currentTime = "00:00";
  let currentId = 0;

  let paused = false;

  const start = () => {
    if ($timers.length != 0) {
      if (timer.status == "stopped") {
        let time = $timers[currentId].time;
        title = $timers[currentId].name;

        timer.start(time * 60000, 1000);
        $controller[0].id = $timers[currentId].id;
        $controller[0].running = true;
      } else if (timer.status == "running") {
        paused = true;
        timer.pause();
      } else if (timer.status == "paused") {
        paused = false;
        timer.resume();
      }
    }
  };

  function stop() {
    timer.stop();
    title = "--------";
    currentTime = "00:00";
    $controller[0].id = null;
    $controller[0].running = false;
    currentId = 0;
  }

  timer.on("tick", ms => {
    currentTime = timeAdapter(ms);
  });

  timer.on("done", () => {
    // flash or whatever xd
    $timers[currentId].completed = true;

    if (currentId < $timers.length) {
      currentId = currentId + 1;
    } else {
      currentId = 0;
    }

    start();
  });

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
    display: flex;
    width: 162px;
    padding-top: 0.4em;
  }

  .actions button {
    background-color: transparent;
    padding: 0;
    border: 0;
  }

  h1 {
    color: #333333;
    font-size: 2em;
    font-weight: 600;
  }

  .time-text {
    font-size: 6em;
    font-weight: 600;
  }

  :global(.accent path) {
    fill: #f15252 !important;
  }
</style>

<main class="card">
  <h1>{title}</h1>
  <p class="time-text">{currentTime}</p>

  <section class="actions">
    <button
      class="stop"
      disabled={$controller[0].running == true ? false : true}
      on:click={stop}>
      <StopIcon size="38" />
    </button>
    <button on:click={start}>
      {#if $controller[0].running == true && paused == false}
        <PauseIcon size="86" class="accent" />
      {:else}
        <PlayIcon size="86" class="accent" />
      {/if}
    </button>
  </section>
</main>

<svelte:head>
  <title>
    {$controller[0].running ? title + ' - ' + currentTime : 'TIMESETS'}
  </title>
</svelte:head>
