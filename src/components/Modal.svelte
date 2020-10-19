<script>
  import { fly, fade } from "svelte/transition";
  import { expoOut } from "svelte/easing";

  import { timers } from "../store.js";

  let shown = false;

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
      time: time,
      completed: false
    };

    timers.modify(timer);

    reset();
  }

  function reset() {
    id = null;
    name = "";
    time = 15;
  }

  export let id = null;
  export let name = "";
  export let time = 15;
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
    padding: 2em 3em;
    width: auto;
  }

  h1 {
    padding-bottom: 0.8em;
  }

  label {
    padding: 1em 0 0.5em 0;
    text-align: left;
  }

  input {
    width: 400px;
  }

  .buttons {
    padding-top: 3em;
  }

  button {
    min-width: 100px;
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
      <form>
        <h1>Setting Timer</h1>
        <label for="name">Timer Name</label>
        <input
          required
          name="name"
          type="text"
          bind:value={name}
          minlength="1"
          maxlength="24"
          placeholder="Design, Break, Research..."
          title="Timer Name" />

        <label for="number">Timer Duration (1-60)</label>
        <input
          required
          name="number"
          type="number"
          bind:value={time}
          min="1"
          max="60"
          placeholder="Time in minutes"
          title="Timer Duration" />

        <section class="buttons">
          <button type="reset" on:click|once={cancel}>Cancel</button>
          <button type="submit" on:click|once|preventDefault={save}>
            Save
          </button>
        </section>
      </form>
    </section>
  </div>
{/if}
