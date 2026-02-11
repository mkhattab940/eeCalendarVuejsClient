<script setup lang="ts">
import { ref } from 'vue';
import { useEmployeeStore } from '@/stores/employeeStore.js';

const employeeStore = useEmployeeStore();

// Local form state
const form = ref({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: ''
});

const handleSubmit = async () => {
  try {
    await employeeStore.registerEmployee(form.value);
    alert('Form submitted successfully!');
    // Optional: Clear form or redirect using Router
    form.value = { firstName: '', lastName: '', phoneNumber: '', email: '' };
  } catch (err) {
    console.error('Submission failed');
  }
};
</script>

<template>
  <div class="form-container">
    <h2>Enter Employee Details</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="form.firstName" type="text" placeholder="First Name" required />
      <input v-model="form.lastName" type="text" placeholder="Last Name" required />
      <input v-model="form.phoneNumber" type="tel" placeholder="Phone Number" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      
      <button type="submit" :disabled="employeeStore.isRegistering">
        {{ employeeStore.isRegistering ? 'Sending...' : 'Submit' }}
      </button>

      <p v-if="employeeStore.error" class="error">{{ employeeStore.error }}</p>
    </form>
  </div>
</template>