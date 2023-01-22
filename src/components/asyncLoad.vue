<template>
    <!-- preview -->
    <p class="text-center py-2 px-5 text-lg bg-info-content">
            You are currently previewing the city click on &ThinSpace; '+' &ThinSpace; Icon to start tracking the city
    </p>
    <div class="container mx-auto px-5">
        <!-- {{  weatherData }} -->
        <div id="currentWeather" class=" py-5 bg-transparent flex flex-col text-black sm:px-6 md:px-24 lg:px-52">
            <div class="bg-white rounded-tl rounded-tr py-5">
                <div class="w-24 h-auto mx-auto text-center">
                    <img v-if="isDayTime" :src="`/src/assets/imgs/${weatherData.current_weather.weathercode}.png`"/>
                    <i v-else class="fa-solid fa-moon text-5xl text-blue-500"></i>
                </div>
            </div>

            <div class="text-xl sm:text-3xl flex bg-black px-5 justify-between gap-4 text-white rounded-bl rounded-br">
                <!-- temp -->
                <div class="flex items-center py-2">
                    {{ Math.round(weatherData.current_weather.temperature)}}&deg;
                </div>
                <!-- Location -->
                <div class="flex flex-col py-2">
                    <p>{{ weatherCodes[weatherData.current_weather.weathercode] }}</p>
                    <p class="font-thin text-xl">{{ route.params.state }}, {{ route.params.city }}</p>
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
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const getWeatherData = async () =>{
    try{
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.long}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&current_weather=true&timezone=Europe%2FLondon`)
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

</script>