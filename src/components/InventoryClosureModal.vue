<template>
    <!-- Main modal dialog, controlled by a ref -->
    <dialog ref="dialogRef" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box bg-base-100 rounded-lg p-6 max-w-sm">
        <!-- Modal Close Button -->
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
  
        <!-- Step Indicator -->
        <ul class="steps w-full mb-6 text-xs">
          <li class="step" :class="{ 'step-primary': currentStep >= 1 }">Contar</li>
          <li class="step" :class="{ 'step-primary': currentStep >= 2 }">Confirmar</li>
        </ul>
  
        <!-- Step 1: Digital Count Sheet -->
        <div v-if="currentStep === 1" class="space-y-4">
          <h3 class="font-bold text-lg text-center">Cierre de Inventario</h3>
          <p class="text-sm text-center text-neutral-content">{{ progressText }}</p>
  
          <!-- Scrollable list of items -->
          <div class="space-y-4 max-h-80 overflow-y-auto pr-2">
            <div
              v-for="item in inventoryItems"
              :key="item.name"
              class="bg-base-200 rounded-lg p-3 flex justify-between items-center shadow-sm"
            >
              <div class="flex-1 min-w-0">
                <span class="font-semibold truncate block">{{ item.name }}</span>
                <span class="text-primary">{{ item.initial_quantity }} {{ item.unit }}</span>
              </div>
              
              <!-- Stepper Input with large buttons -->
              <div class="flex items-center gap-1 ml-4">
                <button
                  type="button"
                  class="btn btn-sm btn-circle btn-ghost text-lg"
                  @click="decrementCount(item.name)"
                >
                  -
                </button>
                <input
                  type="number"
                  v-model.number="countedItems[item.name]"
                  class="input input-sm input-bordered w-16 text-center rounded-md"
                  min="0"
                  :max="item.initial_quantity"
                />
                <button
                  type="button"
                  class="btn btn-sm btn-circle btn-ghost text-lg"
                  @click="incrementCount(item.name)"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="modal-action">
            <button class="btn btn-primary w-full rounded-md" :disabled="!isStep1Complete" @click="nextStep">Siguiente</button>
          </div>
        </div>
  
        <!-- Step 2: Confirmation Summary -->
        <div v-else-if="currentStep === 2" class="space-y-4">
          <h3 class="font-bold text-lg text-center">Confirmar Cierre</h3>
          <p class="text-sm text-center text-neutral-content">Revisa los ítems contados antes de confirmar.</p>
          
          <!-- Scrollable summary list -->
          <div class="space-y-2 max-h-80 overflow-y-auto pr-2">
            <div
              v-for="(count, name) in countedItems"
              :key="name"
              class="p-3 bg-base-200 rounded-lg flex justify-between items-center shadow-sm"
            >
              <span class="font-medium">{{ name }}</span>
              <span class="font-semibold">{{ count }} {{ getUnit(name) }}</span>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="modal-action flex justify-between">
            <button class="btn btn-ghost rounded-md" @click="prevStep">Atrás</button>
            <button class="btn btn-primary rounded-md" @click="submitCount">Confirmar Cierre</button>
          </div>
        </div>
      </div>
  
      <!-- Modal backdrop to close when clicked outside -->
      <form method="dialog" class="modal-backdrop">
        <button @click="closeModal">close</button>
      </form>
    </dialog>
  </template>
  
  <script setup>
  import { ref, watch, computed, defineProps, defineEmits } from 'vue';
  
  // Define props and events
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: 'Restaurante'
    }
  });
  const emit = defineEmits(['inventory-counted', 'update:isOpen']);
  
  // Template reference for the dialog element
  const dialogRef = ref(null);
  
  // Reactive state for the modal's steps and data
  const currentStep = ref(1);
  
  // Placeholder inventory data for the specified location
  const inventoryItems = ref([
    { name: 'Tomates', initial_quantity: 50, unit: 'kg' },
    { name: 'Salsa', initial_quantity: 12, unit: 'litros' },
    { name: 'Servilletas', initial_quantity: 200, unit: 'unidades' },
    { name: 'Papas Fritas', initial_quantity: 15, unit: 'bolsas' },
    { name: 'Lechuga', initial_quantity: 30, unit: 'unidades' },
    { name: 'Aceite de Oliva', initial_quantity: 4, unit: 'litros' },
    { name: 'Aguacate', initial_quantity: 8, unit: 'unidades' },
  ]);
  
  // Reactive object to store the final counted values
  const countedItems = ref({});
  
  // Watch the isOpen prop to control the modal's native methods
  watch(() => props.isOpen, (newValue) => {
    if (newValue) {
      dialogRef.value.showModal();
    } else {
      dialogRef.value.close();
      // Reset state when modal is closed
      resetState();
    }
  });
  
  // Resets the modal to its initial state
  const resetState = () => {
    currentStep.value = 1;
    countedItems.value = {};
  };
  
  // Computed property to track progress for the progress indicator
  const progressText = computed(() => {
    const countedCount = Object.keys(countedItems.value).filter(key => typeof countedItems.value[key] === 'number').length;
    const totalItems = inventoryItems.value.length;
    return `Artículos contados: ${countedCount}/${totalItems}`;
  });
  
  // Corrected logic for enabling the "Siguiente" button
  const isStep1Complete = computed(() => {
    return inventoryItems.value.every(item => typeof countedItems.value[item.name] === 'number');
  });
  
  // Logic for stepper buttons
  const incrementCount = (itemName) => {
    const currentCount = countedItems.value[itemName] || 0;
    countedItems.value[itemName] = currentCount + 1;
  };
  
  const decrementCount = (itemName) => {
    const currentCount = countedItems.value[itemName] || 0;
    if (currentCount > 0) {
      countedItems.value[itemName] = currentCount - 1;
    }
  };
  
  // Helper function to get the unit for an item
  const getUnit = (itemName) => {
    const item = inventoryItems.value.find(i => i.name === itemName);
    return item ? item.unit : '';
  };
  
  // Navigation logic
  const nextStep = () => {
    if (isStep1Complete.value) {
      currentStep.value = 2;
    }
  };
  
  const prevStep = () => {
    currentStep.value = 1;
  };
  
  // Submission and event handling
  const submitCount = () => {
    // Format the data for the emitted event
    const finalData = {
      location: props.location,
      date: new Date().toISOString(),
      countedItems: countedItems.value
    };
    emit('inventory-counted', finalData);
    closeModal();
  };
  
  const closeModal = () => {
    emit('update:isOpen', false);
  };
  </script>