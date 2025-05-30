<template>
  <!-- Secondary Navigation -->
   <header ref="sceneContainer" :class="['fixed top-0 left-0 w-full h-[120px] transition-transform duration-300 z-50',
      isHidden ? '-translate-y-full' : 'translate-y-0']">
    <nav class= "flex items-center bg-gray-100 p-4">
        <!-- Left part (larger) -->
        <div class="flex-2">
          <img src="../assets/logo/whole_logo.png" class="w-full max-w-xs h-auto" alt="Logo">
        </div>

        <!-- Middle part -->
        <div class="flex-1 text-center">
          <ul class="flex justify-center space-x-4">
            <li><a href="#" class="hover:text-blue-600">Menu 1</a></li>
            <li><a href="#" class="hover:text-blue-600">Menu 2</a></li>
          </ul>
        </div>

        <!-- Right part -->
        <div class="flex-1 text-right">
                <a
                  href="/CV-Dynnhiel.pdf"
                  download
                  class="bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
                >
                  <BeakerIcon class="w-6 h-6 text-black" />
                  Download PDF
                </a>

          </div>
      </nav>

      <!-- Secondary Navigation -->
      <nav class="flex justify-between items-center bg-blue-900 text-white text-sm px-4 py-2">
        <!-- Socials -->
        <div class="flex space-x-3">
          <a href="#" class="hover:underline">Facebook</a>
          <a href="#" class="hover:underline">Twitter</a>
          <a href="#" class="hover:underline">GitHub</a>
        </div>

        <!-- Tabs -->
        <div class="flex space-x-4">
          <a href="#" class="hover:underline">Projects</a>
          <a href="#" class="hover:underline">Skills</a>
          <a href="#" class="hover:underline">Contact</a>
        </div>
      </nav>
</header>
</template>

<script>
import { DocumentDownloadIcon } from '@heroicons/vue/24/solid'
//TO DO: Add new Icon Library
export default {
  name: 'HeaderNav',
  components: {
    DocumentDownloadIcon,
  },
  data() {
    return {
      isHidden: false,
      lastScrollY: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const currentScroll = window.scrollY
      this.isHidden = currentScroll > this.lastScrollY
      this.lastScrollY = Math.max(currentScroll, 0)
    }
  }
}
</script>
