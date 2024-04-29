<template>
  <ion-app>
    <ion-content>
      <router-view></router-view>
    </ion-content>
  </ion-app>
</template>

<script>
import {
  IonApp, IonContent
} from '@ionic/vue';
import { AUTO_LOGIN_ACTION, GET_USER_TOKEN, IS_USER_AUTHENTICATE_GETTER } from '@/store/storeConstants'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    IonApp, IonContent
  },
  created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
    console.log(this.isAuth)

  }, computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN,
      isAuth: IS_USER_AUTHENTICATE_GETTER
    })
  },
}
</script>
<style>
@import "@/theme/scss/gigz.scss";
@import "@/theme/scss/custom.scss";
@import url("./theme/plugins/Leaflet/leaflet.css");
@import url("./theme/plugins/icons/@fortawesome/fontawesome-free/css/all.min.css");
</style>
