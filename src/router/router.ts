import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/MainView.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    component: () => import("@/views/ProductView.vue"),
    props: (route) => ({ id: Number(route.params.id) }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
