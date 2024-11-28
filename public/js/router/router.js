import { createRouter, createWebHashHistory } from 'router';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;