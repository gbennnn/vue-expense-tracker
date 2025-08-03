<template>
  <div class="inc-exp-container">
    <div class="income-section">
      <div class="section-icon">📈</div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">${{ props.income.toFixed(2) }}</p>
      <div class="section-detail">
        <small>This month</small>
      </div>
    </div>
    <div class="expense-section">
      <div class="section-icon">📉</div>
      <h4>Expenses</h4>
      <p id="money-minus" class="money minus">${{ Math.abs(props.expenses).toFixed(2) }}</p>
      <div class="section-detail">
        <small>This month</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  income: {
    type: Number,
    required: true
  },
  expenses: {
    type: Number,
    required: true
  }
});
</script>

<style scoped>
.inc-exp-container {
  background-color: #fff;
  box-shadow: var(--box-shadow);
  padding: 0;
  display: flex;
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
}

.income-section,
.expense-section {
  flex: 1;
  text-align: center;
  padding: 25px 20px;
  position: relative;
  transition: transform 0.2s ease;
}

.income-section:hover,
.expense-section:hover {
  transform: translateY(-2px);
}

.income-section {
  background: linear-gradient(135deg, #d5f4e6 0%, #a3e9c4 100%);
  border-right: 1px solid #e8f8f0;
}

.expense-section {
  background: linear-gradient(135deg, #fadbd8 0%, #f1b2ad 100%);
}

.section-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.inc-exp-container h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #555;
}

.money {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 10px 0;
}

.money.plus {
  color: #27ae60;
}

.money.minus {
  color: #c0392b;
}

.section-detail {
  margin-top: 8px;
}

.section-detail small {
  color: #666;
  font-size: 12px;
  opacity: 0.8;
}

@media (max-width: 480px) {
  .inc-exp-container {
    flex-direction: column;
  }
  
  .income-section {
    border-right: none;
    border-bottom: 1px solid #e8f8f0;
  }
  
  .money {
    font-size: 20px;
  }
}
</style>