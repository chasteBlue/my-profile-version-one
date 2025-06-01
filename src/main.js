import { createApp } from "vue";
import App from "./App.vue";
import router from './router/index.ts'
import './assets/main.css'
import * as Icons from "vue-icons-plus/bs"; // Import all Bootstrap icons

const app = createApp(App);

Object.entries(Icons).forEach(([name, component]) => {
  app.component(name, component);
});
app.use(router)
app.mount('#app')