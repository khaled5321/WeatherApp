<template>
    <header class="bg-[#607253] shadow-md">
        <nav class="container mx-auto p-5 flex justify-between">
            <RouterLink :to="{name:'home'}">
                <div class="flex items-center gap-2 text-3xl">
                    <i class="fa-solid fa-sun text-white"></i>
                    <h1 class="text-[#d5f0c5]">Vweather</h1>
                </div>
            </RouterLink>

            <div class="text-3xl flex gap-3">
                <i class="fa-solid fa-circle-info text-white hover:cursor-pointer transition-colors hover:text-[#a3a3a3] duration-300"></i>
                <i class="fa-solid fa-plus text-[#ebecff] hover:cursor-pointer transition-colors hover:text-[#a3a3a3] duration-300"></i>
            </div>
            
        </nav>
        
        <Modal/>

    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Modal from './modal.vue';
</script>
