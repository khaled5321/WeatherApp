<template>
    <div class="flex text-white transform transition duration-500 hover:scale-110 cursor-pointer" 
    @click="displayCity()">
        <div class="bg-primary w-32 rounded-l p-4 flex flex-col justify-center text-2xl font-bold items-center">
            <span>{{ Math.round(weatherData.current_weather.temperature)}}&deg;</span>
            <span>{{ city.city }}</span>
        </div>

        <div class="flex flex-col">
            <div class="bg-white flex justify-center rounded-tr">
                <img :src="`/src/assets/imgs/${weatherData.current_weather.weathercode}.png`"
                class="w-24 h-auto"/>
            </div>

            <div class="flex p-4  bg-info-content rounded-br text-2xl justify-center items-center gap-1">
                <i class="fa-solid fa-wind"></i>
                <p>{{ Math.round(weatherData.daily.windspeed_10m_max[0])}} <small>Km/h</small></p>
            </div>
        </div>
    </div> 
</template>

<script setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    city:{
        type: Object,
        default: {},
    }
})
const { city } = toRefs(props);

const getWeatherData = async () =>{
    try{
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.value.lat}&longitude=${city.value.long}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&current_weather=true&timezone=Europe%2FLondon`)
        const data = await res.json()
        return data

    } catch(err){
        console.log(err)
    }
}

const weatherData = await getWeatherData()

const displayCity = () =>{
    router.push({
        name:"weather",
        params:{
            country:city.value.country.replaceAll(" ", ""),
            state:city.value.state.replaceAll(" ", ""),
            city:city.value.city.replaceAll(" ", "")
        },
        query:{
            lat:city.value.lat,
            long:city.value.long,
        }
    })
}
</script>