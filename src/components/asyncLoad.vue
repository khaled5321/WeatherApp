<template>
    <!-- preview -->
    <p class="text-center py-2 px-5 text-lg bg-info-content">
        <span v-if="route.query.preview">You are currently previewing the city click on &ThinSpace; '+' &ThinSpace; Icon to start tracking the city</span> 
        <span v-else class="text-success">You are currently tracking this City. <span @click="untrackCity()" class="text-warning underline cursor-pointer">Untrack</span></span> 
    </p>
    <div class="container mx-auto px-5 pb-6">
        <!-- {{  weatherData }} -->
        <div id="currentWeather" class="py-3 bg-transparent flex flex-col sm:px-6 md:px-24 lg:px-52">
            <div class="bg-slate-200 rounded-tl rounded-tr py-5">
                <div class="w-24 h-auto mx-auto text-center">
                    <img  :src="`/src/assets/imgs/${weatherData.current_weather.weathercode}.png`"/>
                    <!-- <i v-else class="fa-solid fa-moon text-5xl text-blue-500"></i> -->
                </div>
            </div>

            <div class="text-xl sm:text-3xl flex bg-secondary-content px-5 justify-between gap-6 text-white rounded-bl rounded-br">
                <!-- temp -->
                <div class="flex items-center py-2 pr-2">
                    {{ Math.round(weatherData.current_weather.temperature)}}&deg;
                </div>
                <!-- Location -->
                <div class="flex flex-col py-2">
                    <p>{{ weatherCodes[weatherData.current_weather.weathercode] }}</p>
                    <p class="font-thin text-lg sm:text-xl">{{ route.params.state }}, {{ route.params.city }}</p>
                </div>
                <!-- wind -->
                <div class="flex flex-col py-2">
                    <i class="fa-solid fa-wind"></i>
                    <p>{{ Math.round(weatherData.current_weather.windspeed)}} <small>Km/h</small></p>
                </div>
                <!-- time
                <div class="flex items-center bg-primary p-2 mr-[-20px] rounded-br">
                    <p>{{ currentTime.toLocaleTimeString().replace(/:00/g, '') }}</p>
                </div> -->
            </div>
        </div>

        <div id="Forecast" class="flex flex-col sm:px-6 md:px-24 lg:px-52">
            <h1 class="font-bold text-3xl border-b-2 mb-5 w-fit">Forecast</h1>

            <div class="text-xl sm:text-3xl flex  text-white rounded overflow-x-scroll">

                <div v-for="item, k in weatherData.daily.time" :key="k"
                :class="`flex flex-col gap-3 items-center py-2 px-3 min-w-fit ${setBackground()}`">
                    <!-- date -->
                    <p v-if="currentTime.setHours(0,0,0,0) == new Date(item).setHours(0,0,0,0)">Today</p>
                    <p v-else class="">{{new Date(item).toDateString().slice(4,10)}}</p>  

                    <!-- weather img -->
                    <div class="w-12 h-auto mx-auto text-center">
                        <img v-if="isDayTime" :src="`/src/assets/imgs/${weatherData.daily.weathercode[k]}.png`"/>
                    </div>

                    <!-- temp high -->
                    <div>
                        <p class="font-bold">{{ Math.round(weatherData.daily.temperature_2m_max[k]) }}&deg;</p> 
                    </div>

                    <!-- temp low -->
                    <div>
                        <p class="font-thin">{{ Math.round(weatherData.daily.temperature_2m_min[k]) }}&deg;</p> 
                    </div>

                    <!-- wind -->
                    <div class="flex flex-col items-center">
                        <small class="fa-solid fa-wind"></small>
                        <p class="text-lg">{{ Math.round(weatherData.daily.windspeed_10m_max[k])}} <small>Km/h</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useSavedCities } from '../compositions/citiesComposition';

const route = useRoute();
const router = useRouter();
const { savedCities } = useSavedCities();

if(savedCities.value){
    savedCities.value.forEach(element => {
        if((element.lat === route.query.lat) && (element.long === route.query.long) ){
            let query = Object.assign({}, route.query)
            delete query.preview;
            router.replace({ query });
        }
    });
}
const untrackCity = () => {
    if(savedCities.value){
    savedCities.value.forEach((element, index) => {
        if((element.lat === route.query.lat) && (element.long === route.query.long) ){
            savedCities.value.splice(index,1);
            localStorage.setItem('cities', JSON.stringify(savedCities.value))
            let query = Object.assign({}, route.query)
            query.preview = true;
            router.replace({ query });
        }
    });
}
}

const getWeatherData = async () =>{
    try{
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.long}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&current_weather=true&timezone=Europe%2FLondon`)
        const data = await res.json()
        return data

    } catch(err){
        console.log(err)
    }
}

const weatherData = await getWeatherData()

const weatherCodes = {
    0 :	"Clear Sky",
    1 : "Mainly clear",
    2 : "Partly cloudy",
    3 : "Overcast",
    45 : "Fog",
    48 : "Depositing Rime Fog",
    51 : "Light Drizzle",
    53 : "Moderate Drizzle",
    55 : "dense Drizzle",
    56 : "Freezing Drizzle",
    57 : "Dense Freezing Drizzle",	
    61 : "Slight Rain",
    63 : "Moderate Rain",
    65 : "Heavy Rain", 
    66 : "Freezing Light Rain",
    67 : "Freezing Heavy Rain",
    71 : "Slight Snow Fall",
    73 : "Moderate Snow Fall",
    75 : "Heavy Snow Fall",
    77 : "Snow Grains",
    80 : "Slight Rain Showers",
    81 : "Moderate Rain Showers",
    82 : "Heavy Rain Showers",
    85 : "Slight Snow Showers",
    86 : "Heavy Snow Showers",
    95 : "Thunderstorm",
    96 : "Thunderstorm with Slight Hail",
    99 : "Thunderstorm with heavy hail"
}

const currentTime = new Date(weatherData.current_weather.time + ':00.000Z')
const hours = currentTime.getHours()
const isDayTime = hours > 6 && hours < 20

let background = 'bg-success-content'
const setBackground = () =>{
    background = background == 'bg-success-content'?  'bg-info-content' : 'bg-success-content';
    return background
}
</script>