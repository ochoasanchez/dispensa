<template>
    <CardQuickLink color="primary" title="Nuevo ítem" @click="inventoryClick()">
      <!-- <ChevronRightIcon class="size-6"/> -->
      <AddIcon class="size-8" />
    </CardQuickLink>
  
    <CardQuickLink color="primary" title="Traslados" @click="transferClick()">
      <TruckIcon class="size-8" />
    </CardQuickLink>
  
    <CardQuickLink color="primary" title="Cierre" @click="closureClick()">
      <InventoryIcon class="size-8" />
    </CardQuickLink>
  
    <CardQuickLink color="primary" title="Reportes" url="reports">
      <ReportsIcon class="size-8" />
    </CardQuickLink>
  </template>
  
  <script setup>
  import CardQuickLink from './CardQuickLink.vue';
  import TruckIcon from './icons/TruckIcon.vue';
  import ReportsIcon from './icons/ReportsIcon.vue';
  import AddIcon from './icons/AddIcon.vue';
  import InventoryIcon from './icons/InventoryIcon.vue';
  
  // The component now emits two different events
  // Add this line to your <script setup> block
// const emit = defineEmits(['open-closure-modal']);
  const emit = defineEmits(['open-new-item-modal', 'open-transfer-modal', 'open-closure-modal']);
  
  const inventoryClick = () => {
    emit('open-new-item-modal');
    console.log('Inventory clicked');
  };
  
  const transferClick = () => {
    // Emit a new event when the "Traslados" card is clicked
    emit('open-transfer-modal');
    console.log('Transfer clicked');
  };

  const closureClick = () => {
    // Emit a new event when the "Cierre" card is clicked
    emit('open-closure-modal');
    console.log('Closure clicked');
  };

  </script>
  