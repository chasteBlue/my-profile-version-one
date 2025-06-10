<template>
<!--TODO: Fix the dropdown-->
<section
  ref="introSection"
  class="section-1 intro relative flex items-center justify-center min-h-screen max-h-screen overflow-hidden px-4 sm:px-6 lg:px-8 text-white bg-gray-900"
>
  <!-- Left: Intro Text -->
  <div class="page text-left z-10 relative max-w-3xl w-full">
    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight break-words">
      Hi! I'm Dynnhiel Chastline Miguel
    </h1>
    <div class="bg-blue-500 text-white p-2 mt-4 inline-block rounded shadow">
      <p class="text-sm sm:text-base lg:text-lg font-medium break-words">
        Software and Web Developer
      </p>
    </div>
  </div>

  <!-- 3D Scene -->
  <div ref="sceneContainer" class="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto" id="threeD"></div>

  <!-- Message -->
  <div
  v-if="showMessage"
  class="message-popup fixed top-4 right-4 max-w-xs sm:max-w-sm md:max-w-md w-[90%] sm:w-auto z-50 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-base break-words"
>
  {{ showMessage }}
</div>


  <!-- Down Arrow -->
  <div
    @click="scrollToSection2"
    class="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer z-50"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8 animate-bounce text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</section>


<SectionTwo  id="section-2" />
<ProjectSection />



</template>

<script>
import { useRouter } from "vue-router";
import { nextTick } from "vue";
import "../assets/main.css";

import SectionTwo from "./SectionTwo.vue";
import ProjectSection from "./ProjectSection.vue";

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
    SectionTwo,
    ProjectSection,
  },
  data() {
    return {
      carModelLoaded: false,
      computerLoaded: false,
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
    this.computer = null;
    
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
  scrollToSection2() {
      const section = document.querySelector("#section-2");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
  },
init3D() {
  const container = this.$refs.sceneContainer;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  this.camera.position.set(4, -1, 3);

  this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  this.renderer.setClearColor(0x000000, 0);
  this.renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(this.renderer.domElement);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  this.scene.add(hemiLight);
  this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  this.scene.add(directionalLight);

  const controls = new OrbitControls(this.camera, this.renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;

  this.raycaster = new THREE.Raycaster();
  this.mouse = new THREE.Vector2();

  const loader = new FBXLoader();
  const interactiveModels = [];

 // const colors = [0xbc13fe, 0x8ef9f3, 0xc77dff, 0x00ffff, 0xff00ff, 0xff69b4, 0xff1493, 0xffffff];
const colors = [
  0x00fff7, // Neon Cyan
  0x8c52ff, // Deep Purple Glow
  0x3c1361, // Dark Violet
  0xff00ff, // Magenta Core
  0xff4ec3, // Neon Pink
  0x39ff14, // Alien Green
  0xd936ff, // Ultraviolet
  0x00ffcc, // Hologram Teal
  0xffffff  // White Glow (for contrast)
];

  // Function to handle model after loading
  const handleModel = (fbx, position) => {
    fbx.position.copy(position);
    fbx.scale.set(0.01, 0.01, 0.01);

    let i = 0;
    fbx.traverse((child) => {
      if (child.isMesh) {
        const color = colors[i % colors.length];
        child.material = new THREE.MeshStandardMaterial({
          color: 0x000000,
          emissive: color,
          emissiveIntensity: 2,
          metalness: 0.3,
          roughness: 0.4
        });
        i++;
      }
    });

    this.scene.add(fbx);
    interactiveModels.push(fbx);
  };

  // Load both models
  loader.load("/3D/carf.fbx", (fbx) => {
    this.carModel = fbx;
    handleModel(fbx, new THREE.Vector3(-1, -3, 3));
  });

  loader.load("/3D/computer10.fbx", (fbx) => {
    this.computerModel = fbx;
    handleModel(fbx, new THREE.Vector3(2, 0, 0)); // move to the right of the car
  });

  // After a small delay (ensure both loaded), enable drag controls
  setTimeout(() => {
    const dragControls = new DragControls(interactiveModels, this.camera, this.renderer.domElement);

    dragControls.addEventListener('dragstart', () => {
      controls.enabled = false;
      const randIndex = Math.floor(Math.random() * this.messages.length);
      this.showMessage = this.messages[randIndex];

      gsap.fromTo(
        ".message-popup",
        { opacity: 1 },
        { opacity: 0, duration: 2, delay: 2, onComplete: () => (this.showMessage = '') }
      );
    });

    dragControls.addEventListener('dragend', () => {
      controls.enabled = true;
    });
  }, 1000); // wait 1s to ensure both models are loaded

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
}

};


</script>

<style>



.page {
  color: dark;
  line-height: 5em;
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
  white-space: nowrap;
  z-index: 1000;
  margin: 3rem;
}




  
  
</style>


