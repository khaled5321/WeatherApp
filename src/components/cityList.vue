<template>
    <div v-if="savedCities.length" class="flex flex-col items-center sm:flex-row  gap-4 flex-wrap">
        <Suspense>
            <cityCard v-for="city, k in savedCities" :key="k" :city="city"
            />
            
            <template #fallback>
                <h1 class="loading btn text-2xl bg-transparent border-0 text-center flex">loading</h1>
            </template>
        </Suspense>
    </div>
    <div v-else>
        <h1 class="text-center text-xl">You currently have no tracked Cities</h1>
    </div>
</template>

<script setup>
import cityCard from './cityCard.vue';
import { useSavedCities } from '../compositions/citiesComposition';
const { savedCities } = useSavedCities();
console.log(savedCities.value)
</script>