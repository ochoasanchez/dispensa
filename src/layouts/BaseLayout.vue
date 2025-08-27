<template>
    <Navbar />
    <main class="flex flex-col p-4 items-center gap-y-6 justify-between w-full">
        <h1 class="text-5xl text-center uppercase font-normal italic tracking-tight mt-2">{{title}}</h1>
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue';

defineProps({
    title: String,
});

</script>