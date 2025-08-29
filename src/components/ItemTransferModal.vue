<template>
    <!-- Modal for multiple item transfers -->
    <dialog ref="dialogRef" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box bg-base-100 rounded-lg p-6 max-w-sm">
        <!-- Horizontal Step Indicator -->
        <ul class="steps w-full mb-6">
          <li
            class="step"
            :class="{
              'step-primary': isStepComplete('locationSelection'),
              'step-neutral': currentStep === 'locationSelection',
            }"
          >
            Ubicaciones
          </li>
          <li
            class="step"
            :class="{
              'step-primary': isStepComplete('itemSelection'),
              'step-neutral': currentStep === 'itemSelection',
            }"
          >
            Ítems
          </li>
          <li
            class="step"
            :class="{
              'step-primary': isStepComplete('preview'),
              'step-neutral': currentStep === 'preview',
            }"
          >
            Confirmar
          </li>
        </ul>
  
        <h3 class="font-bold text-lg mb-4">Transferir Múltiples Ítems</h3>
        <form class="space-y-4" @submit.prevent="handleTransfer">
          <!-- Location Selection -->
          <div v-if="currentStep === 'locationSelection'">
            <!-- Step 1: Select Source Location -->
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Desde:</span>
              </div>
              <select
                v-model="sourceLocation"
                class="select select-bordered w-full"
                required
              >
                <option disabled value="">Seleccionar origen</option>
                <option value="production">Producción</option>
                <option value="restaurant">Restaurante</option>
              </select>
            </label>
  
            <!-- Step 2: Select Destination Location -->
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Para:</span>
              </div>
              <select
                v-model="destinationLocation"
                class="select select-bordered w-full"
                required
              >
                <option disabled value="">Seleccionar destino</option>
                <option
                  v-if="sourceLocation !== 'production'"
                  value="production"
                >
                  Producción
                </option>
                <option
                  v-if="sourceLocation !== 'restaurant'"
                  value="restaurant"
                >
                  Restaurante
                </option>
              </select>
            </label>
          </div>
  
          <!-- Multi-item Selection & Quantity Input -->
          <div v-if="currentStep === 'itemSelection'">
            <!-- Buttons for available items -->
            <div class="label">
              <span class="label-text">Selecciona ítems:</span>
            </div>
            <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2">
              <button
                v-for="item in itemsToSelect"
                :key="item.name"
                type="button"
                @click="selectItem(item)"
                class="btn btn-sm btn-outline flex flex-col justify-center items-center h-full"
              >
                <span class="font-bold text-xs">{{ item.name }}</span>
                <span class="text-xs text-neutral-content"
                  >{{ item.quantity }} {{ item.unit }}</span
                >
              </button>
            </div>
  
            <div
              v-if="selectedItemNames.length > 0"
              class="divider mt-4 mb-2"
            ></div>
  
            <!-- Selected items with quantity input -->
            <div class="label">
              <span class="label-text">Ítems seleccionados:</span>
            </div>
            <div class="space-y-2">
              <div
                v-for="[name, quantity] in Object.entries(selectedItems)"
                :key="name"
                class="flex items-center gap-2 p-2 bg-base-200 rounded-lg"
              >
                <button
                  type="button"
                  @click="removeItem(name)"
                  class="btn btn-sm btn-ghost btn-circle"
                >
                  ✕
                </button>
                <span class="flex-1">{{ name }}</span>
                <input
                  v-model.number="selectedItems[name]"
                  type="number"
                  class="input input-sm input-bordered w-24"
                  min="1"
                  :max="getMaxQuantity(name)"
                  placeholder="Cantidad"
                  required
                />
              </div>
            </div>
          </div>
  
          <!-- Preview & Confirm -->
          <div v-if="currentStep === 'preview'">
            <div class="label">
              <span class="label-text">Resumen de la transferencia:</span>
            </div>
            <div
              class="bg-base-200 rounded-lg p-4 mt-4 space-y-2 text-center"
            >
              <h4 class="font-bold text-lg mb-2">Previsualización</h4>
              <p class="font-bold text-sm">
                Desde:
                {{ sourceLocation === 'production' ? 'Producción' : 'Restaurante' }}
              </p>
              <p class="font-bold text-sm">
                Para:
                {{
                  destinationLocation === 'production'
                    ? 'Producción'
                    : 'Restaurante'
                }}
              </p>
              <ul class="list-disc list-inside text-left">
                <li
                  v-for="[name, quantity] in Object.entries(selectedItems)"
                  :key="name"
                >
                  {{ quantity }} {{ getUnit(name) }} de
                  <span class="font-bold">{{ name }}</span>
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Action Buttons -->
          <div class="modal-action flex gap-x-2 justify-between">
            <button
              v-if="currentStep !== 'locationSelection'"
              class="btn btn-ghost"
              type="button"
              @click.prevent="backStep"
            >
              Regresar
            </button>
            <button
              v-if="currentStep === 'locationSelection'"
              class="btn btn-primary"
              type="button"
              @click.prevent="nextStep"
              :disabled="!sourceLocation || !destinationLocation"
            >
              Siguiente
            </button>
            <button
              v-if="currentStep !== 'locationSelection'"
              class="btn btn-primary"
              type="submit"
              :disabled="!isFormValid"
            >
              Transferir
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="closeModal()">close</button>
      </form>
    </dialog>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { inventoryItems } from '../utils/stock';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['update:isOpen']);
  
  const dialogRef = ref(null);
  
  const sourceLocation = ref('');
  const destinationLocation = ref('');
  const selectedItemNames = ref([]);
  const selectedItems = ref({}); // Use an object to store quantity by item name
  
  const currentStep = ref('locationSelection');
  
  // Step management logic
  const nextStep = () => {
    if (currentStep.value === 'locationSelection' && sourceLocation.value && destinationLocation.value) {
      currentStep.value = 'itemSelection';
    } else if (currentStep.value === 'itemSelection') {
      currentStep.value = 'preview';
    }
  };
  
  const backStep = () => {
    if (currentStep.value === 'itemSelection') {
      currentStep.value = 'locationSelection';
    } else if (currentStep.value === 'preview') {
      currentStep.value = 'itemSelection';
    }
  };
  
  const isStepComplete = (step) => {
    const steps = ['locationSelection', 'itemSelection', 'preview'];
    const currentStepIndex = steps.indexOf(currentStep.value);
    const stepIndex = steps.indexOf(step);
    return stepIndex < currentStepIndex;
  };
  
  // Computed property to filter items based on selected source location
  const availableItems = computed(() => {
    if (!sourceLocation.value) return [];
    const items = inventoryItems.value.filter(
      (item) => item.location === sourceLocation.value && item.quantity > 0
    );
    return items;
  });
  
  // Computed property for the button list
  const itemsToSelect = computed(() => {
    return availableItems.value.filter(
      (item) => !selectedItemNames.value.includes(item.name)
    );
  });
  
  // Helper functions for adding and removing items from the selection
  const selectItem = (item) => {
    selectedItemNames.value.push(item.name);
    selectedItems.value[item.name] = 1; // Default quantity to 1
  };
  
  const removeItem = (itemName) => {
    const index = selectedItemNames.value.indexOf(itemName);
    if (index > -1) {
      selectedItemNames.value.splice(index, 1);
    }
    delete selectedItems.value[itemName];
  };
  
  // Helper function to get the unit for an item name
  const getUnit = (name) => {
    const item = inventoryItems.value.find((i) => i.name === name);
    return item ? item.unit : '';
  };
  
  // Helper function to get the max quantity for an item name
  const getMaxQuantity = (name) => {
    const item = inventoryItems.value.find(
      (i) => i.name === name && i.location === sourceLocation.value
    );
    return item ? item.quantity : 0;
  };
  
  // Computed property to validate the form before submission
  const isFormValid = computed(() => {
    if (currentStep.value === 'locationSelection') {
      return sourceLocation.value && destinationLocation.value;
    }
    if (currentStep.value === 'itemSelection') {
      return (
        selectedItemNames.value.length > 0 &&
        selectedItemNames.value.every(
          (name) => selectedItems.value[name] > 0
        )
      );
    }
    return true; // Preview step is always valid for submission
  });
  
  const closeModal = () => {
    if (dialogRef.value) {
      dialogRef.value.close();
      emit('update:isOpen', false);
      resetForm();
    }
  };
  
  const resetForm = () => {
    sourceLocation.value = '';
    destinationLocation.value = '';
    selectedItemNames.value = [];
    selectedItems.value = {};
    currentStep.value = 'locationSelection';
  };
  
  const handleTransfer = () => {
    if (currentStep.value !== 'preview') {
      currentStep.value = 'preview';
      return;
    }
  
    // Iterate over all selected items and perform the transfer
    for (const itemName in selectedItems.value) {
      const quantityToTransfer = selectedItems.value[itemName];
  
      const sourceItem = inventoryItems.value.find(
        (item) =>
          item.name === itemName && item.location === sourceLocation.value
      );
  
      const destinationItem = inventoryItems.value.find(
        (item) =>
          item.name === itemName && item.location === destinationLocation.value
      );
  
      // Perform the transfer logic
      if (sourceItem) {
        sourceItem.quantity -= quantityToTransfer;
      }
  
      if (destinationItem) {
        destinationItem.quantity += quantityToTransfer;
      } else {
        // Create a new item at the destination if it doesn't exist
        const newItem = {
          id: inventoryItems.value.length + 1,
          name: itemName,
          quantity: quantityToTransfer,
          unit: getUnit(itemName),
          location: destinationLocation.value,
        };
        inventoryItems.value.push(newItem);
      }
    }
  
    // Remove items with zero or less quantity from the original array
    for (let i = inventoryItems.value.length - 1; i >= 0; i--) {
      if (inventoryItems.value[i].quantity <= 0) {
        inventoryItems.value.splice(i, 1);
      }
    }
  
    closeModal();
  };
  
  watch(
    () => props.isOpen,
    (newVal) => {
      if (dialogRef.value) {
        if (newVal) {
          dialogRef.value.showModal();
        } else {
          dialogRef.value.close();
        }
      }
    }
  );
  </script>
  