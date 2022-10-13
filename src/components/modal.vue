<template>
    <Teleport to="body">
        <div v-if="true"
        class="absolute flex items-center w-full top-0 left-0 h-full bg-black bg-opacity-30">
            <div v-show="true"
            class="flex flex-col w-[70vw] h-fit mx-auto bg-slate-100 rounded-md p-5 shadow-2xl font-semibold">
        
                <div class="flex flex-col gap-2">
                    <h2 class="text-xl text-[#458b7a]">About:</h2>
                    <p class="mb-3">
                        Vweather app allows you to track the current and
                        future weather of cities of your choosing.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h2 class="text-xl text-[#458b7a]">How it works:</h2>
                    <ol class="list-decimal list-inside mb-3 flex flex-col gap-2">
                        <li>
                            Search for your city by entering the name into the
                            search bar.
                        </li>
                        <li>
                            Select a city within the results, this will take
                            you to the current weather for your selection.
                        </li>
                        <li>
                            Track the city by clicking on the "+" icon in the
                            top right. This will save the city to view at a
                            later time on the home page.
                        </li>
                    </ol>
                </div>
                <div class="flex flex-col gap-2">
                    <h2 class="text-xl text-[#458b7a]">Removing a city:</h2>
                    <p>
                        If you no longer wish to track a city, simply select
                        the city within the home page. At the bottom of the
                        page, there will be an option to delete the city.
                    </p>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>

</script>

<style scoped>

</style>