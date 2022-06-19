import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/Dashboard.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import store from '../store';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';

const routes = [
    {
        path: '/',
        name: 'default',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: {requiresAuth: true} 
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardLayout,
        meta: {requiresAuth: true} 
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        component: SignIn,
        meta: {isGuest: true} 
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp,
        meta: {isGuest: true} 
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    let user = store.getters.user;

    if(to.meta.requiresAuth && !user.id){
        next({name: 'SignIn'})
    }else if(store.state.user.token && to.meta.isGuest ){
        next({name: 'Dashboard'})
    }else{
        next()
    }


})

export default router