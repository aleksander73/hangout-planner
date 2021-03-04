import { createRouter, createWebHistory } from 'vue-router';
import { Home, Authorization } from '../views';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/authorize',
        component: Authorization
    }
];
const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes });

export default router;
