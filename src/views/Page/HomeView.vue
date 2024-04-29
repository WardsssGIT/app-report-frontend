<template>
    <div>
        <div class="position-relative">
            <img src="@/resources/banner/homepage-banner.png" class="img-fluid" alt="#" width="100%">
            <div class="position-absolute top-0 start-0 w-100 h-100 bg-soft-primary"></div>
            <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
                <h1 class="mb-1 fw-bold text-white display-5">
                    "CHARTING SUCCESS, TRANSFORMING DREAMS INTO REALITIES"
                </h1>
                <p class="text-lg mt-2 text-white">Reach your maritime dream right now. 🚢</p>
                <a href="/#/admission"
                    class="text-white bg-primary p-2 w-35 border border-primary rounded-start rounded-end">Inquire Now!
                    <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round"></circle>
                        <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg></a>
            </div>
        </div>
        <div class="editors container pt-5 pb-5 ">
            <ion-card class="border border-white">
                <ion-card-content>
                    <div class="text-center">
                        <h4 class="fw-bolder fs-1 text-primary mb-2 mt-1">WELCOME TO THE BALIWAG MARITIME
                            ACADEMY</h4>
                        <h6 class="fw-bolder text-primary mb-2">WHERE YOUR DREAMS BECOME A REALITY OF SUCCESS
                        </h6>
                    </div>
                    <p class="m-3 text-black">At Baliwag Maritime Academy, we are dedicated to nurturing the
                        next
                        generation of maritime professionals through comprehensive education and practical
                        training.
                        Our goal is to equip our students with the skills, knowledge, and competence
                        required for a
                        successful career at sea. We are more than just a school; we are a community of
                        professionals with a shared vision: to chart success and transform dreams into
                        realities.
                        Whether you aspire to be a marine Deck or Enginner Office, or a seafarer, we have
                        the right
                        program for you. Our course are accredited by CHED and MARINA, and our curriculum is
                        aligned
                        with the latest industry standards and best practices. Additionally, we provide
                        scholarship
                        opportunities for deserving students. Join us today and discover how we can help you
                        achieve
                        your goals and reach your full potential in the maritime industry. Baliwag Maritime
                        Academy:
                        Charting Success, Transforming Dreams into Realities
                    </p>
                </ion-card-content>
            </ion-card>
            <div class="row mt-5">
                <div class="col-md-6 col-xs-12 mb-3">
                    <ion-card class="border border-white">
                        <ion-card-content>
                            <div class="text-center">
                                <h4 class="fw-bolder fs-1 text-center text-primary">MISSION</h4>
                            </div>
                            <p class="m-3 text-black">The Baliwag Maritime Academy shall offer its
                                students a
                                competency based Maritime
                                Education &
                                Training
                                Program
                                to
                                produce competent marine officers with an adequate knowledge, attitudes,
                                &
                                leadership skills necessary in
                                pursuing
                                their respective professional maritime career which complies to national
                                and
                                international standards.
                            </p>
                        </ion-card-content>
                    </ion-card>
                </div>
                <div class="col-md-6 col-xs-12 mb-3">
                    <ion-card class="border border-white">
                        <ion-card-content>
                            <h4 class="fw-bolder fs-1 text-center text-primary">VISION</h4>
                            <p class="m-3 text-black justify-content-between"> The Baliwag Maritime
                                Academy
                                as
                                one of the leading
                                Maritime Higher Educational
                                Institution
                                visualizes itself
                                as
                                a producer of highly competent marine officers who will excel in the
                                practice of
                                the seafaring profession in
                                both domestic and international shipping, and as competent maritime
                                educators.
                            </p>
                        </ion-card-content>
                    </ion-card>
                </div>
            </div>
            <hr>
            <ion-card class="border border-white">
                <ion-card-content>
                    <h4 class="fw-bolder fs-1 text-primary mb-2 mt-1 text-center">CORE VALUES</h4>
                    <div class="row mt-3">
                        <div class="col-sm-12 col-md mt-3">
                            <span class="h4 text-info fw-bolder text-center">KNOWLEDGE</span>
                            <p class="text-black">
                                Knowledge refers to the acquisitio of information and practical skills that are
                                necessary for a successful career in the maritime industry.
                            </p>
                        </div>
                        <div class="col-sm-12 col-md mt-3">
                            <span class="h4 text-danger fw-bolder text-center">DISCIPLINE</span>
                            <p class="text-black">
                                Discipline refers to the ability to follow rules and regulations, as well as to
                                maintain a high level of professionalism earned through regimented training.
                            </p>
                        </div>
                        <div class="col-sm-12 col-md mt-3">
                            <span class="h4 text-warning fw-bolder text-center">EXCELLENCE</span>
                            <p class="text-black">
                                Excellence refers to the pursuit of the highest standards of performance in all
                                aspects of shipboard work. Commitment to lifelong learning, service to community
                                and care of environment.
                            </p>
                        </div>
                    </div>
                    <p class="mt-5 text-black text-center">These values are important for student to learn and embody in
                        order to succeed in
                        their
                        future careers at sea.</p>
                </ion-card-content>
            </ion-card>
            <hr>
            <section class="our-programs text-center">
                <ion-label class="display-6 fw-bold text-primary">
                    OUR PROGRAMS
                </ion-label> <br>
                <ion-label class="fw-lighter">
                    Explore our range of specialize programs tailored to meet the diverse
                    needs of aspiring
                    maritime professionals:
                </ion-label>
                <section class="mt-3 row">
                    <div class="col-xs-12 col-md-4 mb-5" v-for="(item, key) in courseDetails" :key="key">
                        <ion-card class="bg-white iq-service-card">
                            <div class="iq-image position-relative mb-4">
                                <div class="img">
                                    <img :src="item.courseImage" alt="image" class="img-fluid height1  w-100">
                                </div>
                                <div class="app badge-1 btn btn-sm btn-primary">
                                    {{ item.courseBadgeDepartment }}
                                </div>
                                <div v-if="item.courseBadgeCourse !== null"
                                    class="app badge-3 ms-3 btn btn-sm text-white btn-info">
                                    {{ item.courseBadgeCourse }}
                                </div>
                            </div>
                            <ion-card-content class="mt-2">
                                <ion-label class="fw-bolder h5">
                                    {{ item.courseName }}
                                </ion-label>
                                <div class="flex-wrap mt-3">
                                    <span class="text-dark ms-2">
                                        {{ item.courseDescription }}
                                    </span>
                                    <a class="text-primary-emphasis">Read More.</a>
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </div>
                </section>
                <ion-label class="text-center fw-normal">
                    Our curriculum is thoughtfully crafted to blend theoretical learning with hands-on experience,
                    ensuring that our graduates are well-prepared to excel in the dynamic maritime sector.
                </ion-label>
            </section>
            <div class="other-section" v-for="(item, key) in otherSection" :key="key">
                <section class="state-of-the-art-facilities text-center">
                    <ion-label class="display-6 fw-bold text-primary">
                        {{ item.sectionName }}
                    </ion-label> <br>
                    <ion-label class="fw-lighter">
                        {{ item.sectionDetails }}
                    </ion-label>
                </section>
                <hr>
            </div>
            <section class="state-of-the-art-facilities text-center">
                <ion-label class="display-6 fw-bold text-primary">
                    WHY CHOOSE BALIWAG MARITIME ACADEMY?
                </ion-label> <br>
                <div class="fw-lighter justify-content-center mt-4">
                    <ul class="list-unstyled custom-bullets">
                        <li>Accredited programs ensuring quality education</li>
                        <li>Strong industry partnerships and networking opportunities</li>
                        <li>Holistic approach to student development</li>
                        <li>Commitment to safety, innovation, and sustainability in maritime practices
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>
<style>
.removepadding {
    margin: 0%;
    padding: 0%;
}

