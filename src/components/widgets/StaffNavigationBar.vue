<template>
    <ion-header>
        <ion-toolbar class="iq-navbar py-lg-0">
            <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-buttons slot="start">
                <ion-button routerLink="/staff-layout/dashboard">
                    <ion-title>
                        <span class="font-weight-bold text-primary">{{ pageTitle }}</span>
                    </ion-title>
                </ion-button>
            </ion-buttons>

            <ion-buttons slot="end">
                <ion-button @click="logOut">
                    Logout
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>

<script>
import { IonHeader, IonToolbar, IonButton, IonButtons, IonMenu, IonMenuButton, IonIcon, IonTitle, IonBreadcrumb, IonLabel } from '@ionic/vue';
import { grid, menu } from 'ionicons/icons';
import { LOGOUT_ACTION } from '@/store/storeConstants.js'
import { mapActions } from 'vuex';
export default {
    name: 'StaffNavigationBar',
    data() {
        return {
            grid,
            menu
        }
    },
    components: {
        IonHeader, IonToolbar, IonButton, IonIcon, IonButtons, IonMenu, IonMenuButton, IonTitle, IonBreadcrumb, IonLabel
    },
    props: {
        fullsidebar: { type: Boolean, default: false },
        pageTitle: { type: String }
    },
    /*  computed: {
         ...mapGetters('auth', {
             token: GET_USER_TOKEN,
             profilePicture: GET_USER_IMAGE,
             name: GET_USER_NAME
         })
     }, */
    methods: {
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),
        logOut() {
            this.logout()
            this.$router.replace('/')
        },
        opensidebar() {
            this.$emit('makefullsidebar', !this.fullsidebar)
        },
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
        }
    }
}
</script>