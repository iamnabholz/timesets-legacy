<script>
  import Timer from "./Timer.svelte";
</script>

<style>
  main {
    text-align: center;
  }

  .timers-header {
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<main class="card">
  <section class="timers-header">
    <p>7 Timers</p>
    <button>+ New Timer</button>
  </section>
  <Timer />
  <Timer />
  <Timer />
  <Timer />
</main>
