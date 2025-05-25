// src/router/index.ts (for Vue 3 + TypeScript)
import { createRouter, createWebHistory } from 'vue-router'
import ThreeScene from '../components/ThreeScene.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  { path: '/about', component: ThreeScene },
  { path: '/', component: HelloWorld },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
