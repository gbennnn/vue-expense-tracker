<template>
  <div class="statistics-container">
    <h3>Statistics</h3>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h4>{{ transactions.length }}</h4>
          <p>Total Transactions</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <h4>${{ averageIncome.toFixed(2) }}</h4>
          <p>Avg Income</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📉</div>
        <div class="stat-content">
          <h4>${{ Math.abs(averageExpense).toFixed(2) }}</h4>
          <p>Avg Expense</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🏆</div>
        <div class="stat-content">
          <h4>{{ mostUsedCategory }}</h4>
          <p>Top Category</p>
        </div>
      </div>
    </div>
    
    <div class="insights">
      <div class="insight-item" v-if="savingsRate !== null">
        <span class="insight-icon">💡</span>
        <span class="insight-text">
          Savings Rate: <strong>{{ savingsRate }}%</strong>
        </span>
      </div>
      
      <div class="insight-item" v-if="largestExpense">
        <span class="insight-icon">⚠️</span>
        <span class="insight-text">
          Largest expense: <strong>${{ Math.abs(largestExpense.amount).toFixed(2) }}</strong> on {{ largestExpense.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  expenses: {
    type: Number,
    required: true
  }
});

const incomeTransactions = computed(() => 
  props.transactions.filter(t => t.amount > 0)
);

const expenseTransactions = computed(() => 
  props.transactions.filter(t => t.amount < 0)
);

const averageIncome = computed(() => {
  const income = incomeTransactions.value;
  return income.length > 0 ? income.reduce((sum, t) => sum + t.amount, 0) / income.length : 0;
});

const averageExpense = computed(() => {
  const expenses = expenseTransactions.value;
  return expenses.length > 0 ? expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length : 0;
});

const mostUsedCategory = computed(() => {
  if (props.transactions.length === 0) return 'None';
  
  const categoryCount = {};
  props.transactions.forEach(t => {
    const category = t.category || 'Other';
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });
  
  return Object.keys(categoryCount).reduce((a, b) => 
    categoryCount[a] > categoryCount[b] ? a : b
  );
});

const savingsRate = computed(() => {
  if (props.income === 0) return null;
  const rate = ((props.income + props.expenses) / props.income) * 100;
  return Math.round(rate);
});

const largestExpense = computed(() => {
  if (expenseTransactions.value.length === 0) return null;
  return expenseTransactions.value.reduce((largest, current) => 
    current.amount < largest.amount ? current : largest
  );
});
</script>

<style scoped>
.statistics-container {
  background: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  margin: 20px 0;
}

/* Desktop statistics */
@media (min-width: 1024px) {
  .statistics-container {
    padding: 30px;
    margin: 30px 0;
  }
}

/* Tablet statistics */
@media (min-width: 768px) and (max-width: 1023px) {
  .statistics-container {
    padding: 25px;
    margin: 25px 0;
  }
}

/* Mobile statistics */
@media (max-width: 767px) {
  .statistics-container {
    padding: 20px;
    margin: 20px 0;
  }
}

.statistics-container h3 {
  margin-top: 0;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 12px;
}

.stats-grid {
  display: grid;
  gap: 15px;
  margin-bottom: 20px;
}

/* Desktop grid */
@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 25px;
  }
}

/* Tablet grid */
@media (min-width: 768px) and (max-width: 1023px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    margin-bottom: 22px;
  }
}

/* Mobile grid */
@media (max-width: 767px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
}

.stat-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Desktop stat cards */
@media (min-width: 1024px) {
  .stat-card {
    padding: 20px;
  }
}

/* Tablet stat cards */
@media (min-width: 768px) and (max-width: 1023px) {
  .stat-card {
    padding: 18px;
  }
}

/* Mobile stat cards */
@media (max-width: 767px) {
  .stat-card {
    padding: 15px 12px;
  }
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  margin-bottom: 8px;
}

/* Desktop icon */
@media (min-width: 1024px) {
  .stat-icon {
    font-size: 28px;
    margin-bottom: 10px;
  }
}

/* Tablet icon */
@media (min-width: 768px) and (max-width: 1023px) {
  .stat-icon {
    font-size: 26px;
    margin-bottom: 9px;
  }
}

/* Mobile icon */
@media (max-width: 767px) {
  .stat-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }
}

.stat-content h4 {
  margin: 0 0 5px 0;
  font-weight: 700;
  color: #2d3748;
}

/* Desktop stat content */
@media (min-width: 1024px) {
  .stat-content h4 {
    font-size: 20px;
    margin-bottom: 6px;
  }
}

/* Tablet stat content */
@media (min-width: 768px) and (max-width: 1023px) {
  .stat-content h4 {
    font-size: 19px;
    margin-bottom: 6px;
  }
}

/* Mobile stat content */
@media (max-width: 767px) {
  .stat-content h4 {
    font-size: 18px;
    margin-bottom: 5px;
  }
}

.stat-content p {
  margin: 0;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Desktop stat text */
@media (min-width: 1024px) {
  .stat-content p {
    font-size: 13px;
  }
}

/* Tablet stat text */
@media (min-width: 768px) and (max-width: 1023px) {
  .stat-content p {
    font-size: 12px;
  }
}

/* Mobile stat text */
@media (max-width: 767px) {
  .stat-content p {
    font-size: 11px;
  }
}

.insights {
  border-top: 1px solid #e2e8f0;
  padding-top: 15px;
}

.insight-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
}

/* Desktop insights */
@media (min-width: 1024px) {
  .insights {
    padding-top: 20px;
  }
  
  .insight-item {
    padding: 10px 0;
    font-size: 15px;
  }
}

/* Mobile insights */
@media (max-width: 767px) {
  .insight-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    font-size: 13px;
  }
}

.insight-icon {
  font-size: 16px;
}

.insight-text {
  color: #4a5568;
}

.insight-text strong {
  color: #2d3748;
}
</style>
