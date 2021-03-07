import { createRouter, createWebHistory } from 'vue-router';
import { Home, Authorization } from '../views';

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name:  'login',
        path: '/login',
        component: Authorization
    },
    {
        name:  'register',
        path: '/register',
        component: Authorization
    }
];
const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes });

export default router;
