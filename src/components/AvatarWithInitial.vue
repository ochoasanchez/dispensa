<template>
  <div
    :class="[
      'h-10 w-10 rounded-full flex items-center justify-center font-bold',
      backgroundColorClass,
      textColorClass,
      textSizeClass,
    ]"
  >
    <span>{{ initials.toUpperCase() }}</span>
  </div>
</template>

<script setup>
import {  computed } from 'vue';
import { supportedColors, colorClasses } from '../utils/colors';

const props = defineProps({
  color: {
    type: String,
    required: true,
    validator: (value) => supportedColors.includes(value),
  },
  initials: {
    type: String,
    required: true,
    validator: (value) => value.length >= 1 && value.length <= 3
  },
});

const backgroundColorClass = computed(() => colorClasses[props.color].bg);

const textColorClass = computed(() => colorClasses[props.color].text);

const textSizeClass = computed(() => {
  if (props.initials.length === 3) {
    return 'text-md';
  }
  return 'text-lg';
});
</script>
