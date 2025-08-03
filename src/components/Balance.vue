<template>
  <div class="balance-container">
    <h4>Your Balance</h4>
    <h1 id="balance" :class="{ 
      'negative': props.total < 0, 
      'positive': props.total > 0,
      'zero': props.total === 0 
    }">
      ${{ props.total.toFixed(2) }}
    </h1>
    <div class="balance-status">
      <span v-if="props.total > 0" class="status-text positive">You're doing great! 💰</span>
      <span v-else-if="props.total < 0" class="status-text negative">Watch your spending 📉</span>
      <span v-else class="status-text zero">Start tracking your finances 📊</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  total: {
    type: Number,
    required: true
  }
});
</script>

<style scoped>
.balance-container {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  margin-bottom: 20px;
}

#balance {
  transition: color 0.3s ease;
}

#balance.positive {
  color: #2ecc71;
}

#balance.negative {
  color: #e74c3c;
}

#balance.zero {
  color: #95a5a6;
}

.balance-status {
  margin-top: 10px;
}

.status-text {
  font-size: 14px;
  font-weight: 500;
  padding: 5px 15px;
  border-radius: 20px;
  display: inline-block;
}

.status-text.positive {
  background: #d5f4e6;
  color: #27ae60;
}

.status-text.negative {
  background: #fadbd8;
  color: #c0392b;
}

.status-text.zero {
  background: #f8f9fa;
  color: #6c757d;
}
</style>