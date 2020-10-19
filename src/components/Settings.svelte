<style>
  main {
    padding: 1em 0;
    text-align: left;
  }

  .checkbox {
    display: flex;
    align-items: center;
  }

  input[type="checkbox"] {
    margin: 0.8em;
  }
</style>

<main class="card">
  <div class="checkbox">
    <input type="checkbox" id="notifications" name="notifications" checked />
    <label for="notifications">Notifications</label>
  </div>
  <div class="checkbox">
    <input type="checkbox" id="sound" name="sound" checked />
    <label for="sound">Sound</label>
  </div>
</main>
