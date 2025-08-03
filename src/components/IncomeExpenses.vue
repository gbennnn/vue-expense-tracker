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

/* Desktop income/expenses container */
@media (min-width: 1024px) {
  .inc-exp-container {
    margin: 30px 0;
  }
}

/* Tablet income/expenses container */
@media (min-width: 768px) and (max-width: 1023px) {
  .inc-exp-container {
    margin: 25px 0;
  }
}

/* Mobile income/expenses container */
@media (max-width: 767px) {
  .inc-exp-container {
    flex-direction: column;
    margin: 20px 0;
  }
}

.income-section,
.expense-section {
  flex: 1;
  text-align: center;
  position: relative;
  transition: transform 0.2s ease;
}

/* Desktop sections */
@media (min-width: 1024px) {
  .income-section,
  .expense-section {
    padding: 35px 25px;
  }
}

/* Tablet sections */
@media (min-width: 768px) and (max-width: 1023px) {
  .income-section,
  .expense-section {
    padding: 30px 20px;
  }
}

/* Mobile sections */
@media (max-width: 767px) {
  .income-section,
  .expense-section {
    padding: 25px 20px;
  }
}

.income-section:hover,
.expense-section:hover {
  transform: translateY(-2px);
}

.income-section {
  background: linear-gradient(135deg, #d5f4e6 0%, #a3e9c4 100%);
  border-right: 1px solid #e8f8f0;
}

/* Mobile income section */
@media (max-width: 767px) {
  .income-section {
    border-right: none;
    border-bottom: 1px solid #e8f8f0;
  }
}

.expense-section {
  background: linear-gradient(135deg, #fadbd8 0%, #f1b2ad 100%);
}

.section-icon {
  margin-bottom: 8px;
}

/* Desktop icon */
@media (min-width: 1024px) {
  .section-icon {
    font-size: 28px;
    margin-bottom: 12px;
  }
}

/* Tablet icon */
@media (min-width: 768px) and (max-width: 1023px) {
  .section-icon {
    font-size: 26px;
    margin-bottom: 10px;
  }
}

/* Mobile icon */
@media (max-width: 767px) {
  .section-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }
}

.inc-exp-container h4 {
  margin: 0 0 10px 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #555;
}

/* Desktop headings */
@media (min-width: 1024px) {
  .inc-exp-container h4 {
    font-size: 16px;
    margin-bottom: 12px;
  }
}

/* Tablet headings */
@media (min-width: 768px) and (max-width: 1023px) {
  .inc-exp-container h4 {
    font-size: 15px;
    margin-bottom: 11px;
  }
}

/* Mobile headings */
@media (max-width: 767px) {
  .inc-exp-container h4 {
    font-size: 14px;
    margin-bottom: 10px;
  }
}

.money {
  font-weight: 700;
  letter-spacing: 1px;
  margin: 10px 0;
}

/* Desktop money amounts */
@media (min-width: 1024px) {
  .money {
    font-size: 28px;
    margin: 12px 0;
  }
}

/* Tablet money amounts */
@media (min-width: 768px) and (max-width: 1023px) {
  .money {
    font-size: 26px;
    margin: 11px 0;
  }
}

/* Mobile money amounts */
@media (max-width: 767px) {
  .money {
    font-size: 22px;
    margin: 10px 0;
  }
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

/* Desktop section detail */
@media (min-width: 1024px) {
  .section-detail {
    margin-top: 12px;
  }
}

/* Tablet section detail */
@media (min-width: 768px) and (max-width: 1023px) {
  .section-detail {
    margin-top: 10px;
  }
}

.section-detail small {
  color: #666;
  opacity: 0.8;
}

/* Desktop small text */
@media (min-width: 1024px) {
  .section-detail small {
    font-size: 13px;
  }
}

/* Tablet small text */
@media (min-width: 768px) and (max-width: 1023px) {
  .section-detail small {
    font-size: 12px;
  }
}

/* Mobile small text */
@media (max-width: 767px) {
  .section-detail small {
    font-size: 11px;
  }
}
</style>