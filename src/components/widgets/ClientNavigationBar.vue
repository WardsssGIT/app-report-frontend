<template>
    <ion-header class="sticky-top">
        <ion-toolbar class="nav navbar navbar-expand-lg navbar iq-navbar py-lg-0 ">
            <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title class="p-2">
                <router-link :to="{ name: 'client-layout.home' }">

                    <ion-label class="text-primary  mt-5 h2">
                        <img src="@/resources/logo/bma-logo-1.png" alt="image"
                            class="img-fluid rounded-circle avatar-80 ms-1">
                        {{ pageHeaderTitle }}
                    </ion-label>
                </router-link>
            </ion-title>
            <ion-buttons slot="end">
                <ion-menu-toggle auto-hide="false">
                    <ion-button @click="toggleDropdown">
                        Login
                        Account<!--  <ion-icon :icon="isDropdownOpen ? 'chevron-up' : 'chevron-down'"></ion-icon> -->
                    </ion-button>
                </ion-menu-toggle>
            </ion-buttons>
        </ion-toolbar>
        <ion-toolbar class="dropdown-toolbar" v-show="isDropdownOpen">
            <ion-list>
                <ion-item>
                    <router-link :class="`dropdown-item ${checkActive('app-layout.student-login') ? 'active' : ''}`"
                        :to="{ name: 'client-layout.student-login' }">
                        Student Login
                    </router-link>
                </ion-item>
                <ion-item>
                    <router-link class="dropdown-item"
                        :class="`dropdown-item ${checkActive('app-layout.student-login') ? 'active' : ''}`"
                        :to="{ name: 'client-layout.applicant-login' }">
                        Applicant Login
                    </router-link>
                </ion-item>
            </ion-list>
        </ion-toolbar>
    </ion-header>
    <div class="nav-scroller">
        <nav class="nav nav-underline bg-white pb-0 text-white border border-soft-primary"
            aria-label="Secondary navigation">
            <div class="d-flex" id="head-check">
                <div v-for="(data, index) in headerLists" :key="index">
                    <router-link :to="{ name: data['route'] }"
                        :class="name == data['name'] ? 'nav-link active text-primary fw-bolder' : 'nav-link text-muted'"
                        :id="data['name']" :data-title="data['name']" @click="changename(data['name'])">
                        {{ data['name'] }}
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonNav, IonTitle, IonToolbar } from '@ionic/vue'

/* import { mapActions } from 'vuex' */
export default {
    name: 'ClientNavigationBar',
    components: {
        IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonLabel, IonMenuToggle, IonIcon,
        IonContent,
        IonNav,
        IonItemGroup,
        IonList,
        IonItemDivider,
        IonItem, IonMenuButton, IonMenu
    },
    data() {
        // Update the Headers Name into Array Data
        const headerLists = [
            { name: 'Home', route: 'client-layout.home' },
            { name: 'Achievements', route: 'client-layout.achievements' },
            { name: 'News and Events', route: 'client-layout.newsAndEvents' },
            { name: 'Admission', route: 'client-layout.admission' },
            { name: 'Onboard Training', route: 'client-layout.onboardTraining' },
            { name: 'Discipline & Drills', route: 'client-layout.disciplineAndDrills' },
            { name: 'Research', route: 'client-layout.research' }
        ]
        return {
            name: '',
            headerLists,
            pageHeaderTitle: 'BALIWAG MARITIME ACADEMY, INC.',
            isDropdownOpen: false
        }
    },
    mounted() {
        this.name = this.$route.meta.name
        this.detectDeviceType()
    },
    methods: {
        /*  ...mapActions({
             changenameaction: 'changenameaction'
         }
         ), */
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
        },
        changename(name) {
            console.log(name)
            this.name = name
        },
        detectDeviceType() {
            // Check if the device is mobile
            this.isMobile = window.innerWidth <= 768; // Adjust the threshold as needed

            // Update page title and router link based on device type
            if (this.isMobile) {
                this.pageHeaderTitle = "BMA";
            } else {
                this.pageHeaderTitle = "BALIWAG MARITIME ACADEMY, INC.";
            }

            // Listen for window resize event to update device type
            window.addEventListener('resize', this.updateDeviceType);
        },
        updateDeviceType() {
            // Update device type when window is resized
            this.isMobile = window.innerWidth <= 768; // Adjust the threshold as needed
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        closeDropdown() {
            this.isDropdownOpen = false;
        }
    },
    beforeDestroy() {
        // Remove event listener before component is destroyed
        window.removeEventListener('resize', this.updateDeviceType);
    }
}
</script>

<style scoped>
.dropdown-toolbar {
    position: absolute;
    top: 75px;
    /* Adjust this value as needed */
    right: 0;
    z-index: 1000;
    /* Ensure the dropdown is above other elements */
    background-color: #fff;
    /* Background color of the dropdown */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* Add a subtle shadow effect */
    border-radius: 4px;
    /* Rounded corners */
    width: 200px;
    /* Set the width of the dropdown */
}
</style>