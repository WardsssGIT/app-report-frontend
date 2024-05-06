<template>
    <div class="mt-5">
        <ion-accordion-group>
            <ion-accordion v-for="(data, index) in items" :key="index" :value="key">
                <ion-item slot="header">
                    <ion-label>{{ data.name }}</ion-label>
                </ion-item>
                <ion-item v-for="(data1, index1) in data.child" :key="index1" class="ms-5 p-2" slot="content">
                    <router-link :to="{ name: data1.url }">
                        <ion-label>{{ data1.name }}</ion-label>
                    </router-link>
                </ion-item>
            </ion-accordion>
        </ion-accordion-group>
    </div>
</template>

<script>
import {
    IonAccordion,
    IonAccordionGroup, IonList, IonItem, IonIcon, IonLabel, IonItemDivider, IonItemGroup
} from '@ionic/vue';
import { chevronDownOutline, ellipse } from 'ionicons/icons';
export default {
    name: 'StaffSideNavigationBar',
    components: {
        IonAccordion,
        IonAccordionGroup,
        IonList, IonItem, IonIcon, IonLabel,
        IonItemDivider,
        IonItemGroup,
    },
    data() {
        const dashboard = [
            { name: 'Announcement', url: 'staff-layout.dashboard' }
        ]
        const report = [
            { name: 'Report List', url: 'staff-layout.report-list' },
        ]

        const items = [
            { name: 'Dashboard', child: dashboard, icon: 'M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z' },
            { name: 'Report', child: report, icon: 'M7.81 2H16.191C19.28 2 21 3.78 21 6.83V17.16C21 20.26 19.28 22 16.191 22H7.81C4.77 22 3 20.26 3 17.16V6.83C3 3.78 4.77 2 7.81 2ZM8.08 6.66V6.65H11.069C11.5 6.65 11.85 7 11.85 7.429C11.85 7.87 11.5 8.22 11.069 8.22H8.08C7.649 8.22 7.3 7.87 7.3 7.44C7.3 7.01 7.649 6.66 8.08 6.66ZM8.08 12.74H15.92C16.35 12.74 16.7 12.39 16.7 11.96C16.7 11.53 16.35 11.179 15.92 11.179H8.08C7.649 11.179 7.3 11.53 7.3 11.96C7.3 12.39 7.649 12.74 8.08 12.74ZM8.08 17.31H15.92C16.319 17.27 16.62 16.929 16.62 16.53C16.62 16.12 16.319 15.78 15.92 15.74H8.08C7.78 15.71 7.49 15.85 7.33 16.11C7.17 16.36 7.17 16.69 7.33 16.95C7.49 17.2 7.78 17.35 8.08 17.31Z' },

        ]
        return {
            ellipse,
            chevronDownOutline,
            items
        }
    },
    methods: {
        checkActive(route) {
            if (this.$route.name === route) {
                return true
            }
            if (route.includes(this.$route.name)) {
                return true
            }
        }
    }
}
</script>