<template>
  <div class="min-h-screen flex flex-col">
    <!-- Fixed or sticky header -->
    <HeaderNav />

    <!-- Main content grows to fill space -->
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>


<script>
import HeaderNav from "./header.vue";

export default {
  name: "BodyLayout",
  components: {
    HeaderNav,
},
};
</script>

