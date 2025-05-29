<template>
  <div ref="sceneContainer" class="bg-blue-900 h-screen flex items-center justify-center">
    <button
      @click="goAbout"
      class="flex items-center bg-white px-4 py-3 text-blue-600 hover:bg-blue-400 rounded"
    >
      3D Home
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import '../assets/main.css'

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
