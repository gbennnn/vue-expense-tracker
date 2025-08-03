<template>
  <Header />
  <div class="container">
    <div class="balance-section">
      <Balance :total="total" />
    </div>
    
    <div class="income-expenses-section">
      <IncomeExpenses :income="income" :expenses="expenses" />
    </div>
    
    <div class="statistics-section" v-if="transactions.length > 0">
      <Statistics 
        :transactions="transactions" 
        :income="income" 
        :expenses="expenses"
      />
    </div>
    
    <div class="transaction-section">
      <TransactionList 
        :transactions="transactions" 
        @delete-transaction="deleteTransaction"
      />
    </div>
    
    <div class="add-transaction-section">
      <AddTransaction @add-transaction="addTransaction" />
    </div>
  </div>
  <ToastContainer />
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import Statistics from './components/Statistics.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import ToastContainer from './components/ToastContainer.vue';

import { computed, onMounted } from 'vue';
import { useLocalStorage } from './composables/useLocalStorage.js';
import { useToast } from './composables/useToast.js';

const { success, error, info } = useToast();

// Use localStorage for persistence
const transactions = useLocalStorage('expense-tracker-transactions', [
  { 
    id: 1, 
    text: 'Salary', 
    amount: 1000, 
    category: 'Salary',
    date: new Date().toISOString().split('T')[0]
  },
  { 
    id: 2, 
    text: 'Groceries', 
    amount: -150, 
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  },
  { 
    id: 3, 
    text: 'Gas', 
    amount: -50, 
    category: 'Transport',
    date: new Date().toISOString().split('T')[0]
  }
]);

// Computed property to calculate total balance
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0);
});

// Get income
const income = computed(() => {
  return transactions.value
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});

// Get expenses
const expenses = computed(() => {
  return transactions.value
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
});

// Function to generate unique ID
const generateId = () => {
  return Date.now() + Math.random();
};

// Function to add a new transaction
const addTransaction = (transactionData) => {
  try {
    const newTransaction = {
      id: generateId(),
      text: transactionData.text,
      amount: parseFloat(transactionData.amount),
      category: transactionData.category || 'Other',
      date: transactionData.date || new Date().toISOString().split('T')[0]
    };
    
    transactions.value.push(newTransaction);
    
    success(
      'Transaction Added!', 
      `${newTransaction.text}: ${newTransaction.amount >= 0 ? '+' : ''}$${newTransaction.amount.toFixed(2)}`
    );
  } catch (err) {
    error('Error', 'Failed to add transaction');
  }
};

// Function to delete a transaction
const deleteTransaction = (id) => {
  try {
    const transactionToDelete = transactions.value.find(t => t.id === id);
    if (transactionToDelete) {
      transactions.value = transactions.value.filter(transaction => transaction.id !== id);
      info(
        'Transaction Deleted', 
        `${transactionToDelete.text} has been removed`
      );
    }
  } catch (err) {
    error('Error', 'Failed to delete transaction');
  }
};

// Clear all transactions
const clearAllTransactions = () => {
  if (confirm('Are you sure you want to delete all transactions?')) {
    transactions.value = [];
    info('All Clear!', 'All transactions have been deleted');
  }
};

onMounted(() => {
  info('Welcome!', 'Your expense tracker is ready');
});
</script>
