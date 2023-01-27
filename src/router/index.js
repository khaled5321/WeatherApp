import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WeatherView from '../views/WeatherView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/weather/:country/:state/:city/',
      name: 'weather',
      component: WeatherView,
      beforeEnter: (to, from, next) => {
        if (!to.query.lat || !to.query.long) {
          next('/invalid'); 
        }
        else {
          next();
        }
      }       
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'notfound',
      component: NotFound
    }
  ]
})

export default router
