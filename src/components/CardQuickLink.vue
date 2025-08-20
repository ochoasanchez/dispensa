<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  color?: 'primary' | 'secondary' | 'accent' | 'neutral',
  title?: 'Card title!';
  url?: string
}>(), {
  color: 'primary'
});

const cardClasses = computed(() => {
  // Use a lookup object to map prop values to class arrays.
  const colorMap = {
    primary: ['bg-primary', 'text-primary-content'],
    secondary: ['bg-secondary', 'text-secondary-content'],
    accent: ['bg-accent', 'text-accent-content'],
    neutral: ['bg-neutral', 'text-neutral-content'],
  };
  
  // Get the dynamic classes from the map based on the prop,
  // then spread them into a new array with the static classes.
  return [
    ...colorMap[props.color],
    'card',
    'w-full',
    'aspect-3/2'
  ];
});

</script>

<template>
  <!-- The `:class` binding accepts an array of class strings. -->
  <router-link :class="cardClasses" :to="{ name: url}">
    <div class="card-body justify-center items-center">
      <!-- Slot for icon -->
      <slot></slot>
      <!-- <h2 class="card-title">{{title}}</h2> -->
      <h2 class="text-2xl text-center">{{title}}</h2>
      <!-- <div class="card-actions justify-end">
      </div> -->
    </div>
  </router-link>
</template>
