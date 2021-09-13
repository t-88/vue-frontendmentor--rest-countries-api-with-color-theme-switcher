import { createRouter , createWebHistory } from "vue-router"
import Home from "@/components/views/home/Home"
import Country from "@/components/views/country/Country"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        props: true,
    },
    {
        path: "/country",
        name: "country",
        component: Country,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
