<template>
  <Header />
  <div class="container">
    <Balance/>
    <IncomeExpenses />
    <TransactionList :transactions="transactions" />
    <AddTransaction />

  </div>
</template>


<script setup>
  import Header from './components/Header.vue';
  import Balance from './components/Balance.vue';
  import IncomeExpenses from './components/IncomeExpenses.vue';
  import TransactionList from './components/TransactionList.vue';
  import AddTransaction from './components/AddTransaction.vue';

  import { ref } from 'vue';

  const transactions = ref([
    { id: 1, text: 'Cash', amount: -400 },
    { id: 2, text: 'Paycheck', amount: 1000 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 }
  ]);
</script>
