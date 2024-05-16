<template>
  <div id="app" class="h-screen">
    <VueformBuilder
      ref="builder$"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const builder$ = ref(null);

const handleSave = (builderObject, history) => {
  localStorage.setItem('vueform-builder', JSON.stringify(builderObject));
  localStorage.setItem('vueform-history', JSON.stringify(history));

  // Optionally, send the data to your server
  // axios.post('/save-url', { builder: builderObject, history: history })
  //   .then(response => console.log('Form saved successfully:', response))
  //   .catch(error => console.error('Failed to save form:', error));
};

onMounted(async () => {
  try {
    const response = await axios.get('/load-url'); // Replace with your actual endpoint
    const form = response.data;

    const builderObject = form.builder; // object
    const history = form.history; // array

    if (builder$.value) {
      builder$.value.load(builderObject, history);
    }
  } catch (error) {
    console.error('Failed to load form data:', error);
  }

  // Optionally, load from local storage if no server data is available
  if (!builder$.value.builder && localStorage.getItem('vueform-builder')) {
    const localBuilderObject = JSON.parse(localStorage.getItem('vueform-builder'));
    const localHistory = JSON.parse(localStorage.getItem('vueform-history'));
    
    if (localBuilderObject && localHistory) {
      builder$.value.load(localBuilderObject, localHistory);
    }
  }
});
</script>

<style>
/* Add any component-specific styles here */
</style>