* {
    margin: 0%;
    padding: 0%;
}

.custom-bullets {
    padding-left: 20px;
    text-align: left;
    color: black;
}

.custom-bullets li {
    position: relative;
    margin-bottom: 10px;
}

.custom-bullets li:before {
    content: "\2022";
    position: absolute;
    left: -20px;
}
</style>
<script>
import { IonCard, IonCardContent, IonLabel } from '@ionic/vue'
import axios from 'axios'
export default {
    name: 'HomePage',
    components: {
        IonCard, IonCardContent, IonLabel
    },
    data() {
        const courseDetails = [
            {
                courseName: 'Senior High School: Pre-Baccalaureate Maritime Specialization',
                courseBadgeDepartment: 'SENIOR HIGH SCHOOL',
                courseBadgeCourse: null,
                courseImage: '/src/resources/banner/SHS.png',
                courseDescription: `Senior High School - covers the
                mandatory education for the last two years of the K to 12
                Program and includes Grade 11 and 12 required by the Department
                of Education and Marina.`
            },
            {
                courseName: 'Bachelor of Science in Marine Engineering',
                courseBadgeDepartment: 'COLLEGE',
                courseBadgeCourse: 'BSMARE',
                courseImage: '/src/resources/banner/BSMARE.png',
                courseDescription: `BS Marine Engineering - is a maritime
                education program that covers the mandatory education and
                training for Officers in Charge of an Engineering Watch required
                under Regulation III/I of the STCW Convention, 1978,`
            },
            {
                courseName: 'Bachelor of Science in Marine Transportation',
                courseBadgeDepartment: 'COLLEGE',
                courseBadgeCourse: 'BSMT',
                courseImage: '/src/resources/banner/BSMT.png',
                courseDescription: `BS Marine Transportation - is a
                maritime education program that covers the mandatory education
                and training for a Navigational Watch required under Regulation
                II/I of the STCW Convention, 1978,`
            }
        ]
        const otherSection = [
            {
                sectionName: "STATE OF THE ART FACILITIES",
                sectionDetails: "We provide access to modern facilities and cutting-edge resources that facilitate effective learning and practical training. Our campus offer advanced simulation laboratories. full-equipped workshops, and comprehensive libraries to support our students' academic endeavors."
            },
            {
                sectionName: "EXPERIENCED FACULTY",
                sectionDetails: "Our faculty comprises experienced industry professionals and dedicated educators committed to delivering high-quality education. They mentor and guide students, forstering an environment of academic excellence and professional growth."
            },
            {
                sectionName: "CAREER OPPORTUNITIES",
                sectionDetails: "Upon graduation, our students are well-positioned to embark on rewarding careers in the maritime industry. We provide career guidance and support, connecting our graduates with promising employment opportunities worldwide."
            },
            {
                sectionName: "GET IN TOUCH",
                sectionDetails: "Ready to begin your journey toward a fulfilling maritime career? Contact us to learn more about our programs, admission process, and campus life. We look forward to welcoming you to the Baliwag Maritime Academy family!"
            },
            {
                sectionName: "STATE OF THE ART FACILITIES",
                sectionDetails: "We provide access to modern facilities and cutting-edge resources that facilitate effective learning and practical training. Our campus offer advanced simulation laboratories. full-equipped workshops, and comprehensive libraries to support our students' academic endeavors."
            },

        ]
        return {
            courseDetails,
            otherSection
        }
    },
    mounted() {
        axios.get('checker').then((response) => {
            console.log(response.data.bot)
        }).catch((error) => {
            console.log(error)
        })
    }
}

</script>