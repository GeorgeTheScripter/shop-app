import { Component, createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import uiComponents from "@/components/UI/index";
import router from "@/router/router";
import VueSplide from "@splidejs/vue-splide";

const app = createApp(App);

uiComponents.forEach((component: Component) => {
  app.component(component.name!, component);
});

app.use(router).use(VueSplide).use(createPinia()).mount("#app");
