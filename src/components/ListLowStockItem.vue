<template>
    <li class="list-row">
      <div>
        <AvatarWithInitial :color=item.color :initials=item.initials />
      </div>
      <div>
        <div>{{ item.name }}</div>
        <div class="text-xs uppercase font-bold text-red-600">
          {{ item.quantity }} {{ item.unit }} 
        </div>
      </div>
      <router-link :to="{ name: 'item' }" class="btn btn-square btn-ghost">
        <ChevronRight class="size-6 opacity-60"/>
      </router-link>
    </li>
</template>
  
<script setup>
import AvatarWithInitial from './AvatarWithInitial.vue';
// import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import ChevronRightIcon from './icons/ChevronRightIcon.vue';

defineProps({
item: {
    type: Object,
    required: true,
}
});
</script>