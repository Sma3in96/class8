<template>
  <div v-if="message" class="error-message">
    {{ message }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.error-message {
  background-color: #f8d7da; /* Light red background */
  color: #721c24; /* Dark red text */
  border: 1px solid #f5c6cb; /* Light red border */
  border-radius: 4px; /* Rounded corners */
  padding: 10px; /* Add some padding */
  margin: 10px 0; /* Space around the error message */
  font-family: sans-serif; /* Optional: use a sans-serif font */
}
</style>
