<template>
    <CardLayout>
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide">
          Movimientos Recientes
        </h3>
        <!-- Placeholder for a tooltip or info icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
      </div>
      
      <!-- Using DaisyUI's list component for a clean look -->
      <ul class="w-full text-sm ">
        <li v-for="movement in recentMovements" :key="movement.id" class="py-2 border-b last:border-b-0 border-slate-200">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-sm font-medium text-slate-800">{{ movement.name }}</span>
              <span class="text-sm text-slate-500 block">
                <span 
                  :class="{'text-green-500': movement.type === 'Adición', 'text-red-500': movement.type === 'Consumo', 'text-blue-500': movement.type === 'Traslado'}" 
                  class="font-semibold text-sm"
                >
                  {{ movement.quantity }} 
                  {{ movement.unit }}
                </span>
              </span>
            </div>
            <div class="flex-shrink-0">
              <div 
                :class="{
                  'badge-success text-white uppercase font-bold': movement.type === 'Adición',
                  'badge-error text-white uppercase font-bold': movement.type === 'Consumo',
                  'badge-info text-white uppercase font-bold': movement.type === 'Traslado'
                }" 
                class="badge text-xs"
              >
                {{ movement.type }}
              </div>
            </div>
          </div>
          <div class="mt-1 text-xs text-slate-400">
            {{ new Date(movement.timestamp).toLocaleTimeString() }}
          </div>
        </li>
      </ul>
    </CardLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
import CardLayout from '../layouts/CardLayout.vue';
  
  // This is a placeholder array. In a real application, this data would be fetched from your database.
  const recentMovements = ref([
    {
      id: 1,
      name: 'Tomates',
      quantity: 5,
      unit: 'kg',
      type: 'Consumo',
      timestamp: Date.now() - 60000,
    },
    {
      id: 2,
      name: 'Harina',
      quantity: 10,
      unit: 'kg',
      type: 'Adición',
      timestamp: Date.now() - 360000,
    },
    {
      id: 3,
      name: 'Pasta Fresca',
      quantity: 2,
      unit: 'kg',
      type: 'Consumo',
      timestamp: Date.now() - 120000,
    },
    {
      id: 4,
      name: 'Albahaca',
      quantity: 0.5,
      unit: 'kg',
      type: 'Traslado',
      timestamp: Date.now() - 240000,
    },
  ]);
  </script>
  