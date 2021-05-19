// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import * as firebase from 'firebase/app';


Vue.config.productionTip = false;




// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAfaTzAMLs1S2KETp3PGf8qlOn48hBrsRk",
    authDomain: "tracker-902e7.firebaseapp.com",
    projectId: "tracker-902e7",
    storageBucket: "tracker-902e7.appspot.com",
    messagingSenderId: "922311718253",
    appId: "1:922311718253:web:1a43f2357e278345985664",
    measurementId: "G-HJ5FFRGHCC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
