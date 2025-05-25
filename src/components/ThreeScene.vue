<template>
  <div
    ref="sceneContainer"
    style="width: 100%; height: 700px;"
  />
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: 'ThreeScene',
  mounted() {
    this.init3D();
  },
  methods: {
    init3D() {
      const container = this.$refs.sceneContainer;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const light = new THREE.HemisphereLight(0xffffff, 0x444444);
      light.position.set(0, 20, 0);
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);


      // Optional background
      scene.background = new THREE.Color(0xf0f0f0);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // smooth control
      controls.dampingFactor = 0.05;
      controls.enableZoom = true; // allow zoom
      controls.autoRotate = true; // start with auto-rotation
      controls.autoRotateSpeed = .5;

      let model = null;

      const loader = new GLTFLoader();
      loader.load('/3D/3dDyan.gltf', (gltf) => {
        model = gltf.scene;
        scene.add(model);
      });

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update(); // required for damping and auto-rotate
        renderer.render(scene, camera);
      };
      animate();
    },
  },
};
</script>
