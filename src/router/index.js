import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/Login.vue";
import Template from "@/views/Template/Template.vue";
import Dashboard from "@/views/Dashboard.vue";
import TokenService from "@/utils/token-service";
import Pacientes from "@/views/Pacientes/Pacientes.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Template',
            component: Template,
            redirect: '/dashboard',
            children: [
                {
                    path: '/pacientes',
                    name: 'Pacientes',
                    component: Pacientes
                },
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },
            ]
        },


    ]
})

router.beforeEach((to, from, next) => {
    if('noAuth' in to.meta && to.meta.noAuth) {
        next()
        return
    }

    if (to.name !== 'Login' && !TokenService.hasToken()) {
        next({name: 'Login'})
        return
    }

    next()
})
export default router
