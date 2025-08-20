<template>
    <BaseLayout title="Inicio">
        <div class="grid grid-cols-2 gap-3 w-full">
            <HomeQuickLinks />

            <ListLowStock class="col-span-2" :items="lowStockRestaurant" title="Stock bajo restaurant"/>

            <ListLowStock class="col-span-2" :items="lowStockProductionHouse" title="Stock bajo producción" />

            <WidgetIngredientsGraph class="col-span-2" />
        </div>
    </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '../layouts/BaseLayout.vue';
import HomeQuickLinks from '../components/HomeQuickLinks.vue';
import ListLowStock from '../components/ListLowStock.vue';
import WidgetIngredientsGraph from '../components/WidgetIngredientsGraph.vue';
import {lowStockRestaurant, lowStockProductionHouse} from '../utils/stock';
</script>

