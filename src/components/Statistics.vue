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
  padding: 20px;
  margin: 20px 0;
}

.statistics-container h3 {
  margin-top: 0;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.stat-content h4 {
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
}

.stat-content p {
  margin: 0;
  font-size: 12px;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

.insight-icon {
  font-size: 16px;
}

.insight-text {
  color: #4a5568;
}

.insight-text strong {
  color: #2d3748;
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .stat-card {
    padding: 12px;
  }
  
  .stat-content h4 {
    font-size: 16px;
  }
  
  .insight-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>
