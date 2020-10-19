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

  let total = updateTime();

  function updateTime() {
    let result = $timers.map(a => a.time);
    result = result.reduce((a, b) => a + b, 0);
    let text = "";
    if (result < 60) {
      text = result + " Minutes";
    } else if (result > 60) {
      let hours = result / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      text =
        rhours +
        (rhours > 1 ? " Hours " : " Hour ") +
        (rminutes > 1 ? +" Minutes" : " Minute");
    }
    return text;
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
  }

  .list-info {
    text-align: left;
  }

  @media only screen and (max-width: 800px) {
    main {
      max-height: none;
    }
  }
</style>

<main class="card">
  <section class="timers-header">
    <section class="list-info">
      <p>{$timers.length} Timers</p>
      <p>{total}</p>
    </section>

    <button
      disabled={$controller[0].running}
      on:click|preventDefault={newTimer}>
      + New Timer
    </button>

  </section>

  {#each $timers as timer (timer.id)}
    <Timer {...timer} />
  {/each}
</main>

<Modal bind:this={modal} id={timerId} name={''} time={20} />
