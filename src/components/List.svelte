<script>
  import { fly } from "svelte/transition";

  import Timer from "./Timer.svelte";
  import Modal from "./Modal.svelte";
  import { timers, controller } from "../store.js";

  let modal;
  let timerId = 9;
  const date = new Date();

  let createdIds = [2, 3];

  function newTimer() {
    timerId = newId();
    modal.show();
  }

  function newId() {
    let number;
    number = Math.floor(
      Math.random() * date.getMilliseconds() * date.getSeconds()
    );
    if (createdIds.includes(number)) {
      return newId();
    }
    createdIds = createdIds.concat(number);
    return number;
  }

  $: timeMap = $timers.map(a => a.time);
  $: getTime(timeMap);
  let text = "";

  function getTime(result) {
    result = result.reduce((a, b) => a + b, 0);
    if (result <= 60) {
      text = result + " Minute(s)";
    } else if (result > 60) {
      let hours = result / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      text = rhours + " Hour(s) " + rminutes + " Minute(s)";
    }
  }
</script>

<style>
  main {
    max-height: 89vh;
    overflow-y: auto;
    text-align: center;
  }

  .timers-header {
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    font-weight: bold;
  }

  .list-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
    border-top: 1px solid #e5e5e5;
  }

  @media only screen and (max-width: 800px) {
    main {
      max-height: none;
    }
  }
</style>

<main class="card">
  <section class="timers-header">

    <p>{$controller[0].status}</p>

    <button
      disabled={$controller[0].running}
      on:click|preventDefault={newTimer}>
      + New Timer
    </button>

  </section>

  {#each $timers as timer (timer.id)}
    <Timer {...timer} />
  {/each}

  <section class="list-info">
    {#if $timers.length != 0}
      <p>{$timers.length} Timers</p>
      <p>{text}</p>
    {:else}
      <p>You don't have any timers yet.</p>
    {/if}

  </section>
</main>

<Modal bind:this={modal} id={timerId} name={''} time={20} />
