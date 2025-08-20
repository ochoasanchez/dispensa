import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import ItemDetails from '../views/ItemDetails.vue';
import Inventory from '../views/Inventory.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: Inventory
    },
    {
      path: '/item',
      name: 'item',
      component: ItemDetails
    },
    // You can add more routes here later
    {
      path: '/',
      redirect: '/login' // Redirect root to login
    }
  ]
});

export default router;