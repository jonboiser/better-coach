import Vue from 'vue';
import Router from 'vue-router';
import Coach from '@/components/Coach';
import Quiz from '@/components/Quiz';
import Login from '@/components/Login';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/quiz/:username',
      name: 'Quiz',
      component: Quiz,
    },
    {
      path: '/coach',
      name: 'Coach',
      component: Coach,
    },
  ],
});
