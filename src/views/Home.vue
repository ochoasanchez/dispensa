<template>
    <BaseLayout title="Inicio">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
            <HomeQuickLinks />

            <!-- TODO: Fix this and show 4 items per widget -->
            <ListLowStock class="col-span-2" :items="lowStockRestaurant" title="Stock bajo restaurant"/>

            <ListLowStock class="col-span-2" :items="lowStockProductionBase" title="Stock bajo producción" />

            <WidgetIngredientsGraph class="col-span-2" />
        </div>
    </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '../layouts/BaseLayout.vue';
import HomeQuickLinks from '../components/HomeQuickLinks.vue';
import ListLowStock from '../components/ListLowStock.vue';
import WidgetIngredientsGraph from '../components/WidgetIngredientsGraph.vue';
import {lowStockRestaurant, lowStockProductionBase} from '../utils/stock';
</script>

