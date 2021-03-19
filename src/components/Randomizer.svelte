<script>
  import cities from "../lib/cities";
  import state from "../store";

  const getRandomCity = () => {
    const allCities = cities.find();
    const randomNumber = Math.floor(Math.random() * allCities.length);
    state.place.set(allCities[randomNumber]);
  };
</script>

<main>
  <button on:click={getRandomCity}>Cities</button>
</main>

<style>
</style>
