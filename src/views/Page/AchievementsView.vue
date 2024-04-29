<template>
    <image-title-header titleHeader="ACHIEVEMENTS" :banner="'/src/resources/banner/banner-2.jpg'" topValue="40%" />
    <div class="content-post container-fluid mt-5">
        <ion-card class="mt-5" v-for="(item, index) in dataList" :key="index">
            <ion-card-content class="row">
                <div class="col-lg-6 col-md-12 ">
                    <ion-label class="text-primary fw-bolder display-6">
                        {{ item.titleName }}
                    </ion-label><br>
                    <span class="badge bg-primary">{{ item.author }}</span> <br>
                    <ion-label class="mt-4">
                        {{ item.description }}
                    </ion-label>
                </div>
                <div class="col-lg-6 col-md-12">
                    <div v-html="item.frameUrl" class="w-100"></div>
                </div>
            </ion-card-content>
        </ion-card>
    </div>
</template>
<script>
import ImageTitleHeader from '../../components/ImageTitleHeader.vue';
import { IonCard, IonCardContent, IonLabel, IonText } from '@ionic/vue'
export default {
    name: 'Achievements',
    components: {
        ImageTitleHeader,
        IonCard, IonCardContent, IonLabel, IonText
    },
    data() {
        const dataList = [{
            titleName: '2022 OIC PASSERS OF BALIWAG MARITIME ACADEMY',
            author: 'Coverage Period: January 1, 2022 - December 31, 2022',
            frameUrl: `<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fdolphinpubsbma%2Fposts%2F122119676414139401&show_text=true&width=500" width="500" height="696" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: ` Venue of Examination: MARINA Central Office, MARINA Regional Offive VI (Iloilo), MARINA Regional Office VII (Cebu), & MARINA Regional Office XI (Davao)
According to the Research and Statistics Office of BMA (2023), this is the data of the OIC passers from January1, 2022 to December 31, 2022.
This data shows the Deck Management Level first timers was 29, resit takers was 12, and the overall performance was 97%, the Deck Operational Level first timers was 26, resit takers was 9, and the overall performance was 100%, the Engine Management Level first timers was 20, resit takers was 9 and the overall performance was 100%, the Engine Operational Level first timers was 52, resit takers was 19 and the overall performance was 96%.`
        }, {
            titleName: 'THE FIRST TIMER',
            author: '2/C Harvie Evangelista',
            frameUrl: `<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fdolphinpubsbma%2Fposts%2F122119655042139401&show_text=true&width=500" width="500" height="696" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true"
             allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: `Being a first timer in BULPRISA meet the senior High Grade 12 student, MATT JYEM P. VALONDO, He competed in the swimming event in the category of 50 meters freestyle and 50 meters backstroke.
The event was held at the swimming center of Montessori De Sagrada Familia (MDSF) last November 29, 2023. Surprisingly, He Placed top 3 in each category as a first timer in a Swimming Competition. As he got the Silver and Bronze medal in 50 meters freestyle and 50 meters backstroke.
For him, it is a huge milestone because it’s the first time he competed in BULPRISA in the Swimming Category. “After the first category of 50 meters backstroke my confidence skyrocketed because I got the bronze medal, that’s why my confidence was enhanced in the second category of 50 meters freestyle and got the silver medal”. Valondo said.
This proves that dedication and courage helped him in achieving his dreams because it is difficult to simultaneously.
Coach: Ms. Fai Jimenez
PHOTO CREDITS: Ruiz Miguel Valondo`
        }]
        return {
            dataList
        }
    }
}
</script>