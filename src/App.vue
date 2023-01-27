<template>
  <Navbar/>
  <RouterView v-slot="{Component}">
    <Transition name="page" mode="out-in">
      <component :is="Component"/>
    </Transition>
  </RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/navbar.vue';
</script>

<style>
.page-enter-active, .page-leave-active{
  transition: 500ms ease all;
}
.page-enter-from, .page-leave-to{
  opacity: 0;
}

</style>