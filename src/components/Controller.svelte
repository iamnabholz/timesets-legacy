<script>
  import Timer from "tiny-timer";
  import { timers, controller } from "../store.js";

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
    paused = false;
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
  <h1>{title}</h1>
  <p class="time-text" class:blink={paused}>{currentTime}</p>

  <section class="actions">
    <input
      disabled={$controller[0].running == true ? false : true}
      type="image"
      on:click={stop}
      src="/icons/stop-active.svg"
      alt="Stop timer." />

    {#if $controller[0].running == true && paused == false}
      <input
        type="image"
        on:click={start}
        src="/icons/pause.svg"
        alt="Pause timer." />
    {:else}
      <input
        type="image"
        on:click={start}
        src="/icons/start.svg"
        alt="Start or resume timer." />
    {/if}

  </section>
</main>

<svelte:head>
  <title>
    {$controller[0].running ? title + ' - ' + currentTime : 'TIMESETS'}
  </title>
</svelte:head>
