<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import AppButton from './common/AppButton.vue';
import PlayIcon from './icons/PlayIcon.vue';
import TimerIcon from './icons/TimerIcon.vue';
import StopIcon from './icons/StopIcon.vue';
import PauseIcon from './icons/PauseIcon.vue';
import { useAppStore } from '@/stores/app';
import alarm from '@/assets/alarm.wav';

type ControlState = 'stopped' | 'playing' | 'paused';

const appStore = useAppStore();

const controlState = ref<ControlState>('stopped');

const cycleInterval = ref<number>(0);
const remainingSeconds = ref(0);

const currentMinutesAmount = computed(() => Math.floor(remainingSeconds.value / 60));
const currentSecondsAmount = computed(() => remainingSeconds.value % 60);
const displayMinutesAmount = computed<string>(() => String(currentMinutesAmount.value).padStart(2, '0'));
const displaySecondsAmount = computed<string>(() => String(currentSecondsAmount.value).padStart(2, '0'));

const showPlay = computed(() => controlState.value !== 'playing');
const showStop = computed(() => controlState.value !== 'stopped');
const showPause = computed(() => controlState.value === 'playing');

onBeforeMount(onClickStop);

watch(remainingSeconds, (newValue: number) => {
  if (newValue > 0) {
    return;
  }

  switchCyclePhase();
});

watch([() => appStore.getBreakTime, () => appStore.getWorkTime], onClickStop);

function onClickPlay() {
  if (!appStore.cyclePhase) {
    appStore.setWorkingPhase();
  }

  const startTime = Date.now();
  const endTime = startTime + remainingSeconds.value * 1000;

  cycleInterval.value = setInterval(() => {
    const now = Date.now();
    remainingSeconds.value = Math.max(0, Math.ceil((endTime - now) / 1000));
  }, 1000);

  controlState.value = 'playing';
}

function onClickPause() {
  clearInterval(cycleInterval.value);
  controlState.value = 'paused';
}

function onClickStop() {
  clearInterval(cycleInterval.value);
  appStore.clearCyclePhase();
  remainingSeconds.value = appStore.getWorkTime;
  controlState.value = 'stopped';
}

function getInitialRemainingSeconds(): number {
  return appStore.isWorkingPhase ? appStore.getWorkTime : appStore.getBreakTime;
}

function switchCyclePhase() {
  clearInterval(cycleInterval.value);
  appStore.toggleCyclePhase();
  remainingSeconds.value = getInitialRemainingSeconds();
  setTimeout(onClickPlay, 500);
  if (appStore.shouldPlaySound) {
    const audio = new Audio(alarm);
    audio.play();
  }
}
</script>

<template>
  <div class="timer">
    <TimerIcon />

    <div class="countdown">
      <span>{{ displayMinutesAmount[0] }}</span>
      <span>{{ displayMinutesAmount[1] }}</span>
      <div class="separator"></div>
      <span>{{ displaySecondsAmount[0] }}</span>
      <span>{{ displaySecondsAmount[1] }}</span>
    </div>

    <div class="controls">
      <AppButton @click="onClickStop" v-if="showStop">
        <StopIcon />
      </AppButton>

      <AppButton @click="onClickPause" v-if="showPause">
        <PauseIcon />
      </AppButton>

      <AppButton @click="onClickPlay" v-if="showPlay">
        <PlayIcon />
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .countdown span,
  .controls svg {
    --color: #fff;

    color: var(--color);
    fill: var(--color);
    stroke: var(--color);

    .dark-mode.working-phase & {
      --color: #9E1A1C;
    }

    .dark-mode.break-phase & {
      --color: #00E20F;
    }

    .working-phase & {
      --color: #FF0004;
    }

    .break-phase & {
      --color: #00E20F;
    }
  }
}

.countdown {
  position: absolute;
  display: flex;
  gap: 1rem;

  span {
    font-family: 'Roboto Mono', sans-serif;
    font-weight: bold;
    font-size: 10rem;
    margin-top: 50px;

    color: #000;
  }

  .separator {
    margin: 0 1.3rem;
  }
}

.controls {
  position: absolute;
  margin-top: 220px;
  display: flex;
  gap: 2rem;

  svg {
    width: 5rem;
    height: 5rem;
  }
}
</style>