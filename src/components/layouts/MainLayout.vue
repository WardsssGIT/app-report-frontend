<template>
    <ion-split-pane when="(min-width: 500px)" content-id="main-content">
        <StudentSideNavigationBar :minisidebar="sidebarmini" @makeminisidebar="onsidebarmini" style="width: fit-content;">
        </StudentSideNavigationBar>
        <ion-page id="main-content">
            <ion-header>
                <StudentNavigationBar :fullsidebar="sidebarmini" @makefullsidebar="onfullsidebar"
                    :pageTitle="headerTitle">
                </StudentNavigationBar>
            </ion-header>
            <ion-content class="ion-padding">
                <router-view></router-view>
            </ion-content>
        </ion-page>
    </ion-split-pane>
</template>
<script>
import StudentNavigationBar from '../widgets/StudentNavigationBar.vue';
import StudentSideNavigationBar from '../widgets/StudentSideNavigation/StudentSideNavigationBar.vue';

import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon, IonSplitPane } from '@ionic/vue';
import { close, grid } from 'ionicons/icons';
export default {
    name: 'MainLayout',
    components: {
        StudentNavigationBar,
        StudentSideNavigationBar,
        IonButtons,
        IonContent,
        IonHeader,
        IonMenu,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonIcon,
        IonSplitPane
    },
    data() {
        return {
            close,
            grid,
            sidebarmini: false,
            user: null,
            menuOpen: true,
            menuSide: 'start', // 'start' or 'end', depending on where you want the menu to appear
            menuContentId: 'main-content',
            menuSwipeGesture: true,


        }
    },
    computed: {
        /*  ...mapState({
             showLoading: state => state.showLoading
         }), */
        headerTitle() {
            return this.$route.meta.name
        }
    },
    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        onsidebarmini(e) {
            this.sidebarmini = e
        },
        onfullsidebar(e) {
            this.sidebarmini = e
        }
    }
}
</script>