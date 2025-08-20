<script setup lang="ts">
import BaseLayout from '../layouts/BaseLayout.vue';
import AvatarWithInitial from '../components/AvatarWithInitial.vue';
// import ChevronRight from '../components/icons/ChevronRight.vue';
import Stats from '../components/Stats.vue';
import CardLayout from '../layouts/CardLayout.vue';
import TableItemDeliveries from '../components/TableItemDeliveries.vue';
</script>

<template>
    <BaseLayout title="Detalles">
        <div class="flex flex-col justify-start w-full">
            <!-- <h1 class="text-6xl text-center uppercase font-normal italic tracking-tight">Detalles</h1> -->
            <div class="breadcrumbs text-sm self-center">
                <ul>
                    <li><a>Inventario</a></li>
                    <li><a>Materia prima</a></li>
                    <li>Tomate</li>
                </ul>
            </div>
                            
            <CardLayout class="w-full flex flex-row gap-x-6 mt-2">
                <div class="flex gap-x-6">
                    <AvatarWithInitial color="red" initials="T" />
                    <div>
                        <h2 class="text-xl">Tomate</h2>
                        <div class="text-md uppercase font-semibold opacity-60">IDK</div>
                    </div>
                </div>
            </CardLayout>
        </div>
        <Stats />
        <CardLayout>
            <TableItemDeliveries />
        </CardLayout>
        <router-link :to="{ name: 'home' }" class="btn btn-primary btn-lg">Volver</router-link >
    </BaseLayout>
</template>