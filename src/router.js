import { createRouter, createWebHistory } from 'vue-router';

import CoacheDetail from './pages/coaches/CoacheDetail.vue';
import CoacheRegistration from './pages/coaches/CoacheRegistration.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import ContactCoache from './pages/requests/ContactCoache.vue';
import RequestCoache from './pages/requests/RequestCoache.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoacheDetail,
      children: [
        { path: 'contact', component: ContactCoache }, // coaches/c1/contact
      ],
    },
    { path: '/register', component: CoacheRegistration },
    { path: '/requests', component: RequestCoache },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
