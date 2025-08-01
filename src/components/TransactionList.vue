<template>
    <h3>History</h3>
      <ul id="list" class="list">
        <!-- <li class="minus">
          Cash <span>-$400</span><button class="delete-btn">x</button>
        </li>
        <li class="plus">
          Paycheck <span>$1000</span><button class="delete-btn">x</button>
        </li> -->

        <li v-for="transaction in transactions" :key="transaction.id" :class="{ minus: transaction.amount < 0, plus: transaction.amount >= 0 }">
          {{ transaction.text }} <span>{{ transaction.amount < 0 ? '-' : '+' }}${{ Math.abs(transaction.amount) }}</span>
          <button class="delete-btn">x</button>
        </li>
      </ul>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
});
</script>