<template>
    <div>
        {{  weatherData }}
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const getWeatherData = async () =>{
    try{
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${route.query.lat}&longitude=${route.query.long}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=Europe%2FLondon`)
        const data = await res.json()
        return data

    } catch(err){
        console.log(err)
    }
}

const weatherData = await getWeatherData()
</script>