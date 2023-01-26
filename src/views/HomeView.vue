<script setup>
import Searchbar from '../components/searchbar.vue';
import cityList from '../components/cityList.vue';
</script>

<template>
  <main>
    <Searchbar/>

    <div id="trackedCities" class="container flex flex-col pt-6 px-5 mx-auto">
      <h1 class="font-bold text-2xl border-b-2 mb-5 w-fit">Tracked Cities</h1>

      <cityList/>
    </div>
  </main>
</template>
