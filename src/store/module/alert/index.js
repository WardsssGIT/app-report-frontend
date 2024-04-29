import {
    SUCCESS_ALERT,
    INFO_ALERT,
    ERROR_ALERT,
    WARNING_ALERT,
    ENCRYPT_DATA,
    DECRYPT_DATA
} from '@/store/storeAlertConstants.js'
import {
    alertController
} from '@ionic/vue';
export default {
    name: 'alert',
    namespaced: true,
    actions: {
        [SUCCESS_ALERT](context, data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'success',
                title: '',
                text: data.message,
                confirmButtonText: 'OK'
            })
        },
        [INFO_ALERT](context, data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'info',
                title: 'Info!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        },
        [WARNING_ALERT](context, data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'Warning',
                title: 'Warning Message!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        },
        async [ERROR_ALERT](context, data) {
            // Use sweetalert2
            const alert = await alertController.create({
                header: 'Error Message',
                subHeader: '',
                message: data.message,
                buttons: ['OK'],
            });

            await alert.present();
        },
        [ENCRYPT_DATA](data) {
            return btoa(data)
        },
        [DECRYPT_DATA](data) {
            console.log(data)
            /* return atob(data) */
        }
    }
}