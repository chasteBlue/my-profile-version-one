<template>
<!--TODO: Fix the dropdown-->
  <HeaderNav />

<section ref="introSection" class="section-1 intro relative flex items-center justify-center overflow-hidden h-screen">
  <!-- Left: Intro Text -->
<div class=" page text-left z-10 relative">
    <h1>Hi! I'm Dynnhiel Chastline Miguel</h1>
    <div class="bg-blue-500 text-white p-2 inline-block rounded">
      <p>Software and Web Developer</p>
    </div>
</div>

  <!-- 3D Scene covers entire section (absolute) -->
  <div ref="sceneContainer" class="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto" id="threeD"> </div>

<div v-if="showMessage" class="message-popup fixed top-4 right-4 z-50 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg shadow-md">
  {{ showMessage }}
</div>
<!-- Arrow to scroll down -->
    <div @click="scrollToSection2" class="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer z-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>





</section>


<section id="section-2" class="section-2 h-screen flex items-center justify-center bg-purple-900 text-white">
    <h2>Welcome to the Next Section</h2>
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

import "../assets/main.css";
import HeaderNav from "../layouts/header.vue";
import { nextTick } from "vue";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';


export default {
  name: "GsapExample",
  components: {
    HeaderNav,
  },
  data() {
    return {
      carModelLoaded: false,
      introAnimation: null,
      router: useRouter(),
      showMessage: '',      
      messages: [
        "🚗 Vroom! That was a clean click.",
        "🛠️ Building dreams, one part at a time.",
        "🔧 You just tuned something great.",
        "💡 That move had horsepower.",
        "🚘 This car’s got potential — thanks to you!",
        "🔥 Customizing like a pro!",
        "🎨 Who needs stock when you've got style?",
        "🧩 Piece by piece, the beast awakens.",
        "⚙️ Torque it like you mean it!",
        "🏎️ Speed is nothing without precision.",
        "💬 Nice! That part fits perfectly.",
        "📦 What's in the box? Car magic.",
        "🛞 Wheels turning... ideas too.",
        "🎮 It’s not just a model, it’s *your* ride.",
        "💻 Real-time building in progress.",
        "📐 Perfect fit — that’s engineering.",
        "🧰 Tweak it till it's perfect.",
        "🚀 That click added 10HP, scientifically proven.",
        "✨ You’ve got an eye for design.",
        "🛻 Garage mode: activated!"
],

    };
  },
  mounted() {
    this.init3D();
    this.carModel = null;
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    nextTick(() => {
    console.log("introSection ref:", this.$refs.introSection);
    gsap.to(this.$refs.introSection.querySelector(".page"), {
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
  const container = this.$refs.sceneContainer;

  // Scene
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  this.camera.position.set(2, 5, 1);

  // Renderer
  this.scene.background = null;
  this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  this.renderer.setClearColor(0x000000, 0); // optional fallback

  this.renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(this.renderer.domElement);

  // Lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  this.scene.add(hemiLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  this.scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  this.scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(this.camera, this.renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

      // Raycaster and mouse vector
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

  // Load FBX model
  const loader = new FBXLoader();
  loader.load(
    "/3D/carf.fbx",
    (fbx) => {
      console.log("FBX Model loaded:", fbx);
      this.carModel = fbx;

      fbx.traverse((child) => {
        if (child.isMesh && !child.material) {
          child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        }
      });

      fbx.position.set(0, 0, 0);
      fbx.scale.set(0.01, 0.01, 0.01);
      this.scene.add(fbx);

      // Fit camera
      const box = new THREE.Box3().setFromObject(fbx);
      const center = box.getCenter(new THREE.Vector3());
      this.camera.lookAt(center);

      // Drag Controls for model
          const dragControls = new DragControls([fbx], this.camera, this.renderer.domElement);

          dragControls.addEventListener('dragstart', () => {
            controls.enabled = false;  // Disable orbit controls during drag
            
            // Show random message on drag start
            const randIndex = Math.floor(Math.random() * this.messages.length);
            this.showMessage = this.messages[randIndex];

            // Animate message fade-out after 2 seconds
            gsap.fromTo(
              ".message-popup",
              { opacity: 1 },
              { opacity: 0, duration: 2, delay: 2, onComplete: () => (this.showMessage = '') }
            );
          });

          dragControls.addEventListener('dragend', () => {
            controls.enabled = true;   // Re-enable orbit controls after drag
          });


const colors = [
  0xbc13fe, // Neon Purple'
    0x8ef9f3, // Ice Blu
  0xc77dff, // Lavender Glow
  0x00ffff, // Electric Blue
  0xff00ff, // Magenta
  0xff69b4, // Hot Pink
  0xff1493, // Cosmic Fuchsia
  0xffffff ];

let i = 0;
fbx.traverse((child) => {
  if (child.isMesh) {
    const color = colors[i % colors.length];
    child.material = new THREE.MeshStandardMaterial({
      color: 0x000000,          // base color dark
      emissive: color,          // glowing neon color
      emissiveIntensity: 2,     // how bright the glow looks
      metalness: 0.3,
      roughness: 0.4
    });
    i++;
  }
});

      // Scroll animation (optional)
      gsap.to(fbx.position, {
        y: 1.5,
        scrollTrigger: {
          trigger: this.$refs.introSection,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
        ease: "power2.out",
      });
    },
    undefined,
    (error) => {
      console.error("Error loading FBX model:", error);
    }
  );

  // Animate loop
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

onPointerDown(event) {
  const rect = this.renderer.domElement.getBoundingClientRect();
  this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  this.raycaster.setFromCamera(this.mouse, this.camera);

  const intersects = this.raycaster.intersectObjects(this.carModel.children, true);

  if (intersects.length > 0) {
    const randIndex = Math.floor(Math.random() * this.messages.length);
    const message = this.messages[randIndex];
    this.showMessage = message;

    // Hide after a delay
    setTimeout(() => {
      this.showMessage = '';
    }, 2000);
  }
},
scrollToSection2() {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: "#section-2" },
        ease: "power2.out"
      });
    }

};


</script>

<style>

.section-1 {
  min-height: 100vh; 
  padding: 20vh;
}

.page {
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
  background: black;
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

.message-popup {
  background-color: white;
  color: black;
  position: absolute;
  transition: opacity 0.3s ease;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  white-space: nowrap;
  z-index: 1000;
  margin: 3rem;
}




  
  
</style>


