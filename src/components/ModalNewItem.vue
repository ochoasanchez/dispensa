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
} from "vue";
import { inventoryItems, ingredientList } from "../utils/stock";

const props = defineProps({
  currentStep: {
    type: String,
    required: true,
  },
  // The new prop to control modal visibility
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(["update-step", "add-item", "update:isOpen"]);

const dialogRef = ref(null);

const closeModal = () => {
  if (dialogRef.value) {
    dialogRef.value.close();
    // Emit the update event to notify the parent that the modal is closed
    emit("update:isOpen", false);
  }
};

// Use a watcher to open or close the modal based on the isOpen prop
watch(() => props.isOpen, (newVal) => {
  if (dialogRef.value) {
    if (newVal) {
      dialogRef.value.showModal();
    } else {
      dialogRef.value.close();
      emit("update-step", "options"); // Reset step when closing
    }
  }
});

// Reactive state for the form inputs
const selectedIngredientName = ref("");
const newItemName = ref("");
const quantity = ref(null);
const unit = ref("");
const location = ref("");

const getNextId = () => {
  const maxId = inventoryItems.value.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );
  return maxId + 1;
};

const showNewItemInput = computed(
  () => selectedIngredientName.value === "new-item"
);

const selectedUnit = computed(() => {
  const selected = ingredientList.value.find(
    (item) => item.name === selectedIngredientName.value
  );
  return selected ? selected.unit : "";
});

watch(selectedIngredientName, (newValue) => {
  if (newValue !== "new-item") {
    const selected = ingredientList.value.find(
      (item) => item.name === newValue
    );
    if (selected) {
      unit.value = selected.unit;
    }
  } else {
    unit.value = "";
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

  if (!finalItemName || !quantity.value || !finalUnit || !finalLocation) {
    alert("Por favor, rellene todos los campos.");
    return;
  }

  const existingItemIndex = inventoryItems.value.findIndex(
    (item) => item.name === finalItemName && item.location === finalLocation
  );

  if (existingItemIndex !== -1) {
    inventoryItems.value[existingItemIndex].quantity += quantity.value;
  } else {
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
    inventoryItems.value.push(newItem);
  }

  selectedIngredientName.value = "";
  newItemName.value = "";
  quantity.value = null;
  unit.value = "";
  location.value = "";
  closeModal();
};
</script>
