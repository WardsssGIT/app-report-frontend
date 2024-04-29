<template>
    <ImageTitleHeader titleHeader="SCHOOL ADMISSION" banner="/src/resources/banner/banner-1.jpg" topValue="80%" />
    <div class="container">
        <div class="alert alert-left alert-success alert-dismissible fade show mt-5" role="alert">
            <span class="fw-bolder">REMINDERS TO ALL APPLICANTS:</span>

            <p class="mt-3">
                • Applicants with Tattoos are not allowed.
                <br>
                • Documentary Requirements of the Applicants shall be validated at the Registrar's Office prior to the
                uploading
                at BMA's Portal.
            </p>
        </div>
        <ion-card>
            <ion-card-content>
                <div class="row">
                    <div class="col-md-8">
                        <ion-label class="fw-bolder text-primary h4">
                            SENIOR HIGH SCHOOL ADMISSION REQUIREMENTS
                        </ion-label>
                        <ul class="contact-details">
                            <li> Grade 10 Report Card with Grades in English, Math,
                                Science and General Average of 80%</li>
                            <li>Certificate of Good Moral Conduct</li>
                            <li>PSA Birth Certificate (not over 19 yrs. Old)</li>
                            <li>Height Requirements: at least 5'2"</li>
                        </ul>
                        <ion-label class="fw-bolder text-primary h4">
                            COLLEGE ADMISSION REQUIREMENTS
                        </ion-label>
                        <ul class="contact-details">
                            <li> Grade 11 & 12 Card with Grades in English, Math,
                                Science and General Average of 80%
                            </li>
                            <li> Certificate of Good Moral Conduct</li>
                            <li> PSA Birth Certificate (not over 22 yrs. Old)</li>
                            <li> Barangay Clearance</li>
                            <li> Height Requirements: at least 5'4 for Marine Transportation and 5'2 for Marine
                                Engineering"
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <ApplicationForms />
                    </div>
                </div>
            </ion-card-content>
        </ion-card>
    </div>
</template>
<script>
import { IonCard, IonCardContent, IonLabel } from '@ionic/vue'
import ImageTitleHeader from '@/components/ImageTitleHeader.vue'
import ApplicationForms from '../../components/widgets/Forms/ApplicationForms.vue'
export default {
    name: 'AdmissionPage',
    components: {
        IonCard, IonCardContent, IonLabel,
        ImageTitleHeader,
        ApplicationForms
    },
}
</script>