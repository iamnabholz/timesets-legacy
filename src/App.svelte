<script>
  import Controller from "./components/Controller.svelte";
  import List from "./components/List.svelte";
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

  .app {
    margin: 0 auto;
    display: flex;
    align-content: space-between;
    max-width: 40%;
    align-items: flex-start;
  }

  @media only screen and (max-width: 600px) {
    .app {
      width: 80%;
    }
  }
</style>

<main>
  <h1>TIMESETS</h1>
  <div class="app">
    <Controller />
    <List />
  </div>
</main>
