<script setup lang="ts">
import CardLogin from '../components/CardLogin.vue';
import JarIcon from '../components/icons/JarIcon.vue';

</script>

<template>
    <body class="flex flex-col p-6 items-center gap-y-12 justify-center min-h-dvh w-full">
        <div class="flex flex-col gap-y-2">
            <div class="flex justify-center items-center rounded-full w-21 h-21 bg-zinc-300 mx-auto">
                <JarIcon class="size-16 fill-zinc-600"/>
            </div>
            <h1 class="text-7xl text-center font-normal italic tracking-tight">Dispensa</h1>
        </div>

        <CardLogin />
    </body>
</template>
