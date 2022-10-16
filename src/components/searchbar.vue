<template>
    <div class="relative flex flex-col gap-3 mx-auto w-fit p-6">
        <label for="searchbar" class="text-2xl font-semibold text-cyan-400 underline underline-offset-2">
            Search for City
        </label>

        <input @input="getSearchResults()" v-model="query"
        id='searchbar' type="search" placeholder="Enter City Name..." 
        class="w-[19rem] sm:w-[24rem] md:w-[28rem] focus:outline-none bg-transparent border-b-2 p-1 
        text-white font-semibold placeholder:text-[#cabffb]">

        <div v-if="showResults"
        class="absolute bg-gray-300 p-2 top-[79%] w-[90.3%] left-[1.5rem]">
            <ul class="flex flex-col  list-none">
                <li v-for="q,k in searchResults" :key="k"
                class="cursor-pointer w-fit px-2">
                    {{q.name}}, {{q.admin1}}, {{q.country_code}}
                </li>
                <li v-if="!searchResults" class="w-fit px-2">No Results</li>
            </ul>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showResults=ref(null)
const query=ref("")
const lazyload=ref(null)
const searchResults=ref(null)

const getSearchResults=()=>{
    clearTimeout(lazyload.value)

    if(query.value=='') {
        showResults.value=false
        return 
    }

    lazyload.value=setTimeout(async ()=>{
        let data= await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query.value}&count=5`)
        
        data.json().then((data)=>{
            searchResults.value=data.results
            showResults.value=true
        })
    }, 500)

    
}
</script>

<style scoped>

</style>