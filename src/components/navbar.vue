<template>
    <header class="bg-black shadow-sm shadow-white">
        <nav class="container mx-auto p-5 flex justify-between">
            <RouterLink :to="{name:'home'}">
                <div class="flex items-center gap-2 text-3xl">
                    <i class="fa-solid fa-sun text-yellow-400"></i>
                    <h1 class="font-serif text-secondary">Vweather</h1>
                </div>
            </RouterLink>

            <div class="text-3xl flex gap-4">
                <i @click="toggleModal()"
                class="fa-solid fa-circle-info text-white hover:cursor-pointer transition-colors hover:text-primary-focus duration-300"></i>

                <i class="fa-solid fa-plus text-[#ebecff] hover:cursor-pointer transition-colors hover:text-primary-focus duration-300"></i>
            </div>
        </nav>
        
        <Modal :showModal="showModal" @close-modal="toggleModal()"/>

    </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import Modal from './modal.vue';

const showModal=ref(null)

const toggleModal=()=>{
    showModal.value=!showModal.value
}
</script>
