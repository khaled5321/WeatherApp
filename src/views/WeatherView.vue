<template>
    <div>
        <Suspense>
            <AsyncLoad/>

            <template #fallback>
                <h1 class="loading btn text-2xl bg-transparent border-0 text-center flex mt-[25vh]">loading</h1>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncLoad from '../components/asyncLoad.vue';
</script>

