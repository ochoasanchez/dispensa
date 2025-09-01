<template>
    <!-- Main DaisyUI drawer container -->
    <div class="drawer">
      <!-- Hidden checkbox to control the drawer's open/close state. -->
      <input id="main-drawer-toggle" type="checkbox" class="drawer-toggle" />
  
      <!-- Main content container. Everything inside this will be pushed by the drawer. -->
      <div class="drawer-content">
        <!-- Navbar section, visible on all screens. -->
        <div class="navbar bg-base-100 shadow-sm">
          <div class="flex-1">
            <!-- The button is now a label linked to the hidden checkbox, directly toggling the drawer. -->
            <label for="main-drawer-toggle" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-5 w-5 stroke-current"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div class="flex">
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src="https://avatar.iran.liara.run/public/53"
                  />
                </div>
              </div>
              <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-max p-2 shadow"
              >
                <li>
                  <a class="justify-between">
                    Profile
                    <!-- <span class="badge">New</span> -->
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- Slot for the rest of the page's content, which will be below the Navbar. -->
        <slot></slot>
      </div>
  
      <!-- The drawer side container, which slides in from the left. -->
      <div class="drawer-side">
        <!-- Clickable backdrop to close the drawer. -->
        <label for="main-drawer-toggle" aria-label="close sidebar" class="drawer-overlay"></label>
        
        <!-- The menu content inside the drawer. -->
        <ul class="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          <h2 class="text-xl font-bold mb-4">Menú</h2>
          <li class="my-1"><a href="/home">Inicio</a></li>
          <li class="my-1"><a href="/inventory">Inventario</a></li>
          <li class="my-1"><a href="#">Reportes</a></li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No script needed for this component. DaisyUI handles the logic with the checkbox.
  </script>
  