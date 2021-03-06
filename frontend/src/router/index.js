import { createRouter, createWebHistory } from 'vue-router';
import { Home, Authorization } from '../views';

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name:  'authorize',
        path: '/authorize',
        component: Authorization
    }
];
const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes });

export default router;
