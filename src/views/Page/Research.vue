<template>
    <image-title-header titleHeader="RESEARCH" banner="/src/resources/banner/banner-3.jpg" topValue="80%" />
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
    name: 'NewsAndEvents',
    components: {
        ImageTitleHeader,
        IonCard, IonCardContent, IonLabel, IonText
    },
    data() {
        const dataList = [{
            titleName: 'Philippines wins IMO Council re-election',
            author: '2C GADOT, REYNIEL D.',
            frameUrl: `<iframe class="w-100"
                        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fdolphinpubsbma%2Fposts%2F122131723214139401&show_text=true"
                        height="696" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: ` The Philippines has been re-elected to the International Maritime Organization (IMO) Council
                        during the recent 33rd IMO Assembly in London.
                        In 2024–2025, the Philippines was one of the 20 nations elected to the Council under Category C.
                        With the fourth most votes, the country came in seventh place. The Department of Transportation
                        (DOTr) stated in a statement that the achievement is especially notable because it is the most
                        number of votes the Philippines has earned since entering the IMO Council in 1989.
                        168 of the 171 IMO member nations that were eligible to vote took part in the Assembly. There
                        was broad support for the Philippines' continuing membership in the Council, as seen by the 136
                        votes cast in favour of the nation.
                        Transportation Secretary Jaime Bautista campaigning for the Philippines' re-election to the
                        International Maritime Organization Council in London. Photo from the Department of
                        Transportation.
                        At the IMO assembly, Transport Secretary Jaime Bautista led the Philippine delegation and
                        thanked the private sector representatives as well as representatives from the Transport
                        Department, Foreign Affairs Department, Philippine embassy in the United Kingdom, MARINA, the
                        Philippine Coast Guard, and the Philippine Ports Authority.
                        Secretary Jaime Bautista (2023) underlined the nation's dedication to supporting the
                        international marine sector. "We feel that being re-elected will enable us to carry on
                        supporting safe and secure shipping operations that are focused on expansion, modernization,
                        resiliency, and sustainability, in addition to being a leading supplier of top-caliber
                        seafarers," he stated.
                        The eleven states chosen for Category A are acknowledged for having a significant role in
                        offering services related to international shipping. These include the Republic of Korea, the
                        United Kingdom, China, Greece, Italy, Japan, Liberia, Norway, Panama, and the United States.
                        Ten states—Australia, Brazil, Canada, France, Germany, India, the Kingdom of the Netherlands,
                        Spain, Sweden, and the United Arab Emirates—that have a strong interest in international
                        seaborne commerce are included in Category B.
                        Twenty states that were not included in the previous two categories are featured in Category C.
                        These countries were chosen to guarantee a varied geographic representation around the globe
                        since they were acknowledged for their unique interests in marine transportation or navigation.
                        Bangladesh, Belize, Cyprus, Denmark, Egypt, Finland, Indonesia, Jamaica, Kenya, Malaysia, Malta,
                        Mexico, Morocco, Peru, the Philippines, Qatar, Saudi Arabia, Singapore, and Turkey are a few of
                        them.`
        }, {
            titleName: 'CHARTING A GREENER FUTURE: NEW MARPOL REGULATIONS 2023 PLACE TO TRANSFORM ENVIRONMENTAL CONSERVATION',
            author: '2/C SANTILLAN, ADRIENNE JAMES',
            frameUrl: `<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fdolphinpubsbma%2Fposts%2F122131711232139401&show_text=true&width=500" width="500" height="735" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media;
            picture-in-picture; web-share"></iframe>`,
            description: ` The Philippines has been re-elected to the International Maritime Organization (IMO) Council
                        during the recent 33rd IMO Assembly in London.
                        In 2024–2025, the Philippines was one of the 20 nations elected to the Council under Category C.
                        With the fourth most votes, the country came in seventh place. The Department of Transportation
                        (DOTr) stated in a statement that the achievement is especially notable because it is the most
                        number of votes the Philippines has earned since entering the IMO Council in 1989.
                        168 of the 171 IMO member nations that were eligible to vote took part in the Assembly. There
                        was broad support for the Philippines' continuing membership in the Council, as seen by the 136
                        votes cast in favour of the nation.
                        Transportation Secretary Jaime Bautista campaigning for the Philippines' re-election to the
                        International Maritime Organization Council in London. Photo from the Department of
                        Transportation.
                        At the IMO assembly, Transport Secretary Jaime Bautista led the Philippine delegation and
                        thanked the private sector representatives as well as representatives from the Transport
                        Department, Foreign Affairs Department, Philippine embassy in the United Kingdom, MARINA, the
                        Philippine Coast Guard, and the Philippine Ports Authority.
                        Secretary Jaime Bautista (2023) underlined the nation's dedication to supporting the
                        international marine sector. "We feel that being re-elected will enable us to carry on
                        supporting safe and secure shipping operations that are focused on expansion, modernization,
                        resiliency, and sustainability, in addition to being a leading supplier of top-caliber
                        seafarers," he stated.
                        The eleven states chosen for Category A are acknowledged for having a significant role in
                        offering services related to international shipping. These include the Republic of Korea, the
                        United Kingdom, China, Greece, Italy, Japan, Liberia, Norway, Panama, and the United States.
                        Ten states—Australia, Brazil, Canada, France, Germany, India, the Kingdom of the Netherlands,
                        Spain, Sweden, and the United Arab Emirates—that have a strong interest in international
                        seaborne commerce are included in Category B.
                        Twenty states that were not included in the previous two categories are featured in Category C.
                        These countries were chosen to guarantee a varied geographic representation around the globe
                        since they were acknowledged for their unique interests in marine transportation or navigation.
                        Bangladesh, Belize, Cyprus, Denmark, Egypt, Finland, Indonesia, Jamaica, Kenya, Malaysia, Malta,
                        Mexico, Morocco, Peru, the Philippines, Qatar, Saudi Arabia, Singapore, and Turkey are a few of
                        them.`
        }]
        return {
            dataList
        }
    }
}
</script>
