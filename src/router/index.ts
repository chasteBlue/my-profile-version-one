// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import BodyLayout from '@/layouts/body.vue'   // your layout wrapper
import ThreeScene from '@/components/ThreeScene.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import SectionTwo from '@/components/SectionTwo.vue'

const routes = [
  {
    path: '/',
    component: BodyLayout,   // The layout wrapper
    children: [
      { path: '', component: HelloWorld }, 
      { path: '', component: SectionTwo }, 
      { path: 'about', component: ThreeScene }, // about page
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
