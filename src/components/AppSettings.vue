<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import AppButton from './common/AppButton.vue';
import AppModal from './common/AppModal.vue';
import TimeInput from './common/TimeInput.vue';
import DownloadIcon from './icons/DownloadIcon.vue';
import SoundIcon from './icons/SoundIcon.vue';
import UploadIcon from './icons/UploadIcon.vue';
import { ref, watch } from 'vue';
import type { Settings } from '@/types';

interface Emits {
  (e: 'close'): void;
}

interface Form {
  workTime: string;
  breakTime: string;
  playSound: boolean;
}

const appStore = useAppStore();

const emit = defineEmits<Emits>();

const form = ref<Form>({
  workTime: secondsToMinutes(appStore.settings.workTime).toString(),
  breakTime: secondsToMinutes(appStore.settings.breakTime).toString(),
  playSound: appStore.settings.playSound,
});

watch(form, (newValue: Form) => {
  const newSettings = {
    workTime: minutesToSeconds(Number(newValue.workTime)),
    breakTime: minutesToSeconds(Number(newValue.breakTime)),
    playSound: newValue.playSound,
  };
  appStore.updateSettings(newSettings);
}, { deep: true });

function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / 60);
}

function minutesToSeconds(minutes: number): number {
  return minutes * 60;
}

function onClickPlaySound() {
  form.value.playSound = !form.value.playSound;
}

function onClickImportData() {
  const input = document.querySelector('input#import') as HTMLInputElement;
  input.click();
}

function onChangeImportInput(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files?.length) {
    target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const json = JSON.parse(String(e.target?.result)) as Settings;
      appStore.updateSettings(json);
      const formData = {
        workTime: secondsToMinutes(json.workTime),
        breakTime: secondsToMinutes(json.breakTime),
        playSound: json.playSound,
      };
      Object.assign(form.value, formData);
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Invalid JSON file', error);
      alert('Import data error, try again');
    }
  };
  reader.readAsText(target.files[0]);
}

function onClickExportData() {
  const data = JSON.stringify(appStore.settings);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = 'pomodorus.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
</script>

<template>
  <AppModal class="center" title="Settings" @close="emit('close')">
    <div class="settings">
      <div class="work-time">
        <span>Work time</span>

        <TimeInput v-model="form.workTime" />

        <span>minutes</span>
      </div>

      <div class="break-time">
        <span>Break time</span>

        <TimeInput v-model="form.breakTime" />

        <span>minutes</span>
      </div>

      <div class="sound">
        <span>Play sound</span>

        <div class="icon-container">
          <AppButton @click="onClickPlaySound">
            <SoundIcon class="icon" :on="form.playSound" />
          </AppButton>
        </div>
      </div>

      <AppButton class="button" @click="onClickImportData">
        <span>Import data</span>
        <UploadIcon />
      </AppButton>

      <input
        type="file"
        id="import"
        accept=".json"
        @change="onChangeImportInput"
      />

      <AppButton class="button" @click="onClickExportData">
        <span>Export data</span>
        <DownloadIcon />
      </AppButton>
    </div>
  </AppModal>
</template>

<style lang="scss" scoped>
.settings {
  font-size: 3.2rem;
  color: #fff;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;

  .work-time,
  .break-time,
  .sound {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 6rem 1fr;
    align-items: center;
    gap: 1rem;
  }

  .sound {
    margin-bottom: 2rem;

    .icon-container {
      width: 6rem;
      height: 6rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 4rem;
        height: 4rem;
      }
    }
  }

  input#import {
    display: none;
  }

  .button {
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>