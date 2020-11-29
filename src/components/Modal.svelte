<script>
  import { fly, fade } from "svelte/transition";
  import { expoOut } from "svelte/easing";
  import { onMount } from "svelte";

  import { DeleteIcon } from "svelte-mono-icons";

  import { timers } from "../store.js";

  let shown = false;
  let form;
  let valid = false;

  export let isNew = false;

  export function show() {
    shown = true;
  }

  function cancel() {
    shown = false;

    reset();
  }

  function save() {
    shown = false;

    const timer = {
      id: id,
      name: name,
      time: parseInt(time, 10),
      completed: false
    };

    timers.modify(timer);

    reset();
  }

  function reset() {
    if (isNew) {
      id = null;
      name = "";
      time = 15;
      valid = false;
    }
  }

  function validate() {
    valid = form.reportValidity();
  }

  export let id = null;
  export let name = "";
  export let time = 15;

  let remove = id => {
    timers.delete(id);
  };
</script>

<style>
  .modal-background {
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fefefe;
    padding: 2em 2em;
    border-radius: 5px;
    width: min(95%, 400px);
  }

  h1 {
    font-size: 1.6em;
    padding-bottom: 0.8em;
  }

  label {
    padding: 1em 0 0.5em 0;
    text-align: left;
  }

  input {
    width: 100%;
  }

  .buttons {
    display: flex;
    padding-top: 3em;
  }

  .buttons button {
    min-width: 100px;
    width: 100%;
  }

  .timer-delete-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 0 0.6em 0;
    text-align: left;
  }

  @media only screen and (max-width: 580px) {
    .modal {
      width: 80%;
    }
  }
  @media (prefers-color-scheme: dark) {
    .modal {
      background-color: #282828;
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
      <form id="timer-form" bind:this={form}>
        <h1>Timer Options</h1>
        <label for="name">Timer Name</label>
        <input
          required
          autocomplete="off"
          name="name"
          type="text"
          pattern=".*\S+.*"
          bind:value={name}
          on:keyup={() => {
            validate();
          }}
          minlength="1"
          maxlength="32"
          placeholder="Design, Break, Research..."
          title="Name can´t be empty." />

        <label for="number">Timer Duration (1-60)</label>
        <input
          required
          autocomplete="off"
          name="number"
          type="text"
          pattern="[1-9]|[0-5][0-9]|60\d*"
          bind:value={time}
          on:keyup={() => {
            validate();
          }}
          maxlength="2"
          placeholder="Time in minutes"
          title="Number between 1 and 60." />

        <section class="buttons">
          <button
            type="reset"
            on:click|once={() => {
              cancel();
            }}>
            Cancel
          </button>
          <div style="height: 100%; width: 10px;" />
          <button
            disabled={!valid}
            type="submit"
            on:click|once|preventDefault={() => {
              save();
            }}>
            Save
          </button>
        </section>
      </form>

      {#if !isNew}
        <section class="timer-delete-container">
          <p>
            Delete your timer.
            <br />
            This can't be undone.
          </p>
          <button
            type="button"
            on:click|once={() => {
              remove(id);
            }}>
            <DeleteIcon size="20" class="accent" />
          </button>
        </section>
      {/if}
    </section>
  </div>
{/if}
