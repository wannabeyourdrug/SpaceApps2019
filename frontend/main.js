import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './app/components/Home.vue';
import Login from './app/components/Login.vue';
import Register from './app/components/Register.vue';
import Profile from './app/components/Profile.vue';
// import NewSystem from './app/components/NewSystem.vue';
import NotFound from './app/components/404.vue';


Vue.use(VueRouter);


const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  // {
  //   path: '/systems',
  //   name: 'system',
  //   component: Profile,
  //   children: [{
  //       path: '/new',
  //       name: 'new',
  //       // component: NewSystem
  //     },
  //     {
  //       path: '/:id'
  //     }
  //   ]
  // },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router
}).$mount('#root');

// new Vue({
//   el: '#app',
//   data: {
//     currentRoute: window.location.pathname
//   },
//   computed: {
//     ViewComponent() {
//       return routes[this.currentRoute] || NotFound;
//     }
//   },
//   render(h) {
//     return h(this.ViewComponent);
//   }
// });