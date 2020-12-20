<script>
  import Controller from "./components/Controller.svelte";
  import List from "./components/List.svelte";

  import { controller } from "./store.js";

  //ASK USER TO CONFIRM IF THEY WANT TO RELOAD A PAGE WHEN THE TIMER IS RUNNING
  function beforeUnload() {
    if ($controller[0].running == true) {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = "";
      // more compatibility
      return "...";
    }
  }
</script>

<style>
  main {
    padding: 0;
    text-align: center;
    width: min(96%, 920px);
    margin: 0 auto;
  }

  h1 {
    color: #f15252;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: bold;
    padding: 0.6em 0;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }

  .app {
    display: flex;
    align-items: flex-start;
  }

  .controls {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 0.8em;
  }

  @media only screen and (max-width: 800px) {
    main {
      width: min(96%, 480px);
    }
    .app {
      flex-direction: column;
    }
    .controls {
      margin-right: 0;
    }
  }
</style>

<main>
  <h1>TIMESETS</h1>
  <div class="app-container">
    <section class="app">
      <section class="controls">
        <Controller />
      </section>
      <List />
    </section>
  </div>
</main>

<svelte:window on:beforeunload={beforeUnload} />
