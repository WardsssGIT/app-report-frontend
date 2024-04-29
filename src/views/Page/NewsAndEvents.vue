<template>
    <image-title-header titleHeader="NEW AND EVENTS" banner="/src/resources/banner/banner-3.jpg"
        topValue="80%" />
    <div class="content-post container-fluid mt-5">

        <div class="card " v-for="(item, index) in dataList" :key="index">
            <div class="card-body row">
                <div class="col-lg-6 col-md-12">
                    <label for="" class="text-primary fw-bolder display-6">
                        {{ item.titleName }}
                    </label>
                    <span class="badge bg-primary">{{ item.author }}</span>
                    <p>
                        {{ item.description }}
                    </p>
                </div>
                <div class="col-lg-6 col-md-12">
                    <div v-html="item.frameUrl"></div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import ImageTitleHeader from '../../components/ImageTitleHeader.vue';
export default {
    name: 'NewsAndEvents',
    components: {
        ImageTitleHeader
    },
    data() {
        const dataList = [{
            titleName: 'THE BALIWAG MARITIME ACADEMY SAYS “NO” TO MAGNA CARTA FOR FILIPINO SEAFARERS CHAPTER 18',
            author: 'MIDN 3C CRUZ JOHN RAINIEL',
            frameUrl: `<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fdolphinpubsbma%2Fposts%2F122131589516139401&show_text=true&width=500" width="500" height="715" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write;
             encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: ` In a powerful display of solidarity, The BMA Administration, Faculty, Staff and the Corps of Midshipmen of the Academy gathered at BMA Grounds today, March 11 2024, to show their unwavering support to the movement of Philippine Association of Maritime Institution (PAMI).
Alongside the morning parade of the BMA Corps of Midshipmen was the parade of the BMA Administration, Faculty and Staff to show our commitment and this would serve as a silent protest against this provision of the bill that would eventually become a death sentence to the future of the new generation of seafarers.
This movement of the institution highly supports the opposition against the Magna Carta for Filipino Seafarers specifically Chapter 18 as it poses threats to our Maritime Education Sector.
In line with this, We shall continually wear a BLACK POLO or TSHIRT to signify and present our stand against this threat that would jeopardize the future of the maritime industry in terms of supply of manpower.
Photo Credits:
MIDN 2C Lagunero Rodgen
MIDN 3C Moya Francis Andrei.`
        }, {
            titleName: '3RD DAY CELEBRATION OF 30TH FOUNDATION OF THE BALIWAG MARITIME ACADEMY',
            author: 'NEWS DEPARTMENT ',
            frameUrl: `<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fdolphinpubsbma%2Fposts%2F122120339480139401&show_text=true&width=500" width="500" height="696" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay;
             clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: `As part of the celebration, Baliwag Maritime Academy organized a series of fun games for the  faculty, staff, and midshipmen at the BMA grounds on January 17, 2024 at exactly 1400H.
At the start of the event, opening remarks were delivered by Ma’am Ma. Conception C. Ong, the Quality Management Representative, who emphasized the importance of celebrating and having fun despite the pressure and stress of both the midshipmen and the faculty members in preparation of course materials. The event kicked off with an array of entertaining games hosted by Sir Ariel Fernando.
The games started with a breathtaking tug of war in which the winners were the first class midshipmen.
The second game was charades in which the faculty and staff together with the 3rd class midshipmen were considered as winners.
The third game was the newspaper race wherein this game is won by the 4th class midshipmen
Followed by a vocabulary game were the faculty and staff won this round of the game. “Agawang Pingpong” was played after in winners will be determine on who will be the first one to get the pingpong ball and the one that does not have a ball will automatically eliminated. The winners of the game were the group of 2nd class midshipmen. Finally, the water balloon catch game concluded this event in which winners were the employees and are rewarded with custom prizes, underscoring the essence of enjoyment and camaraderie.
In conclusion, the School Director, Captain Maximo M. Pestaño, delivered the closing remarks, expressing his gratitude to everyone's participation. He reminded them that despite ongoing challenges we are encountering, the key is to remain happy - "Happy lang ang kailangan." Overall, the event was a delightful celebration uniting the BMA community.
PHOTO CREDITS:
2/C LAGUNERO, RODGEN
3/C MOYA, FRANCIS ANDREI
3/C SIA, NASSER NICOLAS III`
        }]
        return {
            dataList
        }
    }
}
</script>
