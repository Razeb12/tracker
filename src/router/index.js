import Vue from 'vue';
import Router from 'vue-router';
// const functions = require('firebase-functions');
// const admin = require('firebase-admin')
import firebase from 'firebase';

import Driver from '@/views/Driver';
import Signin from '@/views/Signin';
import SignUp from '@/views/SignUp';
import Admin from '@/views/Admin';

Vue.use(Router);

let router = new Router({
  routes: [{
      path: '/',
      name: 'Driver',
      component: Driver,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta: {
        guest: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {
        guest: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {

  firebase.auth().onAuthStateChanged(userAuth => {
    if (!userAuth && to.matched.some(record => record.meta.requiresAuth)) {
      next({
        name: 'Signin'
      });
    } else if (userAuth) {
      if (to.matched.some(record => record.meta.guest)) {
        next(from.fullPath);
      } else {
        firebase.firestore().collection("roles").doc(userAuth.uid).get().then(snapShot => {
          if (snapShot.data().isAdmin) {
            next({
              name: 'Admin'
            });
          } else {
            next({
              name: 'Driver'
            });
          }
        });
      }

    } else {
      next();
    }
  });

  next();

});


export default router;
