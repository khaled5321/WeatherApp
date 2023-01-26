<template>
    <header class="bg-black shadow-sm shadow-white">
        <nav class="container mx-auto px-5 py-3 flex justify-between">
            <RouterLink :to="{name:'home'}">
                <div class="flex items-center gap-2 text-3xl">
                    <i class="fa-solid fa-sun text-yellow-400"></i>
                    <h1 class="font-serif text-white">Weather</h1>
                </div>
            </RouterLink>

            <div class="text-3xl flex gap-4">
                <i @click="toggleModal()"
                class="fa-solid fa-circle-info text-white hover:cursor-pointer transition-colors hover:text-primary-focus duration-300"></i>

                <i 
                v-if="route.query.preview" 
                @click="saveCity()"
                class="fa-solid fa-plus text-[#ebecff] hover:cursor-pointer transition-colors hover:text-primary-focus duration-300"></i>
            </div>
        </nav>
        
        <Modal :showModal="showModal" @close-modal="toggleModal()"/>

    </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useRoute } from "vue-router";
import { v1 as uuidv1 } from 'uuid';
import { useSavedCities } from '../compositions/citiesComposition';
import Modal from './modal.vue';

const route = useRoute();
const router = useRouter();
const showModal=ref(null);
const { savedCities } = useSavedCities();
const toggleModal=()=>{
    showModal.value=!showModal.value
}

if(localStorage.getItem('cities')){
    savedCities.value = JSON.parse(localStorage.getItem('cities'))

}
const saveCity = () => {
    let city = {
        id: uuidv1(),
        state: route.params.state,
        city: route.params.city,
        country: route.params.country,
        lat: route.query.lat,
        long: route.query.long,
    }
    savedCities.value.push(city)
    localStorage.setItem('cities', JSON.stringify(savedCities.value))

    let query = Object.assign({}, route.query)
    delete query.preview;
    router.replace({ query });
}
</script>
