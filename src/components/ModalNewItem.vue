<template>
    <!-- Modal for adding new items -->
    <dialog id="new_item_modal" class="modal modal-bottom sm:modal-middle" :class="{ 'modal-open': isVisible }">
      <div class="modal-box bg-base-100 rounded-lg p-6 max-w-sm">
  
        <!-- Step 1: Option Selection -->
        <div v-if="currentStep === 'options'">
          <h3 class="font-bold text-lg mb-4">Nuevo ítem</h3>
          <p class="py-4 text-xl font-medium opacity-80 text-center">
            ¿Qué tipo de ítem deseas añadir?
          </p>
          <div class="modal-action flex gap-x-2">
            <button class="btn btn-primary w-1/2 btn-lg" @click="emit('update-step', 'ingrediente')">
              Ingrediente
            </button>
            <button class="btn btn-secondary w-1/2 btn-lg" @click="emit('update-step', 'producto')">
              Producto
            </button>
          </div>
        </div>
  
        <!-- Step 2: Ingrediente Form -->
        <div v-else-if="currentStep === 'ingrediente'">
          <h3 class="font-bold text-lg mb-4">Añadir Ingrediente</h3>
          <form class="space-y-4">
            <input type="text" placeholder="Nombre" class="input input-bordered w-full" />
            <input type="number" placeholder="Cantidad" class="input input-bordered w-full" />
            <select class="select select-bordered w-full">
              <option disabled selected>Unidad</option>
              <option>kg</option>
              <option>litros</option>
              <option>atados</option>
            </select>
            <div class="modal-action flex gap-x-2 justify-between">
              <button class="btn btn-ghost" @click.prevent="emit('update-step', 'options')">
                Regresar
              </button>
              <button class="btn btn-primary">Guardar Ingrediente</button>
            </div>
          </form>
        </div>
  
        <!-- Step 3: Producto Form -->
        <div v-else-if="currentStep === 'producto'">
          <h3 class="font-bold text-lg mb-4">Añadir Producto</h3>
          <form class="space-y-4">
            <input type="text" placeholder="Nombre" class="input input-bordered w-full" />
            <input type="number" placeholder="Cantidad" class="input input-bordered w-full" />
            <select class="select select-bordered w-full">
              <option disabled selected>Unidad</option>
              <option>unidades</option>
              <option>packs</option>
            </select>
            <div class="modal-action flex gap-x-2 justify-between ">
              <button class="btn btn-ghost" @click.prevent="emit('update-step', 'options')">
                Regresar
              </button>
              <button class="btn btn-secondary">Guardar Producto</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Close modal when clicking on the backdrop -->
      <form method="dialog" class="modal-backdrop">
        <button @click="emit('close-modal')">close</button>
      </form>
    </dialog>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Define props to receive state from the parent
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
    currentStep: {
      type: String,
      required: true,
    }
  });
  
  // Define events to communicate changes back to the parent
  const emit = defineEmits(['close-modal', 'update-step']);
  </script>
  