<template>
    <div>
        <ion-label class="fw-bolder h4 text-primary">APPLICATION FORM</ion-label>
        <div v-if="errors.message" class="m-0 p-2 alert alert-left alert-info alert-dismissible fade show mt-5"
            role="alert">
            <span class="fw-bolder text-danger">REGISTRATION FAILED:</span>
            <p class="mt-2" v-html="errors.message"></p>
        </div>
        <div v-if="networkError.code" class="alert alert-left alert-danger alert-dismissible fade show mt-5"
            role="alert">
            <span class="fw-bolder">{{ networkError.code }}</span>
            <p class="mt-3" v-html="networkError.message"> </p>
        </div>
        <div class="contact-form mt-3">
            <form @submit.prevent="applicantRegister" method="post">
                <div class="col-md-12">
                    <input-component label="First Name" v-model:value="formData.firstName" :error="errors.firstName" />
                </div>
                <div class="col-md-12">
                    <input-component label="last Name" v-model:value="formData.lastName" :error="errors.lastName" />
                </div>
                <div class="col-md-12">
                    <input-component label="email" v-model:value="formData.email" :error="errors.email" />
                </div>
                <div class="col-md-12">
                    <input-component type="date" label="birthday" v-model:value="formData.birthday"
                        :error="errors.birthday" dateMax='true' />
                </div>
                <div class="col-md-12">
                    <input-component label="Contact number" v-model:value="formData.contactNumber"
                        :error="errors.contactNumber" />
                </div>
                <div class="col-md-12 position-relative">
                    <small for="validationTooltip04" class="form-label fw-bolder">COURSE <sup
                            class="text-danger fw-bolder">*</sup></small>
                    <select class="form-select form-select-sm border border-primary" v-model="formData.course">
                        <option selected="" disabled="" value="">Choose...</option>
                        <option value="1">BS MARINE ENGINEERING</option>
                        <option value="2">BS MARINE TRANSPORTATION </option>
                        <option value="3">SENIOR HIGHSCHOOL - PRE-BACCALAUREATE MARITIME</option>

                    </select>
                    <span class="badge bg-danger mt-2" v-if="errors.course">
                        {{ errors.course[0] }}
                    </span>
                </div>
                <div class="col-md-12  mt-3">
                    <input-component label="Captcha" v-model:value="formData.captcha" :error="errors.captcha" />
                    <div class="form-group ">
                        <div class="col-md-8">
                            <span v-html="captchaValue" v-if="captchaValue"></span>
                            <span class="badge bg-info" v-else>Captcha Loading....</span>
                            <a class="badge bg-info ms-4" @click="recaptcha">
                                &#x21bb;
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-check mt-2">
                        <input class="form-check-input" type="checkbox" v-model="formData.agreement" id="invalidCheck">
                        <label class="form-check-label" for="invalidCheck">
                            Agree to terms and conditions
                        </label> <br>
                        <span class="badge bg-danger mt-2" v-if="errors.agreement">
                            {{ errors.agreement[0] }}
                        </span>
                        <p class="text-primary mt-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Read terms and conditions
                        </p>
                    </div>
                </div>
                <!--    <vue-recaptcha ref="recaptcha" sitekey="6Lch4wckAAAAAIv3KzDuN0M82UOeWJLWa7L_2Zva" /> -->
                <div class="col-12">
                    <button class="btn btn-primary rounded w-100 mb-5" type="submit">REGISTER
                        NOW</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
import { APPLICANT_REGISTRATION_ACTION } from '@/store/storeConstants.js'
import axios from 'axios'
import { IonLabel, loadingController } from '@ionic/vue'
import InputComponent from '@/components/InputComponents.vue'
export default {
    name: 'ApplicationForm',
    data() {
        const formData = {
            firstName: '',
            lastName: '',
            email: '',
            course: '',
            contactNumber: '',
            birthday: '',
            agreement: '',
            captcha: '',
            message: 'Check you Email for your Password'
        }
        return {
            errors: [],
            networkError: [],
            validateClass: '',
            formData,
            captchaValue: ''
        }
    },
    mounted() {
        this.recaptcha()
        axios.get('checker').then((response) => {
            console.log(response.data.bot)
        }).catch((error) => {
            console.log(error)
        })
    },
    components: {
        IonLabel, InputComponent
    }, methods: {
        ...mapActions('auth', {
            registration: APPLICANT_REGISTRATION_ACTION
        }),
        ...mapActions('alert', {
            successAlert: SUCCESS_ALERT,
            infoAlert: INFO_ALERT,
            errorAlert: ERROR_ALERT,
            encrypt: ENCRYPT_DATA
        }),
        async applicantRegister() {
            this.networkError = []
            this.errors = []
            const loading = await loadingController.create({
                message: 'Loading...',
                cssClass: 'custom-loading',
            });

            loading.present();
            try {
                await this.registration(this.formData).then(response => {
                    const message = btoa(response.data.message)
                    this.$router.push({ path: '/applicant/login', query: { _m: message } })
                })
            } catch (error) {
                loading.dismiss();
                this.errorMessage = error
                if (error.code === 'ERR_NETWORK') {
                    this.networkError = error
                    this.errorAlert(error)
                } else {
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors
                        }
                    }
                }
                this.formData.captcha = ''
                this.recaptcha()
            }
        },
        async recaptcha() {
            this.captchaValue = ''
            axios.get('form-recaptcha').then((response) => {
                this.captchaValue = response.data.captcha
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>