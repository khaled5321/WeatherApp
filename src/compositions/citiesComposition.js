import { ref } from 'vue'

let savedCities = ref([])
if(localStorage.getItem('cities')){
    savedCities.value = JSON.parse(localStorage.getItem('cities'))
}

export const useSavedCities = function() {
  return {
    savedCities,
  }
}