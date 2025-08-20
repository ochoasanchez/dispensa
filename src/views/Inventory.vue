<template>
  <BaseLayout title="Inventario">
    <!-- Header with 'Add New Item' Button and Quick Links -->
    <div class="grid grid-cols-2 gap-3 w-full items-center">
      <InventoryQuickLinks  @open-new-item-modal="isModalOpen = true"/>
      <!-- The 'Añadir Nuevo Artículo' button that will open the modal -->
      <!-- <button class="btn btn-primary" @open-new-item-modal="isModalOpen = true">Añadir Nuevo Artículo</button> -->
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
          <tr v-for="item in productionItems" :key="item.articulo" class="hover:bg-base-200 transition-colors duration-200">
            <td>{{ item.articulo }}</td>
            <td>{{ item.cantidad + ' ' + item.unidad }}</td>
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
          <tr v-for="item in restaurantItems" :key="item.articulo" class="hover:bg-base-200 transition-colors duration-200">
            <td>{{ item.articulo }}</td>
            <td>{{ item.cantidad + ' ' + item.unidad }}</td>
          </tr>
        </tbody>
      </table>
    </CardLayout>
    <ModalNewItem :is-visible="isModalOpen" :current-step="modalStep" @close-modal="isModalOpen = false" @update-step="modalStep = $event" />

  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue';
import BaseLayout from '../layouts/BaseLayout.vue';
import InventoryQuickLinks from '../components/InventoryQuickLinks.vue';
import CardLayout from '../layouts/CardLayout.vue';
import ModalNewItem from '../components/ModalNewItem.vue';

// Reactive state to control the modal's visibility
const isModalOpen = ref(false);

// Reactive state to handle the steps inside the modal
const modalStep = ref('options');

// Placeholder data for the Production table
const productionItems = ref([
  { articulo: 'Harina de trigo', cantidad: 50, unidad: 'kg' },
  { articulo: 'Azúcar', cantidad: 25, unidad: 'kg' },
  { articulo: 'Aceite de oliva', cantidad: 10, unidad: 'litros' },
  { articulo: 'Tomates enlatados', cantidad: 100, unidad: 'latas' },
  { articulo: 'Albahaca fresca', cantidad: 2, unidad: 'atados' },
]);

// Placeholder data for the Restaurant table
const restaurantItems = ref([
  { articulo: 'Pasta fresca', cantidad: 15, unidad: 'kg' },
  { articulo: 'Queso Parmesano', cantidad: 5, unidad: 'kg' },
  { articulo: 'Carne molida', cantidad: 20, unidad: 'kg' },
  { articulo: 'Salmón', cantidad: 8, unidad: 'kg' },
  { articulo: 'Pan de ajo', cantidad: 30, unidad: 'unidades' },
]);
</script>

<style scoped>
/* Scoped styles can be added here if needed, but Tailwind handles most of it. */
</style>
