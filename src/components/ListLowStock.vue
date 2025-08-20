<template>
    <CardLayout :title="title">
        <ListLowStockItem v-for="item in items" :key="item.id" :item="item" />
    </CardLayout>
  <!-- <ul class="list bg-base-100 rounded-box shadow-md">
    <li class="p-4 pb-2 text-lg uppercase font-semibold opacity-20 tracking-wide">{{title}}</li>
  </ul> -->
</template>

<script setup>
import CardLayout from '../layouts/CardListLayout.vue';
import ListLowStockItem from './ListLowStockItem.vue';

defineProps({
  items: {
    type: Object,
    required: true,
  },
  title: String,
});
</script>
