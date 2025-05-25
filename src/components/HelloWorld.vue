<template>
  <div ref="sceneContainer" class="mainBG"/>
    <div>
      
    </div>
</template>

<script setup>
import '../assets/main.css'  // Corrected CSS import
import { ref, onMounted } from 'vue'

const sceneContainer = ref(null)

onMounted(() => {
  console.log(sceneContainer.value) // Access DOM element after component is mounted
})
</script>
