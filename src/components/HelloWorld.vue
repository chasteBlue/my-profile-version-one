<template>
<!--TODO: Fix the GL-->
  <HeaderNav />

<section ref="introSection" class="section-1 intro flex items-center justify-center">
  <!-- Left: Intro Text -->
  <div class="w-1/2 p-6 page text-left">
    <h1>Hi! I'm Dynnhiel</h1>
    <p>Software and Web Developer</p>
  </div>

  <!-- Right: Image (Pinned with ScrollTrigger) -->
    <div class="w-1/2 p-6 flex justify-center items-center">
      <div class="w-1/2 p-6 flex justify-center items-center">
    <!-- Mount Three.js here -->
        <div ref="sceneContainer" class="w-full h-[400px]"></div>
      </div>
    </div>

</section>

<section class="next-section h-screen flex items-center justify-center bg-gray-300">
  <h2>Next Section Content</h2>
</section>

  
  <div class="h-screen">


</div>

  <div class="h-screen">
  <div class="bg-blue-900 h-screen flex items-center justify-center">
    <button class="flex items-center bg-white px-4 py-3 text-blue-600 hover:bg-blue-400 rounded" @click="goAbout">
      3D Home
    </button>
  </div></div>
</template>

<script>
import { useRouter } from "vue-router";
import { gsap } from "gsap";
import "../assets/main.css";
import HeaderNav from "../layouts/header.vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nextTick } from "vue";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: "GsapExample",
  components: {
    HeaderNav,
  },
  data() {
    return { // ✅ moved here
      carModelLoaded: false,
      introAnimation: null,
      sceneContainer: null,
      router: useRouter(),
    };
  },
  mounted() {
    this.init3D();
    this.scene = new THREE.Scene();  // plain property
    this.camera = new THREE.PerspectiveCamera(
  75,                                  // field of view (fov)
  window.innerWidth / window.innerHeight,  // aspect ratio
  0.1,                                 // near clipping plane
  1000                                 // far clipping plane
);

this.renderer = new THREE.WebGLRenderer({ alpha: true });
this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.carModel = null;
    gsap.registerPlugin(ScrollTrigger);

    nextTick(() => {
      console.log(this.$refs.introSection);
      gsap.to(this.$refs.introTitle, {
        scrollTrigger: {
          trigger: this.$refs.introSection,
          start: "top top",
          end: "center top",
          scrub: 1,
        },
        opacity: 0,
        scale: 2,
      });
    });
  },
  beforeUnmount() {
    if (this.introAnimation) {
      this.introAnimation.kill();
    }
  },
  methods: {
    
  init3D() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 5);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.$refs.sceneContainer.appendChild(this.renderer.domElement);

    const loader = new GLTFLoader();
    loader.load("/3D/car.gltf", (gltf) => {
      this.carModel = gltf.scene;
      this.scene.add(this.carModel);

      gsap.to(this.carModel.position, {
        y: 1.5,
        scrollTrigger: {
          trigger: this.$refs.introSection,
          start: "top center",
          end: "bottom center",
          scrub: true,
          markers: true,
        },
        ease: "power2.out",
      });
    });

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  },


    goAbout() {
      this.router.push("/about");
    },
  },
};

</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
 .section-1 {
  min-height: 100vh; 
  padding: 20vh;;/* Makes sure there's enough space to scroll */
}

.page {
  font-family: "Quicksand", sans-serif;
  color: dark;
  line-height: 5em;
}

section {
  height: 100vh;
}

h1 {
  font-size: 4vw;
}

.intro {
  background: gray;
  color: white;

  }

.intro p {
    max-width: 480px;
    font-size: 2vw;
  }

.secondary {
  background: #65cfe5;
  position: relative;
}

.image-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-layer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20%;
}

  
  
</style>


