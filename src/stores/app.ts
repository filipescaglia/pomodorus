import type { Settings } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type CyclePhase = 'working' | 'break';

export const useAppStore = defineStore('app', () => {
  const darkMode = ref(true);

  function toggleVisualMode() {
    darkMode.value = !darkMode.value;
  }

  const settings = ref<Settings>(defaultSettings());

  const getBreakTime = computed(() => settings.value.breakTime);
  const getWorkTime = computed(() => settings.value.workTime);
  const shouldPlaySound = computed(() => settings.value.playSound);

  function updateSettings(newSettings: Settings) {
    Object.assign(settings.value, newSettings);
  }

  function redefineSettings() {
    updateSettings(defaultSettings());
  }

  const cyclePhase = ref<CyclePhase>();

  const isWorkingPhase = computed(() => cyclePhase.value === 'working');
  const isBreakPhase = computed(() => cyclePhase.value === 'break');

  function setWorkingPhase() {
    cyclePhase.value = 'working';
  }

  function toggleCyclePhase() {
    if (!cyclePhase.value) {
      return;
    }

    cyclePhase.value = isWorkingPhase.value ? 'break' : 'working';
  }

  function clearCyclePhase() {
    cyclePhase.value = undefined;
  }

  return {
    darkMode,
    toggleVisualMode,

    settings,
    getBreakTime,
    getWorkTime,
    shouldPlaySound,
    updateSettings,
    redefineSettings,

    cyclePhase,
    isWorkingPhase,
    isBreakPhase,
    setWorkingPhase,
    toggleCyclePhase,
    clearCyclePhase,
  };
}, {
  persist: true,
});

function defaultSettings(): Settings {
  return {
    workTime: 1500,
    breakTime: 300,
    playSound: true,
  };
}