import { Component, createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import uiComponents from "@/components/UI/index";
import router from "@/router/router";
import VueSplide from "@splidejs/vue-splide";
import { initializedStores } from "./plugins/storeInit";

const app = createApp(App);
const pinia = initializedStores();

uiComponents.forEach((component: Component) => {
  app.component(component.name!, component);
});

app.use(pinia).use(router).use(VueSplide).mount("#app");
