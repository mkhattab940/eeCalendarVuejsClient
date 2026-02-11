import { defineStore } from "pinia";
import axios from 'axios'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    selectedRow: null,
    isRegistering: false,
    isGettingAllEmployees: false,
    error: null as string | null
  }),
  actions: {
    async registerEmployee(formData: {firstName: string; lastName: string; phoneNumber: string; email: string }) {
      this.isRegistering = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:3000/employees/registerEmployee', formData);
        
        //return response.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to submit employee form';
        throw err;
      } finally {
        this.isRegistering = false;
        this.getAllEmployees();
      }
    },
    async getAllEmployees() {
      this.isGettingAllEmployees = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:3000/employees/getAllEmployees');
        this.employees = response.data.employees;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch employees';
        throw err;
      } finally {
        this.isGettingAllEmployees = false;
      }
    }
  }
})