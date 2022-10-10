<template>
    <header class="bg-[#607253] shadow-md">
        <div class="container mx-auto p-5 flex justify-between">
            <RouterLink :to="{name:'home'}">
                <div class="flex items-center gap-2 text-3xl">
                    <i class="fa-solid fa-sun text-white"></i>
                    <h1 class="text-[#d5f0c5]">Vweather</h1>
                </div>
            </RouterLink>
            
            <i class="fa-solid fa-circle-info text-3xl text-white
            hover:cursor-pointer transition-colors hover:text-[#a3a3a3] duration-300"></i>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
