<script setup lang="ts">
import AppMenu from './components/AppMenu.vue';
import AppTimer from './components/AppTimer.vue';
import { useAppStore } from './stores/app';

const appStore = useAppStore();
</script>

<template>
  <div :class="{
    'pomodorus': true,
    'dark-mode': appStore.darkMode,
    'working-phase': appStore.isWorkingPhase,
    'break-phase': appStore.isBreakPhase,
  }">
    <div class="menu">
      <AppMenu />
    </div>

    <main>
      <AppTimer class="app-timer" />
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --dark-mode-bg: #162131;
  --light-mode-bg: #1E6FE4;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 10px;
}

.pomodorus {
  height: 100vh;
  background-color: var(--light-mode-bg);
  transition: 0.3s cubic-bezier(0.25, 1.5, 0.5, 1);

  &.dark-mode {
    background-color: var(--dark-mode-bg);

    &.working-phase {
      background-color: #5A0304;
    }

    &.break-phase {
      background-color: #006607;
    }
  }

  &.working-phase {
    background-color: #B00003;
  }

  &.break-phase {
    background-color: #009C0A;
  }

  .menu {
    height: 100px;
  }

  main {
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;

    .app-timer {
      margin-top: 8rem;
    }
  }
}
</style>