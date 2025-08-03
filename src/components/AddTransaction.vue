<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit="submitForm" class="transaction-form">
    <div class="form-control">
      <label for="text">Description *</label>
      <input 
        type="text" 
        id="text" 
        placeholder="Enter description..." 
        v-model="text" 
        :class="{ 'error': errors.text }"
      />
      <span v-if="errors.text" class="error-message">{{ errors.text }}</span>
    </div>
    
    <div class="form-control">
      <label for="amount">Amount *</label>
      <input 
        type="number" 
        id="amount" 
        placeholder="Enter amount..." 
        v-model="amount" 
        step="0.01"
        :class="{ 'error': errors.amount }"
      />
      <span v-if="errors.amount" class="error-message">{{ errors.amount }}</span>
      <small class="helper-text">Negative for expenses, positive for income</small>
    </div>
    
    <div class="form-control">
      <label for="category">Category</label>
      <select id="category" v-model="category">
        <option value="">Select category</option>
        <optgroup label="Income">
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Investment">Investment</option>
          <option value="Gift">Gift</option>
          <option value="Other Income">Other Income</option>
        </optgroup>
        <optgroup label="Expenses">
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other Expense">Other Expense</option>
        </optgroup>
      </select>
    </div>
    
    <div class="form-control">
      <label for="date">Date</label>
      <input 
        type="date" 
        id="date" 
        v-model="date"
        :max="today"
      />
    </div>
    
    <button type="submit" class="btn" :disabled="isSubmitting">
      {{ isSubmitting ? 'Adding...' : 'Add transaction' }}
    </button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useToast } from '../composables/useToast.js';

const { error } = useToast();

const text = ref('');
const amount = ref('');
const category = ref('');
const date = ref(new Date().toISOString().split('T')[0]);
const today = new Date().toISOString().split('T')[0];
const isSubmitting = ref(false);
const errors = ref({});

const emit = defineEmits(['add-transaction']);

const validateForm = () => {
  errors.value = {};
  
  if (!text.value.trim()) {
    errors.value.text = 'Description is required';
  }
  
  if (!amount.value || amount.value === 0 || amount.value === '0') {
    errors.value.amount = 'Amount is required and cannot be zero';
  } else if (isNaN(parseFloat(amount.value))) {
    errors.value.amount = 'Amount must be a valid number';
  }
  
  return Object.keys(errors.value).length === 0;
};

const submitForm = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    error('Validation Error', 'Please fix the errors and try again');
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    const transactionData = {
      text: text.value.trim(),
      amount: parseFloat(amount.value),
      category: category.value || 'Other',
      date: date.value
    };
    
    emit('add-transaction', transactionData);
    
    // Reset form
    text.value = '';
    amount.value = '';
    category.value = '';
    date.value = new Date().toISOString().split('T')[0];
    errors.value = {};
  } catch (err) {
    error('Error', 'Failed to add transaction');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.transaction-form {
  background: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  margin-top: 20px;
}

/* Desktop form */
@media (min-width: 1024px) {
  .transaction-form {
    padding: 30px;
    margin-top: 30px;
  }
  
  .transaction-form h3 {
    font-size: 22px;
    margin-bottom: 25px;
  }
}

/* Tablet form */
@media (min-width: 768px) and (max-width: 1023px) {
  .transaction-form {
    padding: 25px;
    margin-top: 25px;
  }
  
  .transaction-form h3 {
    font-size: 20px;
    margin-bottom: 22px;
  }
}

/* Mobile form */
@media (max-width: 767px) {
  .transaction-form {
    padding: 20px;
    margin-top: 20px;
  }
  
  .transaction-form h3 {
    font-size: 18px;
    margin-bottom: 20px;
  }
}

.form-control {
  margin-bottom: 20px;
}

/* Desktop form control */
@media (min-width: 1024px) {
  .form-control {
    margin-bottom: 25px;
  }
}

/* Tablet form control */
@media (min-width: 768px) and (max-width: 1023px) {
  .form-control {
    margin-bottom: 22px;
  }
}

.form-control label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

/* Desktop labels */
@media (min-width: 1024px) {
  .form-control label {
    font-size: 16px;
    margin-bottom: 8px;
  }
}

/* Tablet labels */
@media (min-width: 768px) and (max-width: 1023px) {
  .form-control label {
    font-size: 15px;
    margin-bottom: 6px;
  }
}

/* Mobile labels */
@media (max-width: 767px) {
  .form-control label {
    font-size: 14px;
    margin-bottom: 5px;
  }
}

.form-control input,
.form-control select {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

/* Desktop inputs */
@media (min-width: 1024px) {
  .form-control input,
  .form-control select {
    padding: 12px 15px;
    font-size: 16px;
  }
}

/* Tablet inputs */
@media (min-width: 768px) and (max-width: 1023px) {
  .form-control input,
  .form-control select {
    padding: 11px 13px;
    font-size: 15px;
  }
}

/* Mobile inputs */
@media (max-width: 767px) {
  .form-control input,
  .form-control select {
    padding: 10px 12px;
    font-size: 16px; /* Keep 16px on mobile to prevent zoom */
  }
}

.form-control input:focus,
.form-control select:focus {
  outline: none;
  border-color: #9c88ff;
  box-shadow: 0 0 0 2px rgba(156, 136, 255, 0.2);
}

.form-control input.error,
.form-control select.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  margin-top: 4px;
  display: block;
}

/* Desktop error message */
@media (min-width: 1024px) {
  .error-message {
    font-size: 13px;
    margin-top: 6px;
  }
}

/* Tablet error message */
@media (min-width: 768px) and (max-width: 1023px) {
  .error-message {
    font-size: 12px;
    margin-top: 5px;
  }
}

/* Mobile error message */
@media (max-width: 767px) {
  .error-message {
    font-size: 12px;
    margin-top: 4px;
  }
}

.helper-text {
  color: #666;
  margin-top: 4px;
  display: block;
}

/* Desktop helper text */
@media (min-width: 1024px) {
  .helper-text {
    font-size: 13px;
    margin-top: 6px;
  }
}

/* Tablet helper text */
@media (min-width: 768px) and (max-width: 1023px) {
  .helper-text {
    font-size: 12px;
    margin-top: 5px;
  }
}

/* Mobile helper text */
@media (max-width: 767px) {
  .helper-text {
    font-size: 12px;
    margin-top: 4px;
  }
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
}

/* Desktop select icon */
@media (min-width: 1024px) {
  select {
    background-position: right 15px center;
    background-size: 22px;
  }
}

/* Tablet select icon */
@media (min-width: 768px) and (max-width: 1023px) {
  select {
    background-position: right 13px center;
    background-size: 21px;
  }
}
</style>