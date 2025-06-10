<template>
  <div>
<!--TODO: Edit this page-->
    <!-- Ball Path Section -->
    <section class="h-[200vh] bg-black relative overflow-hidden" ref="pathSection">
      <div
        ref="ball"
        class="w-24 h-24 bg-red-500 rounded-full absolute top-0 left-0"

      ></div>
    </section>

    <!-- Section 2 -->
    <section class="h-screen bg-gray-200 text-black flex items-center justify-center">
      <h1 class="text-4xl">Destination</h1>
    </section>
  </div>
</template>

<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default {
  name: 'ProjectSection',
  mounted() {
    const ball = this.$refs.ball
    const section = this.$refs.pathSection

    gsap.to(ball, {
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 200, y: 100 },
          { x: 400, y: 300 },
          { x: window.innerWidth - 100, y: window.innerHeight - 100 }
        ],
        curviness: 1.5,
        autoRotate: false
      },
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
        markers: false
      },
      keyframes: [
    { scale: 1, duration: 0 },
    { scale: 1.8, duration: 0.5 },
    { scale: 1, duration: 0.5 },
  ]
    })
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>
