<template>
    <div>
        <Suspense>
            <AsyncLoad/>

            <template #fallback>
                <h1 class="text-center pt-10 text-2xl">Loading...</h1>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncLoad from '../components/asyncLoad.vue';


</script>

