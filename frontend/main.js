import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './app/components/Home.vue';
import Login from './app/components/Login.vue';
import Register from './app/components/Register.vue';
import Profile from './app/components/Profile.vue';
import System from './app/components/System.vue';
import Workbench from './app/components/Workbench.vue';
import NotFound from './app/components/404.vue';


Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile
    }, {
      path: '/system/new',
      name: 'workbench',
      component: Workbench
    }, {
      path: '/system/:uuid',
      name: 'view',
      component: System,
      props: true
    }, {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

const app = new Vue({
  el: '#root',
  render: h => h(App),
  router
});
