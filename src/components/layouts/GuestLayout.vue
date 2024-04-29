<template>
  <ion-page>
    <ion-content class="main-content">
      <ClientNavigation></ClientNavigation>
      <div class="fuild-container">
        <router-view></router-view>
      </div>
      <GuestFooter></GuestFooter>
    </ion-content>

  </ion-page>
</template>

<script>
import {
  IonPage, IonLabel,
  IonContent
} from '@ionic/vue';
import ClientNavigation from '../widgets/ClientNavigationBar.vue'
import GuestFooter from '../widgets/Fotters/GuestFooter.vue';
export default {
  name: 'StudentLoginPage',
  components: {
    IonPage, IonLabel, IonContent, ClientNavigation, GuestFooter
  },

}

</script>