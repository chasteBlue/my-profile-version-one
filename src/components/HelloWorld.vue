<template>
  <HeaderNav />
  <div class="h-screen">
  <div class="bg-blue-900 h-screen flex items-center justify-center" ref="sceneContainer">
    <button class="flex items-center bg-white px-4 py-3 text-blue-600 hover:bg-blue-400 rounded" @click="goAbout">
      3D Home
    </button>
  </div></div>

  <div class="h-screen">
  <div class="bg-blue-900 h-screen flex items-center justify-center" ref="sceneContainer">
    <button class="flex items-center bg-white px-4 py-3 text-blue-600 hover:bg-blue-400 rounded" @click="goAbout">
      3D Home
    </button>
  </div></div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import '../assets/main.css'
import HeaderNav from '../layouts/header.vue';

import { ref, onMounted } from 'vue'
const router = useRouter()
const sceneContainer = ref(null)

function goAbout(){
  router.push('/about')
}

onMounted(() => {
  console.log(sceneContainer.value)
})
</script>
