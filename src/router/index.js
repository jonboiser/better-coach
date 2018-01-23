import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
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
      path: '/coachreport',
      name: 'CoachReport',
      component: HelloWorld,
    },
  ],
});
