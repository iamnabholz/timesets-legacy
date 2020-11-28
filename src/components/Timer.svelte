<script>
  import { slide } from "svelte/transition";
  import { expoInOut } from "svelte/easing";
  import Modal from "./Modal.svelte";
  import { timers, controller } from "../store.js";

  import { DeleteIcon, EditIcon } from "svelte-mono-icons";

  let modal;

  export let id = null;
  export let name = "";
  export let time = 0;
  export let completed = false;

  function edit() {
    modal.show();
  }

  let remove = id => {
    timers.delete(id);
  };

  $: if ($controller[0].running == false) {
    completed = false;
  }
</script>

<style>
  .timer {
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

  .time-text {
    font-size: 2em;
    font-weight: normal;
  }

  .completed {
    background-color: #e5e5e5;
    color: gray;
  }

  .action {
    padding: 0.35em 0.35em 0 0;
    background-color: transparent;
    border: 0;
  }

  @media (prefers-color-scheme: dark) {
    .active {
      background-color: #202020;
    }
  }
</style>

<section
  class="timer"
  class:active={$controller[0].running && $controller[0].id == id}
  class:completed
  transition:slide={{ easing: expoInOut }}>
  <section class="title">

    {#if $controller[0].running && $controller[0].id == id}
      <p>> {name}</p>
    {:else}
      <p>{name}</p>
    {/if}

    {#if $controller[0].running == false}
      <section class="actions" transition:slide={{ y: 20, duration: 200 }}>
        <button aria-label="Edit Timer" class="action" on:click={edit}>
          <EditIcon size="18" />
        </button>
        <button
          aria-label="Delete Timer"
          class="action"
          on:click={() => remove(id)}>
          <DeleteIcon size="18" class="accent" />
        </button>
      </section>
    {/if}
  </section>
  <p class="time-text">{time}:00</p>
</section>

<Modal bind:this={modal} {id} {name} {time} />
