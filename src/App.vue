<script setup lang="ts">
import AppMenu from './components/AppMenu.vue';
import { useAppStore } from './stores/app';

const appStore = useAppStore();
</script>

<template>
  <div :class="{
    'pomodorus': true,
    'dark-mode': appStore.darkMode,
  }">
    <AppMenu />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 10px;
}

.pomodorus {
  height: 100vh;
  background-color: #1E6FE4;
}

.pomodorus.dark-mode {
  background-color: #162131;
}
</style>