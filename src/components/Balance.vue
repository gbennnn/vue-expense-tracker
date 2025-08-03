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
  background: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  margin-bottom: 20px;
}

/* Desktop balance */
@media (min-width: 1024px) {
  .balance-container {
    padding: 35px 30px;
    margin-bottom: 30px;
  }
  
  .balance-container h4 {
    font-size: 18px;
    margin-bottom: 12px;
  }
}

/* Tablet balance */
@media (min-width: 768px) and (max-width: 1023px) {
  .balance-container {
    padding: 30px 25px;
    margin-bottom: 25px;
  }
  
  .balance-container h4 {
    font-size: 17px;
    margin-bottom: 10px;
  }
}

/* Mobile balance */
@media (max-width: 767px) {
  .balance-container {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .balance-container h4 {
    font-size: 16px;
    margin-bottom: 8px;
  }
}

#balance {
  transition: color 0.3s ease;
  font-weight: 700;
  margin: 0;
}

/* Desktop balance amount */
@media (min-width: 1024px) {
  #balance {
    font-size: 48px;
  }
}

/* Tablet balance amount */
@media (min-width: 768px) and (max-width: 1023px) {
  #balance {
    font-size: 42px;
  }
}

/* Mobile balance amount */
@media (max-width: 767px) {
  #balance {
    font-size: 36px;
  }
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

/* Desktop status */
@media (min-width: 1024px) {
  .balance-status {
    margin-top: 15px;
  }
}

/* Tablet status */
@media (min-width: 768px) and (max-width: 1023px) {
  .balance-status {
    margin-top: 12px;
  }
}

.status-text {
  font-weight: 500;
  padding: 5px 15px;
  border-radius: 20px;
  display: inline-block;
  transition: all 0.3s ease;
}

/* Desktop status text */
@media (min-width: 1024px) {
  .status-text {
    font-size: 16px;
    padding: 8px 20px;
  }
}

/* Tablet status text */
@media (min-width: 768px) and (max-width: 1023px) {
  .status-text {
    font-size: 15px;
    padding: 7px 18px;
  }
}

/* Mobile status text */
@media (max-width: 767px) {
  .status-text {
    font-size: 14px;
    padding: 6px 15px;
  }
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

.status-text:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>