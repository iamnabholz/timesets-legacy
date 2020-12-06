<script>
  import { fly, fade } from "svelte/transition";
  import { expoOut } from "svelte/easing";
  import { onMount } from "svelte";

  import { DeleteIcon, AddIcon, RemoveIcon } from "svelte-mono-icons";

  import { timers } from "../store.js";

  let shown = false;
  let form;

  export let isNew = false;
  let valid = !isNew;

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

  const buttonTimerUpdate = add => {
    if (add === true && time < 60) {
      time = time + 1;
    } else if (add === false && time > 1) {
      time = time - 1;
    }
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
    top: 36%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fefefe;
    padding: 2em 2em;
    border-radius: 5px;
    width: min(95%, 400px);
  }

  h1 {
    font-size: 1.6em;
  }

  label {
    padding: 2em 0 0.5em 0;
    text-align: left;
  }

  h1,
  label {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }

  input {
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .time-input-container {
    display: flex;
    align-items: center;
  }

  .buttons {
    width: 100%;
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

  .action {
    margin-left: 1em;
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
      <h1>
        {#if isNew}Create{:else}Edit{/if}
        Timer
      </h1>

      <form id="timer-form" bind:this={form}>
        <label for="name">Name</label>
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

        <label for="number">Duration (1 to 60 Minutes)</label>
        <div class="time-input-container">
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

          <button
            aria-label="Reduce Time"
            class="action"
            on:click|preventDefault={() => {
              buttonTimerUpdate(false);
            }}>
            <RemoveIcon size="20" class="accent" />
          </button>

          <button
            aria-label="Add Time"
            class="action"
            on:click|preventDefault={() => {
              buttonTimerUpdate(true);
            }}>
            <AddIcon size="20" class="accent" />
          </button>
        </div>

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
