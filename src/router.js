import { createWebHistory, createRouter } from "vue-router";
import App from "@/App";
import Home from "./components/Home.vue";
import Game from "./components/Game.vue";
import Result from "./components/Result.vue";
import Stats from "./components/Stats.vue";

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/Game",
        component: Game
    },
    {
        path:"/Game/result/:victoire" ,
        name : 'result',
        component: Result,
        props: true
    },
    {
        path: "/stats",
        component: Stats
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
