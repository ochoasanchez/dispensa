<script setup lang="ts">
import FactoryIcon from './icons/FactoryIcon.vue';
import RestaurantIcon from './icons/RestaurantIcon.vue';

</script>

<template>
  <div class="stats shadow">
    <div class="stat">
      <div class="stat-figure text-secondary">
        <FactoryIcon class="size-8" />
      </div>
      <div class="stat-title">Producción</div>
      <div class="stat-value">20 Kg</div>
      <!-- <div class="stat-desc">Ene 1 - Ene 8</div> -->
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <RestaurantIcon class="size-8" />
      </div>
      <div class="stat-title">Restaurant</div>
      <div class="stat-value">0 Kg</div>
      <!-- <div class="stat-desc">Ene 1 - Ene 8</div> -->
    </div>
<!-- 
    <div class="stat">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-8 w-8 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          ></path>
        </svg>
      </div>
      <div class="stat-title">New Registers</div>
      <div class="stat-value">1,200</div>
      <div class="stat-desc">↘︎ 90 (14%)</div>
    </div> -->
  </div>
</template>
