<script setup lang="ts">

const model = defineModel({ default: '' });

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  let val = target.value.replace(/[^0-9]/g, '');
  if (Number(val) > 60) {
    val = '60';
  }
  target.value = val;
  model.value = val;
}
</script>

<template>
  <input type="text" :value="model" @input="onInput" />
</template>

<style lang="scss" scoped>
input {
  font-family: 'Rajdhani';
  height: 6rem;
  width: 6rem;
  text-align: center;
  font-size: 3.2rem;
  background-color: #2D4261;
  border: 1px solid #fff;
  border-radius: 8px;
  color: #fff;
}
</style>