<style>
  .timer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e5e5e5;
    padding: 1em;
  }

  .actions {
    display: none;
  }

  .timer:hover + .actions {
    display: flex;
    align-items: center;
  }

  .time-text {
    font-size: 2em;
    font-weight: 400;
  }
</style>

<section class="timer">
  <section class="title">
    <p>Work</p>

    <section class="actions">
      <p class="action">E</p>
      <p class="action">D</p>
    </section>

  </section>
  <p class="time-text">15:00</p>
</section>
