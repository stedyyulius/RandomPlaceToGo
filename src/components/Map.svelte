<script>
  import { onMount, getContext, afterUpdate } from "svelte";

  import state from "../store";

  import crawler from "../helpers/crawler";

  let randomPlace = {};
  let mymap = null;

  onMount(() => {
    mymap = L.map("map").setView([51.505, -0.09], 13);

    state.place.subscribe((value) => {
      randomPlace = value;
    });

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: __randomPlace.env.API_KEY,
      }
    ).addTo(mymap);
  });

  afterUpdate(async () => {
    console.log(randomPlace);
    if (mymap && randomPlace.latitude) {
      mymap.panTo({ lat: randomPlace.latitude, lng: randomPlace.longitude });

      // const scrapped = await crawler();

      // console.log(scrapped);
    }
  });
</script>

<main>
  <div class="map-container">
    <h4>{randomPlace.city || ""}</h4>
    <div id="map" class="map" />
  </div>
</main>

<style>
  .map-container {
    width: 55%;
    margin: auto;
  }
  .map {
    height: 400px;
  }
</style>
