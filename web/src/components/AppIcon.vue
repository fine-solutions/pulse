<script setup>
import { ref } from 'vue';

const COLORS = [
  'black',
  'brown',
  'blue',
  'yellow',
  'orange',
  'red',
  'violet',
  'pink',
  'green',
];

const props = defineProps({
  iconColor: {
    type: String,
    default: 'black',
  },
  switchingInterval: {
    type: Number,
    default: 0,
  },
});

const logoColor = ref('');
const counter = ref(0);
for (let i = 0; i < COLORS.length; i++) {
  if (props.iconColor === COLORS[i]) {
    counter.value = i;
    setLogoColor()
  }
}

if (props.switchingInterval > 0) {
  startCounter()
}

function setLogoColor() {
  logoColor.value = `var(--label-${COLORS[counter.value]})`
}

function startCounter() {
  setInterval(() => {
    if (counter.value < COLORS.length - 1) {
      counter.value += 1
    } else {
      counter.value = 0
    }
    setLogoColor()
  }, props.switchingInterval);
}
</script>

<template>
  <svg class="app-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" :fill="logoColor"/>
    <path d="M0 12H4L6.5 3L10.5 20.5L12.5 12.5L13.5 8L15.5 15L17 12H24" stroke="white" stroke-width="2" stroke-linejoin="round"/>
  </svg>
</template>

<style scoped>

</style>
