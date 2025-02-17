<script setup lang="ts">
import AppButton from './AppButton.vue';

interface Props {
  title: string;
}

interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function onClickContainer(e: Event) {
  const target = e.target as HTMLElement;
  if (!target.classList.contains('modal-container')) {
    return;
  }

  emit('close');
}
</script>

<template>
  <div class="modal-container" @click="onClickContainer">
    <div class="modal">
      <div class="header">
        <h4 class="title">{{ props.title }}</h4>

        <AppButton class="btn-close" text="x" @click="emit('close')" />
      </div>

      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  background: rgba(0, 0, 0, .6);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  &.center {
    align-items: center;
  }

  .modal {
    background-color: var(--light-mode-bg);
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 1rem;

    .dark-mode & {
      background-color: var(--dark-mode-bg);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      .title,
      .btn-close {
        color: #fff;
      }

      .title {
        font-size: 4rem;
      }

      .btn-close {
        font-size: 3rem;
      }
    }
  }
}
</style>