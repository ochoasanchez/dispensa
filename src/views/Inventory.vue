<template>
  <BaseLayout title="Inventario">
    <!-- Header with 'Add New Item' Button and Quick Links -->
    <div class="grid grid-cols-2 gap-3 w-full items-center">
      <InventoryQuickLinks
        @open-new-item-modal="openNewItemModal"
        @open-transfer-modal="openTransferModal"
      />
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
          <tr
            v-for="item in filteredProductionItems"
            :key="item.name"
            class="hover:bg-base-200 transition-colors duration-200"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.quantity + " " + item.unit }}</td>
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
          <tr
            v-for="item in filteredRestaurantItems"
            :key="item.name"
            class="hover:bg-base-200 transition-colors duration-200"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.quantity + " " + item.unit }}</td>
          </tr>
        </tbody>
      </table>
    </CardLayout>

    <!-- Modal for adding new items, now uses the prop-based approach -->
    <ModalNewItem
      :is-open="isNewItemModalOpen"
      :current-step="modalStep"
      @update-step="modalStep = $event"
      @update:is-open="isNewItemModalOpen = $event"
    />
    
    <!-- Modal for item transfers -->
    <ItemTransferModal
      :is-open="isTransferModalOpen"
      @update:is-open="isTransferModalOpen = $event"
    />
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import InventoryQuickLinks from "../components/InventoryQuickLinks.vue";
import CardLayout from "../layouts/CardLayout.vue";
import ModalNewItem from "../components/ModalNewItem.vue";
import ItemTransferModal from "../components/ItemTransferModal.vue";
import { inventoryItems } from "../utils/stock";

// Reactive state to control the visibility of the new item modal
const isNewItemModalOpen = ref(false);
const modalStep = ref("options");

// Reactive state to control the visibility of the transfer modal
const isTransferModalOpen = ref(false);

// This function is now much simpler. It just toggles the state variable.
const openNewItemModal = () => {
  isNewItemModalOpen.value = true;
};

// This function is the same as before.
const openTransferModal = () => {
  isTransferModalOpen.value = true;
};

const filteredProductionItems = computed(() => {
  return inventoryItems.value.filter((item) => item.location === "production");
});

const filteredRestaurantItems = computed(() => {
  return inventoryItems.value.filter((item) => item.location === "restaurant");
});
</script>

<style scoped>
/* Scoped styles can be added here if needed, but Tailwind handles most of it. */
</style>
