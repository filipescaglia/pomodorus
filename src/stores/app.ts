import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const darkMode = ref(true);

  function toggleVisualMode() {
    darkMode.value = !darkMode.value;
  }

  return {
    darkMode,
    toggleVisualMode,
  };
}, {
  persist: true,
});