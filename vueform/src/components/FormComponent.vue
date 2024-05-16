// FormComponent.vue
<template>
  <div>
    <vue-form-builder :schema="formSchema" v-model="formData" @submit="handleSubmit"></vue-form-builder>
  </div>
</template>

<script>
import VueFormBuilder from 'vue-form-builder';
import 'vue-form-builder/dist/vue-form-builder.css';

export default {
  components: {
    VueFormBuilder
  },
  data() {
    return {
      formSchema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            required: true
          },
          {
            type: 'input',
            inputType: 'email',
            label: 'Email',
            model: 'email',
            required: true
          },
          {
            type: 'textarea',
            label: 'Message',
            model: 'message',
            rows: 5,
            required: true
          },
          {
            type: 'submit',
            buttonText: 'Submit'
          }
        ]
      },
      formData: {}
    };
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', this.formData);
      // Add your form submission logic here
    }
  }
};
</script>

<style scoped>
/* Add any styles you need for your form */
</style>
