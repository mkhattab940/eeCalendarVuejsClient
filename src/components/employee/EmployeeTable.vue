<script setup lang="ts">
import { onMounted } from 'vue';
import { useEmployeeStore } from '@/stores/employeeStore.ts';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const store = useEmployeeStore();

// "onMounted" is like C#'s OnInitialized
onMounted(() => {
  store.getAllEmployees();
});
</script>

<template>
  <div class="card">
    <DataTable :value="store.employees" :loading="store.isGettingAllEmployees" paginator :rows="5" tableStyle="min-width: 50rem">
      <template #header>
        <span class="text-xl font-bold">Employees</span>
      </template>
      
      <Column field="firstName" header="First Name"></Column>
      <Column field="lastName" header="Last Name"></Column>
      <Column field="phoneNumber" header="Phone Number"></Column>
      <Column field="email" header="Email"></Column>

      <template #empty> No records found. </template>
    </DataTable>
  </div>
</template>