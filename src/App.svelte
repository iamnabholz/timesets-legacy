<script>
  import Controller from "./components/Controller.svelte";
  import List from "./components/List.svelte";
  import Settings from "./components/Settings.svelte";
</script>

<style>
  main {
    padding: 1em;
    text-align: center;
  }

  h1 {
    color: #f15252;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 800;
    padding-bottom: 0.5em;
  }

  .app-container {
    display: grid;
    grid-template-columns: 50%;
    justify-content: center;
  }

  .app {
    display: flex;
    align-items: flex-start;
  }

  .controls {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 0.4em;
  }

  @media only screen and (max-width: 1680px) {
    .app-container {
      grid-template-columns: 75%;
    }
  }

  @media only screen and (max-width: 1000px) {
    .app-container {
      grid-template-columns: 100%;
    }
  }

  @media only screen and (max-width: 800px) {
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
        <!-- <Settings /> -->
      </section>
      <List />
    </section>
  </div>
</main>
