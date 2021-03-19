<script>
  import Randomizer from "./components/Randomizer.svelte";
  import Map from "./components/Map.svelte";
</script>

<main>
  <div class="app">
    <h1>Random Travel Destination</h1>
    <Randomizer />
    <Map />
  </div>
</main>

<style>
  .app {
    text-align: center;
    margin-bottom: 250px;
  }
</style>
