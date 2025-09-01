<template>
  <CardLayout>
    <!-- <div class="bg-white p-6 rounded-lg shadow-sm w-full"> -->
      <div class="flex items-center justify-between">
        <h3
          class="text-sm font-semibold text-slate-500 uppercase tracking-wide"
        >
          Valor del Inventario
        </h3>
        <!-- Placeholder for a tooltip or info icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-slate-400 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div class="mt-4 flex items-end justify-between">
        <div class="text-3xl font-bold text-slate-900">
          {{ formattedValue }}
        </div>
        <!-- Placeholder for a positive or negative change indicator -->
        <div class="flex items-center text-sm font-medium text-green-500">
          +2.5%
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    <!-- </div> -->
  </CardLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import CardLayout from "../layouts/CardLayout.vue";

// This is a placeholder value. In a real app, this would come from your database.
const inventoryValue = ref(1540.5);

const formattedValue = computed(() => {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
  }).format(inventoryValue.value);
});
</script>
