<template>
  <div class="transaction-section">
    <div class="section-header">
      <h3>Transaction History</h3>
      <div class="filter-controls">
        <select v-model="filterCategory" class="filter-select">
          <option value="">All Categories</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Investment">Investment</option>
          <option value="Gift">Gift</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>

    <div v-if="filteredTransactions.length === 0" class="no-transactions">
      <p>{{ filterCategory ? 'No transactions found in this category' : 'No transactions yet. Add your first transaction!' }}</p>
    </div>

    <ul v-else id="list" class="list">
      <li 
        v-for="transaction in sortedTransactions" 
        :key="transaction.id" 
        :class="{ minus: transaction.amount < 0, plus: transaction.amount >= 0 }"
        class="transaction-item"
      >
        <div class="transaction-content">
          <div class="transaction-main">
            <span class="transaction-text">{{ transaction.text }}</span>
            <span class="transaction-amount">
              {{ transaction.amount < 0 ? '-' : '+' }}${{ Math.abs(transaction.amount).toFixed(2) }}
            </span>
          </div>
          <div class="transaction-meta">
            <span class="transaction-category">{{ transaction.category || 'Other' }}</span>
            <span class="transaction-date">{{ formatDate(transaction.date) }}</span>
          </div>
        </div>
        <button 
          class="delete-btn" 
          @click="deleteTransaction(transaction.id)"
          :title="`Delete ${transaction.text}`"
        >
          ×
        </button>
      </li>
    </ul>

    <div v-if="transactions.length > 0" class="transaction-summary">
      <p>Total: {{ filteredTransactions.length }} transaction{{ filteredTransactions.length !== 1 ? 's' : '' }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['delete-transaction']);

const filterCategory = ref('');

const filteredTransactions = computed(() => {
  if (!filterCategory.value) {
    return props.transactions;
  }
  return props.transactions.filter(transaction => 
    transaction.category === filterCategory.value
  );
});

const sortedTransactions = computed(() => {
  return [...filteredTransactions.value].sort((a, b) => {
    // Sort by date (newest first), then by id (newest first)
    if (a.date && b.date) {
      const dateComparison = new Date(b.date) - new Date(a.date);
      if (dateComparison !== 0) return dateComparison;
    }
    return b.id - a.id;
  });
});

const deleteTransaction = (id) => {
  if (confirm('Are you sure you want to delete this transaction?')) {
    emit('delete-transaction', id);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};
</script>

<style scoped>
.transaction-section {
  margin-top: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h3 {
  margin: 0;
  border-bottom: none;
  padding-bottom: 0;
}

.filter-controls {
  display: flex;
  gap: 10px;
}

.filter-select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
}

.no-transactions {
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  color: #666;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  position: relative;
  transition: transform 0.2s ease;
}

.transaction-item:hover {
  transform: translateX(-5px);
}

.transaction-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.transaction-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-text {
  font-weight: 600;
  color: #333;
}

.transaction-amount {
  font-weight: bold;
  font-size: 16px;
}

.transaction-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.transaction-category {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
}

.transaction-date {
  font-style: italic;
}

.delete-btn {
  position: absolute;
  top: 50%;
  right: -40px;
  transform: translateY(-50%);
  transition: right 0.3s ease, opacity 0.3s ease;
}

.transaction-item:hover .delete-btn {
  right: 10px;
  opacity: 1;
}

.transaction-summary {
  text-align: center;
  margin-top: 15px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  color: #666;
  font-size: 14px;
}

@media (max-width: 480px) {
  .section-header {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  .transaction-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .transaction-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
  }
}
</style>