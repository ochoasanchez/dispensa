<template>
  <!-- Modal for adding new items -->
  <dialog ref="dialogRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box bg-base-100 rounded-lg p-6 max-w-sm">
      <!-- Step 1: Option Selection -->
      <div v-if="currentStep === 'options'">
        <h3 class="font-bold text-lg mb-4">Nuevo ítem</h3>
        <p class="py-4 text-xl font-medium opacity-80 text-center">
          ¿Qué tipo de ítem deseas añadir?
        </p>
        <div class="modal-action flex gap-x-2">
          <button
            class="btn btn-primary w-1/2 btn-lg"
            @click="emit('update-step', 'ingrediente')"
          >
            Ingrediente
          </button>
          <button
            class="btn btn-secondary w-1/2 btn-lg"
            @click="emit('update-step', 'producto')"
          >
            Producto
          </button>
        </div>
      </div>

      <!-- Step 2: Ingrediente Form -->
      <div v-else-if="currentStep === 'ingrediente'">
        <h3 class="font-bold text-lg mb-4">Añadir Ingrediente</h3>
        <form class="space-y-4" @submit.prevent="handleFormSubmit">
          <select
            v-model="selectedIngredientName"
            class="select select-bordered w-full"
          >
            <option value="" disabled selected>Seleccionar ingrediente</option>
            <option value="new-item">Nuevo ítem...</option>
            <!-- Here is the fix: access the ref directly without .value -->
            <option
              v-for="ingredient in ingredientList"
              :key="ingredient.name"
              :value="ingredient.name"
            >
              {{ ingredient.name }}
            </option>
          </select>

          <!-- Conditionally show text input for new items -->
          <input
            v-if="showNewItemInput"
            v-model="newItemName"
            type="text"
            placeholder="Nombre del nuevo ingrediente"
            class="input input-bordered w-full"
            required
          />

          <input
            v-model.number="quantity"
            type="number"
            placeholder="Cantidad"
            class="input input-bordered w-full"
            required
          />

          <!-- Conditionally show unit select or a static text field -->
          <select
            v-model="unit"
            class="select select-bordered w-full"
            :disabled="!showNewItemInput"
          >
            <option disabled value="">Unidad</option>
            <option>kg</option>
            <option>litros</option>
            <option>atados</option>
            <option>unidades</option>
            <option>packs</option>
          </select>
          <p v-if="!showNewItemInput" class="text-sm text-gray-500 mt-2">
            Unidad: {{ selectedUnit }}
          </p>

          <!-- New: Location select -->
          <select
            v-model="location"
            class="select select-bordered w-full"
            required
          >
            <option disabled value="">Seleccionar ubicación</option>
            <option value="production">Producción</option>
            <option value="restaurant">Restaurante</option>
          </select>

          <div class="modal-action flex gap-x-2 justify-between">
            <button
              class="btn btn-ghost"
              @click="emit('update-step', 'options')"
            >
              Regresar
            </button>
            <button class="btn btn-primary" type="submit">
              Guardar Ingrediente
            </button>
          </div>
        </form>
      </div>

      <!-- Step 3: Producto Form -->
      <div v-else-if="currentStep === 'producto'">
        <h3 class="font-bold text-lg mb-4">Añadir Producto</h3>
        <form class="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            class="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Cantidad"
            class="input input-bordered w-full"
          />
          <select class="select select-bordered w-full">
            <option disabled selected>Unidad</option>
            <option>unidades</option>
            <option>packs</option>
          </select>
          <div class="modal-action flex gap-x-2 justify-between">
            <button
              class="btn btn-ghost"
              @click.prevent="emit('update-step', 'options')"
            >
              Regresar
            </button>
            <button class="btn btn-secondary">Guardar Producto</button>
          </div>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal()">close</button>
    </form>
  </dialog>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  defineProps,
  defineEmits,
  defineExpose,
} from "vue";
import { inventoryItems, ingredientList } from "../utils/stock";

// Define props to receive state from the parent
const props = defineProps({
  currentStep: {
    type: String,
    required: true,
  },
});

// Define events to communicate changes back to the parent
const emit = defineEmits(["update-step", "add-item"]);

// A template ref for the dialog element itself
const dialogRef = ref(null);

// Expose the methods the parent component will use to open and close the modal
const openModal = () => {
  if (dialogRef.value) {
    dialogRef.value.showModal();
    console.log("Modal is open");
  }
};

const closeModal = () => {
  if (dialogRef.value) {
    dialogRef.value.close();
    // We can also emit a close event for the parent to handle if needed,
    // although the native close method is often sufficient.
    emit("update-step", "options"); // Reset step when closing
  }
};

// Use defineExpose to make the methods available to the parent component
defineExpose({
  openModal,
  closeModal,
});

// Reactive state for the form inputs
const selectedIngredientName = ref("");
const newItemName = ref("");
const quantity = ref(null);
const unit = ref("");
const location = ref(""); // New state variable for location

// Generate a new unique ID for each new item
const getNextId = () => {
  const maxId = inventoryItems.value.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );
  return maxId + 1;
};

// Computed property to check if the "New item" text input should be shown
const showNewItemInput = computed(
  () => selectedIngredientName.value === "new-item"
);

// Computed property to set the unit based on the selected ingredient
const selectedUnit = computed(() => {
  const selected = ingredientList.value.find(
    (item) => item.name === selectedIngredientName.value
  );
  return selected ? selected.unit : "";
});

// Watch for changes in the selected ingredient and update the unit
watch(selectedIngredientName, (newValue) => {
  if (newValue !== "new-item") {
    const selected = ingredientList.value.find(
      (item) => item.name === newValue
    );
    if (selected) {
      unit.value = selected.unit;
    }
  } else {
    unit.value = ""; // Reset unit for new items
  }
});

const handleFormSubmit = () => {
  let finalItemName;
  let finalUnit;
  let finalLocation;

  if (selectedIngredientName.value === "new-item") {
    finalItemName = newItemName.value;
    finalUnit = unit.value;
  } else {
    finalItemName = selectedIngredientName.value;
    finalUnit = selectedUnit.value;
  }

  finalLocation = location.value;

  // Basic validation
  if (!finalItemName || !quantity.value || !finalUnit || !finalLocation) {
    alert("Por favor, rellene todos los campos.");
    return;
  }

  // Find if an item with the same name and location already exists in the inventoryItems array
  const existingItemIndex = inventoryItems.value.findIndex(
    (item) => item.name === finalItemName && item.location === finalLocation
  );

  if (existingItemIndex !== -1) {
    // If the item exists, update its quantity by adding the new amount
    // We are directly modifying the reactive ref here.
    inventoryItems.value[existingItemIndex].quantity += quantity.value;
    console.log(`Updated quantity for existing item: ${finalItemName}`);
    // debugger;
  } else {
    // If the item doesn't exist, create a new one as before
    const isNewIngredient = !ingredientList.value.some(
      (item) => item.name === finalItemName
    );
    if (isNewIngredient) {
      ingredientList.value.push({ name: finalItemName, unit: finalUnit });
    }

    const newItem = {
      id: getNextId(),
      name: finalItemName,
      quantity: quantity.value,
      unit: finalUnit,
      location: finalLocation,
    };
    // Add the new item to the inventoryItems ref, triggering reactivity
    inventoryItems.value.push(newItem);
    console.log(`Added new item: ${finalItemName}`);
  }

  // Reset form state and close modal
  selectedIngredientName.value = "";
  newItemName.value = "";
  quantity.value = null;
  unit.value = "";
  location.value = "";
  closeModal(); // Call the internal method to close the modal
};
</script>
