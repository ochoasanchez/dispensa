import { ref, computed } from 'vue';

// A simple counter for generating unique IDs for the inventory entries
let nextId = 1;

// Define a list of ingredients with their default units.
// This is your master data.
export const ingredientList = ref([
  { name: 'Harina de trigo', unit: 'kg' },
  { name: 'Azúcar', unit: 'kg' },
  { name: 'Aceite de oliva', unit: 'litros' },
  { name: 'Tomates enlatados', unit: 'latas' },
  { name: 'Albahaca fresca', unit: 'atados' },
  { name: 'Pasta fresca', unit: 'kg' },
  { name: 'Queso Parmesano', unit: 'kg' },
  { name: 'Carne molida', unit: 'kg' },
  { name: 'Salmón', unit: 'kg' },
  { name: 'Pan de ajo', unit: 'unites' },
]);

// Single source of truth for all inventory items
export const inventoryItems = ref([
  { id: nextId++, name: 'Harina de trigo', quantity: 50, unit: 'kg', location: 'production' },
  { id: nextId++, name: 'Azúcar', quantity: 25, unit: 'kg', location: 'production' },
  { id: nextId++, name: 'Aceite de oliva', quantity: 10, unit: 'litros', location: 'production' },
  { id: nextId++, name: 'Tomates enlatados', quantity: 100, unit: 'latas', location: 'production' },
  { id: nextId++, name: 'Albahaca fresca', quantity: 2, unit: 'atados', location: 'production' },
  { id: nextId++, name: 'Pasta fresca', quantity: 15, unit: 'kg', location: 'restaurant' },
  { id: nextId++, name: 'Queso Parmesano', quantity: 5, unit: 'kg', location: 'restaurant' },
  { id: nextId++, name: 'Carne molida', quantity: 20, unit: 'kg', location: 'restaurant' },
  { id: nextId++, name: 'Salmón', quantity: 8, unit: 'kg', location: 'restaurant' },
  { id: nextId++, name: 'Pan de ajo', quantity: 30, unit: 'unites', location: 'restaurant' },
]);

// Production Items (now a reactive computed property)
export const productionItems = computed(() => {
  return inventoryItems.value
    .filter(item => item.location === 'production')
    .map(item => {
      const { location, ...rest } = item;
      return rest;
    });
});

// Restaurant Items (now a reactive computed property)
export const restaurantItems = computed(() => {
  return inventoryItems.value
    .filter(item => item.location === 'restaurant')
    .map(item => {
      const { location, ...rest } = item;
      return rest;
    });
});

// Low stock items for the restaurant, now populated manually
export const lowStockRestaurant = ref([
  { id: 7, name: 'Queso Parmesano', quantity: 5, unit: 'kg', location: 'restaurant', color: 'yellow', initials: 'QP' },
  { id: 9, name: 'Salmón', quantity: 8, unit: 'kg', location: 'restaurant', color: 'pink', initials: 'SLM' },
]);

// Low stock items for the production base, now populated manually
export const lowStockProductionBase = ref([
  { id: 5, name: 'Albahaca fresca', quantity: 2, unit: 'atados', location: 'production', color: 'green', initials: 'ALB' },
  { id: 3, name: 'Aceite de oliva', quantity: 10, unit: 'litros', location: 'production', color: 'lime', initials: 'OLI' },
]);
