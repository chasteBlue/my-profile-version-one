<template>
  <!--TODO: Responsive-->
   <header
  ref="sceneContainer"
  :class="[
    'fixed pl-4 pr-4 top-0 left-0 w-full h-[160px] transition-transform ease-in-out duration-300 z-110',
    isHidden ? '-translate-y-full' : 'translate-y-0'
  ]">

    <nav class= "flex items-center bg-gray-100 p-4 z-50 w-full">

        <!-- Left part (larger) -->
        <div class="flex-2">
          <img src="../assets/logo/whole_logo.png" class="w-full max-w-xs h-auto" alt="Logo">
        </div>

      <!-- Hamburger Icon (Mobile only) -->
      <button v-if="showHamburger" @click="isOpen = true" class="text-gray-700" aria-label="Open Menu">
        <BsList class="text-2xl" />
      </button>

        <!-- Middle + Right (Desktop only) -->
        <div v-if="isDesktop" class="flex flex-2 justify-between items-center">
          <!-- Middle Section -->
          <ul class="flex justify-center space-x-12 py-4 flex-1 text-left">
            <li class="flex flex-col items-left space-y-1">
              <span class="font-semibold">Message me</span>
              <div class="text-sm flex items-left space-x-2 text-gray-500">
                <BsEnvelope class="text-blue-500" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=chastlinem@gmail.com" rel="noopener noreferrer" target="_blank"  class="hover:text-blue-600">
                  chastlinem@gmail.com
                </a>
              </div>
            </li>
            <li class="flex flex-col items-left space-y-1">
              <span class="font-semibold">Call me</span>
              <div class="text-sm flex items-left space-x-2 text-gray-500">
                <BsTelephone class="text-blue-500" />
                <a href="tel:+639511687732" class="hover:text-blue-600">
                  PH (+63)951 168 7732
                </a>
              </div>
            </li>
          </ul>

          <!-- Right Section -->
          <div class="text-right">
            <a href="/CV-Dynnhiel.pdf" download
              class="bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center gap-2">
              <BsDownload />
              Download My CV
            </a>
          </div>
        </div>
      </nav>


      <!-- Secondary Navigation -->
      <nav v-if="isDesktop" class="flex justify-between items-center bg-blue-900 text-white text-sm px-4 py-2 z-[-10] relative">
        <!-- Socials -->
        <div class="flex space-x-3">
          <a href="#" class="hover:underline">About Me</a>
          <a href="#" class="hover:underline">Projects</a>
          <a href="#" class="hover:underline">Experience</a>
          <a href="#" class="hover:underline">Contact Me</a>
        </div>

        <!-- Tabs -->
        <div class="flex space-x-4">
          <a href="#" class="hover:underline"><BsFacebook /></a>
          <a href="#" class="hover:underline"><BsGithub /></a>
          <a href="#" class="hover:underline"><BsLinkedin /></a>
          <a href="#" class="hover:underline"><BsTwitter /></a>
        </div>
      </nav>
</header>

    <!-- Sidebar Menu (Mobile/Tablet only) -->
<div v-show="isOpen && !isDesktop"
  class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 z-120">
  <button @click="isOpen = false" class="absolute top-4 right-4 text-gray-600 text-2xl"> ×
  </button>

  <ul class="flex flex-col space-y-6 pt-8">
    <li>
      <span class="font-semibold block">Message me</span>
      <div class="text-sm flex items-center space-x-2 text-gray-500 mt-1">
        <BsEnvelope class="text-blue-500" />
        <a href="mailto:chastlinem@gmail.com" class="hover:text-blue-600">
          chastlinem@gmail.com
        </a>
      </div>
    </li>
    <li>
      <span class="font-semibold block">Call me</span>
      <div class="text-sm flex items-center space-x-2 text-gray-500 mt-1">
        <BsTelephone class="text-blue-500" />
        <a href="tel:+1234567890" class="hover:text-blue-600">
          Ph (+63)951 168 7732
        </a>
      </div>
    </li>
    <li>
    <a
        href="/CV-Dynnhiel.pdf"
        download
        class="bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
      >
        <BsDownload />
        Download My CV
      </a>
    </li>
  </ul>
<aside class="text-black flex flex-col justify-between p-6">
    <!-- Navigation Links -->
    <nav class="flex flex-col space-y-6 text-lg font-medium">
      <a href="#" class="hover:underline hover:text-blue-400 transition">About Me</a>
      <a href="#" class="hover:underline hover:text-blue-400 transition">Projects</a>
      <a href="#" class="hover:underline hover:text-blue-400 transition">Experience</a>
      <a href="#" class="hover:underline hover:text-blue-400 transition">Contact Me</a>
    </nav>

    <!-- Social Icons -->
    <div class="flex space-x-6 mt-10">
      <a href="#" aria-label="Facebook" class="hover:text-blue-600 transition">
        <BsFacebook class="w-6 h-6" />
      </a>
      <a href="#" aria-label="GitHub" class="hover:text-gray-400 transition">
        <BsGithub class="w-6 h-6" />
      </a>
      <a href="#" aria-label="LinkedIn" class="hover:text-blue-500 transition">
        <BsLinkedin class="w-6 h-6" />
      </a>
      <a href="#" aria-label="Twitter" class="hover:text-blue-400 transition">
        <BsTwitter class="w-6 h-6" />
      </a>
    </div>
  </aside>
</div>

</template>

<script>
import { BsList, BsDownload, BsTelephone, BsEnvelope, BsFacebook, BsGithub, BsTwitter, BsLinkedin } from "vue-icons-plus/bs";

export default {
  name: "HeaderNav",
  components: {
    BsList,
    BsDownload,
    BsTelephone,
    BsEnvelope,
    BsFacebook,
    BsGithub,
    BsTwitter,
    BsLinkedin,
  },
   data() {
    return {
      isOpen: false, 
      showHamburger: window.innerWidth <= 1230,
      isDesktop: window.innerWidth >= 1230,
      isFlex: window.innerWidth >= 1230,
      windowWidth:window.innerWidth,
      isHidden: true,
      lastScrollY: 0, 
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    this.handleResize(); // initialize on mount
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleScroll() {
      const currentScroll = window.scrollY;
      this.isHidden = currentScroll === 0; // Hide when scrolling down
      this.lastScrollY = Math.max(currentScroll, 0); // Update last scroll position
    },
    handleResize() {
    const width = window.innerWidth;
    this.isDesktop = width >= 1230; // update reactive desktop flag
    this.showHamburger = window.innerWidth <= 1230;
    this.isFlex = width >= 1230;

    if (width > 1230 && this.isOpen) {
      this.isOpen = false;
    }

    
  },

  },
}
</script>
<style scoped>
/* Optional for smoother hiding nav on scroll */
nav, .sidebar-nav {
  will-change: transform;
  transition: ease-in-out;
}
</style>

