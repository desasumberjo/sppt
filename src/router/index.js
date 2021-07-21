import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/pencarian",
    name: "Pencarian",
    component: () => import(/* webpackChunkName: "about" */ "../views/Pencarian.vue"),
  },
  {
    path: "/pajak",
    name: "Tax",
    component: () => import(/* webpackChunkName: "about" */ "../views/Tax.vue"),
  },
  {
    path: "/tambah-pajak",
    name: "AddTax",
    component: () => import(/* webpackChunkName: "about" */ "../views/Tax/AddTax.vue"),
  },
  {
    path: "/edit-pajak",
    name: "EditTax",
    component: () => import(/* webpackChunkName: "about" */ "../views/Tax/EditTax.vue"),
  },
  {
    path: "/tambah-data",
    name: "TambahData",
    component: () => import(/* webpackChunkName: "about" */ "../views/TambahData.vue"),
  },
  {
    path: "/edit-data",
    name: "EditSPPT",
    component: () => import(/* webpackChunkName: "about" */ "../views/EditSPPT.vue"),
  },
  {
    path: "/mutasi-data",
    name: "MutasiDataPersonal",
    component: () => import(/* webpackChunkName: "about" */ "../views/MutasiDataPersonal.vue"),
  },
  {
    path: "/data-keluarga",
    name: "DataFamily",
    component: () => import(/* webpackChunkName: "about" */ "../views/DataFamily.vue"),
  },
  {
    path: "/data-admin",
    name: "DataAdmin",
    component: () => import(/* webpackChunkName: "about" */ "../views/DataAdmin.vue"),
  },
  {
    path: "/tambah-admin",
    name: "TambahAdmin",
    component: () => import(/* webpackChunkName: "about" */ "../views/TambahAdmin.vue"),
  },
  {
    path: "/tambah-keluarga",
    name: "AddFamily",
    component: () => import(/* webpackChunkName: "about" */ "../views/AddFamily.vue"),
  },
  {
    path: "/edit-keluarga",
    name: "EditFamily",
    component: () => import(/* webpackChunkName: "about" */ "../views/EditFamily.vue"),
  },
  {
    path: "/delete-keluarga",
    name: "DeleteFamily",
    component: () => import(/* webpackChunkName: "about" */ "../views/DeleteFamily.vue"),
  },
  {
    path: "/data-pamong",
    name: "DataGuardian",
    component: () => import(/* webpackChunkName: "about" */ "../views/Guardian/DataGuardian.vue"),
  },
  {
    path: "/tambah-pamong",
    name: "AddGuardian",
    component: () => import(/* webpackChunkName: "about" */ "../views/Guardian/AddGuardian.vue"),
  },
  {
    path: "/edit-pamong",
    name: "EditGuardian",
    component: () => import(/* webpackChunkName: "about" */ "../views/Guardian/EditGuardian.vue"),
  },
  {
    path: "/delete-pamong",
    name: "DeleteGuardian",
    component: () => import(/* webpackChunkName: "about" */ "../views/Guardian/DeleteGuardian.vue"),
  },
  {
    path: "/pengaturan",
    name: "Pengaturan",
    component: () => import(/* webpackChunkName: "about" */ "../views/Pengaturan.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
