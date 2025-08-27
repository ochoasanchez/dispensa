<template>
    <CardQuickLink color="primary" title="Nuevo ítem" @click="inventoryClick()">
        <!-- <ChevronRightIcon class="size-6"/> -->
         <AddIcon class="size-8"/>
    </CardQuickLink>

    <CardQuickLink color="primary" title="Traslados">
        <TruckIcon class="size-8" />
    </CardQuickLink>

    <CardQuickLink color="primary" title="Cierre">
        <InventoryIcon class="size-8" />
    </CardQuickLink>

    <CardQuickLink color="primary" title="Reportes">
        <ReportsIcon class="size-8" />
    </CardQuickLink>
</template>

<script setup>
import CardQuickLink from './CardQuickLink.vue';
import TruckIcon from './icons/TruckIcon.vue';
// import SettingsIcon from './icons/SettingsIcon.vue';
import ReportsIcon from './icons/ReportsIcon.vue';
import AddIcon from './icons/AddIcon.vue';
import InventoryIcon from './icons/InventoryIcon.vue';

const emit = defineEmits(['open-new-item-modal']);

const inventoryClick = () => {
  emit('open-new-item-modal');
  console.log('Inventory clicked');
//   console.log(isModalOpen)
};
</script>