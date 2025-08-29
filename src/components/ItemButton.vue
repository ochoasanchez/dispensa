<template>
    <!--
      This button component is used to display and select a single item.
      It shows the item's name and quantity, and emits an event when clicked.
    -->
    <button
      type="button"
      @click="$emit('item-selected', item)"
      class="btn btn-sm btn-outline flex flex-col justify-center items-center h-full"
    >
      <!-- Display the item's name with bold styling -->
      <span class="font-bold text-xs">{{ item.name }}</span>
      <!-- Display the item's current quantity and unit -->
      <span class="text-xs text-neutral-content"
        >{{ item.quantity }} {{ item.unit }}</span
      >
    </button>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Define the props this component expects.
  // It needs an `item` object containing name, quantity, and unit.
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  });
  
  // Define the custom events this component can emit.
  // The `item-selected` event is emitted when the button is clicked.
  const emit = defineEmits(['item-selected']);
  </script>
  