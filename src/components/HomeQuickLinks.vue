<template>
    <CardQuickLink color="primary" title="Inventario" url="inventory">
        <!-- <ChevronRightIcon class="size-6"/> -->
         <ShelvesIcon class="size-8"/>
    </CardQuickLink>

    <CardQuickLink color="secondary" title="Producción">
        <FactoryIcon class="size-8" />
    </CardQuickLink>

    <CardQuickLink color="accent" title="Consumo">
        <SkilletIcon class="size-8" />
    </CardQuickLink>

    <CardQuickLink color="neutral" title="Recetas">
        <ChefHatIcon class="size-8" />
    </CardQuickLink>
</template>

<script setup>
import CardQuickLink from './CardQuickLink.vue';
import ShelvesIcon from './icons/ShelvesIcon.vue';
import FactoryIcon from './icons/FactoryIcon.vue';
import SkilletIcon from './icons/SkilletIcon.vue';
import ChefHatIcon from './icons/ChefHatIcon.vue';
</script>