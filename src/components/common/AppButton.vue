<script setup lang="ts">
interface Props {
  text?: string;
}

interface Emits {
  (e: 'click'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <button type="button" @click="emit('click')">
    <slot v-if="$slots.default"></slot>
    <template v-else>
      {{ props.text }}
    </template>
  </button>
</template>

<style scoped>
button {
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: inherit;
  font-size: inherit;
}
</style>