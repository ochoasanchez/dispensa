<template>
  <BaseLayout title="Inventario">
    <!-- Header with 'Add New Item' Button and Quick Links -->
    <div class="grid grid-cols-2 gap-3 w-full items-center">
      <InventoryQuickLinks @open-new-item-modal="openModal()" />
    </div>

    <!-- Production Items Table -->
    <CardLayout>
      <h2 class="text-2xl font-semibold mb-4 text-base-content">Producción</h2>
      <table class="table w-full">
        <!-- Table Header -->
        <thead>
          <tr class="text-base text-base-content/80">
            <th>Artículo</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <tr v-for="item in filteredProductionItems" :key="item.name" class="hover:bg-base-200 transition-colors duration-200">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity + ' ' + item.unit }}</td>
          </tr>
        </tbody>
      </table>
    </CardLayout>

    <!-- Restaurant Items Table -->
    <CardLayout>
      <div class="flex gap-x-2 items-center">
        <h2 class="text-2xl font-semibold m-0 text-base-content">Restaurante</h2>
      </div>
      <table class="table w-full">
        <!-- Table Header -->
        <thead>
          <tr class="text-base text-base-content/80">
            <th>Artículo</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          <tr v-for="item in filteredRestaurantItems" :key="item.name" class="hover:bg-base-200 transition-colors duration-200">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity + ' ' + item.unit }}</td>
          </tr>
        </tbody>
      </table>
    </CardLayout>
    <!-- Use a template ref to get a reference to the child component -->
    <ModalNewItem ref="modalRef" :current-step="modalStep" @update-step="modalStep = $event" />
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue';
import InventoryQuickLinks from '../components/InventoryQuickLinks.vue';
import CardLayout from '../layouts/CardLayout.vue';
import ModalNewItem from '../components/ModalNewItem.vue';
import { inventoryItems } from '../utils/stock';

// Create a template ref to get a reference to the ModalNewItem component instance
const modalRef = ref(null);

// Reactive state to handle the steps inside the modal
const modalStep = ref('options');

// This function will now call the 'openModal' method on the child component
const openModal = () => {
  if (modalRef.value) {
    modalRef.value.openModal();
  }
};

// Use a computed property to filter production items from the single source of truth
const filteredProductionItems = computed(() => {
  return inventoryItems.value.filter(item => item.location === 'production');
});

// Use a computed property to filter restaurant items from the single source of truth
const filteredRestaurantItems = computed(() => {
  return inventoryItems.value.filter(item => item.location === 'restaurant');
});

</script>

<style scoped>
/* Scoped styles can be added here if needed, but Tailwind handles most of it. */
</style>
