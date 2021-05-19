<template>
  <div class="admin-view">
   <section class="left-view">
      <div class="ui segment center aligned">
        <div v-if="user">{{user.email}}</div>
        <div>Admin</div>
        <button class="ui button red" @click="signOutButtonPressed">Signout</button>
      </div>
      <div class="ui segment">
        <div class="ui divided items">
          <div
            class="item"
            v-for="driver in drivers"
            :key="driver.id"
          >
            <div class="content">
              <div class="header">{{driver.email}}</div>
              <div class="meta">
                Lat : {{driver.lat}}
                <br />
                Lng :{{driver.lng}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="right-view" ref="map"></section>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null,
      drivers: [],
      map: null
    };
  },
  async mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
    this.map = new google.maps.Map(this.$refs["map"], {
      zoom: 10,
      center: new google.maps.LatLng(37.33446146, -122.04380955),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
     const markers = [];
    const infoWindows = [];
    const { docs } = await firebase
      .firestore()
      .collection("users")
      .where("active", "==", true)
      .get();
   
    for (let i = 0; i < docs.length; i++) {
      markers.push(
        new google.maps.Marker({
          map: this.map
        })
      );
      infoWindows.push(new google.maps.InfoWindow({ disableAutoPan: true }));
    }
    firebase
      .firestore()
      .collection("users")
      .where("active", "==", true)
      .onSnapshot(snap => {
        this.drivers = [];
        for (let i = 0; i < snap.docs.length; i++) {
          var driver = snap.docs[i].data();
          this.drivers.push(driver);
          markers[i].setPosition(
            new google.maps.LatLng(driver.lat, driver.lng)
          );
          infoWindows[i].setContent(
            `<div class="ui header">${driver.email} </div>`
          );
          infoWindows[i].open(this.map, markers[i]);
        }
      });
  },
  methods: {
    signOutButtonPressed() {
      firebase
        .auth()
        .signOut()
        .then(user => {
          this.$router.push({
            name: "Signin"
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }
};
</script>


<style scoped>
.admin-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.left-view {
  width: 250px;
  padding: 12px;
}

.right-view {
  flex-grow: 1;
}
</style>