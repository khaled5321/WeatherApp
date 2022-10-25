<template>
    <div class="relative flex flex-col gap-3 mx-auto w-fit p-6">
        <label for="searchbar" class="text-2xl font-semibold text-primary-content underline underline-offset-2">
            Search for City
        </label>

        <input @input="getSearchResults()" v-model="query"
        id='searchbar' type="search" placeholder="Enter City Name..." 
        class="w-[19rem] sm:w-[24rem] md:w-[28rem] focus:outline-none bg-transparent border-b-2 p-1 
        text-white font-semibold placeholder:text-[#cabffb]">

        <div class="absolute text-secondary-content  top-[79%] w-[90.3%] left-[1.5rem]">
            <p v-if="searchError" class="p-2 text-error-content bg-neutral-content">
                Error. check your internet connection and refresh tha page
            </p>

            <template v-else>
                <p v-if="!searchResults && query!==''" class="p-2 text-error-content bg-neutral-content">
                    No Results
                </p>

                <ul v-if="searchResults"
                class="flex flex-col gap-2 list-none p-2 bg-neutral-content">
                    <li v-for="q,k in searchResults" :key="k" @click="displayResult(q)"
                    class="cursor-pointer px-2">
                        {{q.name}}, {{q.admin1}}, {{q.country_code}}
                    </li>
                </ul>
            </template>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const query=ref("")
const lazyload=ref(null)
const searchResults=ref(null)
const searchError=ref(null)

const getSearchResults=()=>{
    clearTimeout(lazyload.value)

    lazyload.value=setTimeout(async ()=>{
        try{
            let response= await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query.value}&count=5`)
            response.json().then((data)=>{
            searchResults.value=data.results
            })
        }
        catch(error){
            searchError.value=true
        }
        
    }, 300)

}

const displayResult = (searchResult)=>{
    const country= searchResult.country
    const state = searchResult.admin1
    const city= searchResult.name
    const latitude=searchResult.latitude
    const longitude=searchResult.longitude

    router.push({
        name:"weather",
        params:{
            country:country.replaceAll(" ", ""),
            state:state.replaceAll(" ", ""),
            city:city.replaceAll(" ", "")
        },
        query:{
            lat:latitude,
            long:longitude,
            preview:true,
        }

    })
}
</script>

<style scoped>

</style>