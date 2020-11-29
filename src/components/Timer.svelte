<script>
  import { slide } from "svelte/transition";
  import { expoInOut } from "svelte/easing";
  import Modal from "./Modal.svelte";
  import { timers, controller } from "../store.js";

  import { EditIcon } from "svelte-mono-icons";

  let modal;

  export let id = null;
  export let name = "";
  export let time = 0;
  export let completed = false;

  function edit() {
    modal.show();
  }

  $: if ($controller[0].running == false) {
    completed = false;
  }
</script>

<style>
  .timer-container {
    display: flex;
    align-items: center;
  }

  .timer {
    flex-grow: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    height: 50px;
  }

  .title {
    text-align: left;
  }

  .active {
    background-color: #fff4f4;
    font-weight: bold;
  }

  .time-actions-container {
    display: flex;
    align-items: center;
  }

  .time-text {
    font-size: 2em;
    font-weight: normal;
    text-align: right;
  }

  .completed {
    background-color: #e5e5e5;
    color: gray;
  }

  .actions {
    padding-left: 1em;
  }

  .action {
    padding: 0.45em;
    background-color: #f15252;
    border-radius: 50%;
    border: 0;
    line-height: 0;
  }

  :global(.accent path) {
    fill: #e5e5e5 !important;
  }

  @media (prefers-color-scheme: dark) {
    .active {
      background-color: #202020;
    }

    .completed {
      background-color: #696969;
      color: lightgray;
    }
  }
</style>

<div class="timer-container">
  <section
    class="timer"
    class:active={$controller[0].running && $controller[0].id == id}
    class:completed
    transition:slide={{ easing: expoInOut }}>
    <p class="title">
      {#if $controller[0].running && $controller[0].id == id}>{/if}
      {name}
    </p>

    <div class="time-actions-container">

      <p class="time-text">{time}:00</p>
      {#if $controller[0].running == false}
        <section class="actions" transition:slide>
          <button aria-label="Edit Timer" class="action" on:click={edit}>
            <EditIcon size="20" class="accent" />
          </button>
        </section>
      {/if}
    </div>
  </section>
</div>
<Modal bind:this={modal} {id} {name} {time} />
