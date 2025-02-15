<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import AppButton from './AppButton.vue';
import DarkModeIcon from './icons/DarkModeIcon.vue';
import LightModeIcon from './icons/LightModeIcon.vue';
import SettingsIcon from './icons/SettingsIcon.vue';

const appStore = useAppStore();

function onClickSettings() {
  console.log('TODO');
}
</script>

<template>
  <nav>
    <span class="brand">Pomodorus</span>

    <div class="options">
      <AppButton @click="onClickSettings">
        <SettingsIcon class="option" />
      </AppButton>

      <AppButton @click="appStore.toggleVisualMode">
        <LightModeIcon class="option" v-if="appStore.darkMode" />

        <DarkModeIcon class="option" v-else />
      </AppButton>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  color: #fff;
}

.brand {
  font-family: 'Jockey One', sans-serif;
  font-size: 68px;
  color: #000;
}

.dark-mode .brand {
  color: #fff;
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.options .option {
  width: 2rem;
  height: 2rem;
  color: #000;
}

.dark-mode .options .option {
  color: #fff;
}
</style>