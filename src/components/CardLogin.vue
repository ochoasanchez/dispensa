<script setup lang="ts">
import InputEmail from './InputEmail.vue';
import InputPassword from './InputPassword.vue';
</script>

<template>
    <div class="card lg:card-side bg-base-100 shadow-sm">
        <figure class="h-64">
          <img
            src="../../public/images/img_login.jpg"
            alt="Album" />
        </figure>

        <div class="card-body gap-y-4">
          <h2 class="card-title font-normal text-2xl self-center">Entra a tu cuenta</h2>

          <InputEmail />

          <InputPassword />

          <div class="card-actions">
            <button class="btn btn-primary w-full">Entrar</button>
          </div>

          <router-link :to="{ name: 'home' }" class="link text-center">Entrar como invitado</router-link>
        </div>
      </div>
</template>