<template>
    <div class="row m-0 align-items-center vh-100">
        <div class="col-lg-5 col-md-12">
            <div class="card-body">
                <div class="text-center">
                    <img src="@/resources/logo/bma-logo-1.png" class="img-fluid avatar avatar-100 rounded-circle"
                        alt="logo">
                </div>
                <h2 class="mb-2 text-center"><b>REPORTING TOOL</b></h2>
                <p class="text-center">SIGN IN</p>
                <form @submit.prevent="onLogin" class="row">
                    <div class="">
                        <div class="col-lg-12">
                            <input-component type="email" label="email" v-model:value="username"
                                :error="errors.email" />
                        </div>
                        <div class="col-lg-12">
                            <input-component type="password" label="password" v-model:value="password"
                                :error="errors.password" />
                        </div>
                        <span class="badge bg-danger mt-2" v-if="errorMessage">{{ errorMessage }}</span>

                        <div class="col-lg-12 d-flex justify-content-between">
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="customCheck1" v-model="rememberMe">
                                <label class="form-check-label" for="customCheck1">Remember Me</label>
                            </div>
                            <router-link :to="{ name: 'client-layout.student-forget-password' }" class="">Forgot
                                Password?</router-link>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary w-100" type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="res-hide col-lg-7 col-md-0 d-md-block d-none p-0">
            <img src="@/resources/banner/banner-login-2.jpg" class="img-fluid gradient-main vh-100" alt="images">
        </div>
    </div>
</template>

<script>
import { IonApp, IonContent, IonPage, loadingController } from '@ionic/vue';
import axios from 'axios';
import { mapActions } from 'vuex'
import { LOGIN_ACTION } from '@/store/storeConstants.js'
import InputComponent from '@/components/InputComponents.vue'
import LoginValidation from '@/services/validation/LoginValidation'

export default {
    name: 'LoginPage',
    components: {
        IonApp, IonContent, IonPage, InputComponent
    },
    data() {
        return {
            username: '',
            password: '',
            rememberMe: '',
            errors: [],
            errorMessage: '',
            url: '',
            crsf: ''
        }
    },
    async mounted() {
        // try {
        //     const response = await axios.get('checker');
        //     if (response && response.data && response.data.bot) {
        //         console.log(response.data.bot);
        //     } else {
        //         console.log('Response or data is undefined');
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        // this.url = axios.defaults.baseURL;
        // this.crsf = axios.defaults.xsrfHeaderName;
    },
    methods: {
        ...mapActions('auth', {
            login: LOGIN_ACTION
        }),
        async getToken() {
            return await axios.get('/token');
        },
        async onLogin() {
            const validation = new LoginValidation(this.username, this.password);
            this.errors = validation.checkValidations();
            if ('email' in this.errors || 'password' in this.errors) {
                return false;
            }
            this.errorMessage = '';
            const loading = await loadingController.create({
                message: 'Loading...',
                cssClass: 'custom-loading',
            });

            loading.present();
            const data = {
                email: this.username,
                password: this.password,
                remember_me: this.rememberMe
            }
            try {
                await this.login(data);
                this.$router.push('/admin/dashboard');
            } catch (error) {
                this.errorMessage = error.message || 'An error occurred';
            }
            loading.dismiss();
        }
    }
}
</script>
