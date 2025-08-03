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

/* Desktop transaction section */
@media (min-width: 1024px) {
  .transaction-section {
    margin-top: 40px;
  }
}

/* Tablet transaction section */
@media (min-width: 768px) and (max-width: 1023px) {
  .transaction-section {
    margin-top: 35px;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

/* Desktop section header */
@media (min-width: 1024px) {
  .section-header {
    margin-bottom: 20px;
  }
}

/* Tablet section header */
@media (min-width: 768px) and (max-width: 1023px) {
  .section-header {
    margin-bottom: 18px;
  }
}

/* Mobile section header */
@media (max-width: 767px) {
  .section-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    margin-bottom: 15px;
  }
}

.section-header h3 {
  margin: 0;
  border-bottom: none;
  padding-bottom: 0;
}

/* Desktop h3 */
@media (min-width: 1024px) {
  .section-header h3 {
    font-size: 22px;
  }
}

/* Tablet h3 */
@media (min-width: 768px) and (max-width: 1023px) {
  .section-header h3 {
    font-size: 20px;
  }
}

/* Mobile h3 */
@media (max-width: 767px) {
  .section-header h3 {
    font-size: 18px;
  }
}

.filter-controls {
  display: flex;
  gap: 10px;
}

/* Mobile filter controls */
@media (max-width: 767px) {
  .filter-controls {
    justify-content: center;
  }
}

.filter-select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

/* Desktop filter select */
@media (min-width: 1024px) {
  .filter-select {
    padding: 8px 12px;
    font-size: 15px;
  }
}

/* Tablet filter select */
@media (min-width: 768px) and (max-width: 1023px) {
  .filter-select {
    padding: 7px 11px;
    font-size: 14px;
  }
}

/* Mobile filter select */
@media (max-width: 767px) {
  .filter-select {
    padding: 6px 10px;
    font-size: 14px;
    flex: 1;
  }
}

.no-transactions {
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  color: #666;
}

/* Desktop no transactions */
@media (min-width: 1024px) {
  .no-transactions {
    padding: 50px 30px;
    font-size: 16px;
  }
}

/* Tablet no transactions */
@media (min-width: 768px) and (max-width: 1023px) {
  .no-transactions {
    padding: 45px 25px;
    font-size: 15px;
  }
}

/* Mobile no transactions */
@media (max-width: 767px) {
  .no-transactions {
    padding: 40px 20px;
    font-size: 14px;
  }
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: transform 0.2s ease;
}

/* Desktop transaction item */
@media (min-width: 1024px) {
  .transaction-item {
    padding: 20px 15px;
  }
}

/* Tablet transaction item */
@media (min-width: 768px) and (max-width: 1023px) {
  .transaction-item {
    padding: 18px 15px;
  }
}

/* Mobile transaction item */
@media (max-width: 767px) {
  .transaction-item {
    padding: 15px;
  }
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

/* Desktop transaction content */
@media (min-width: 1024px) {
  .transaction-content {
    gap: 8px;
  }
}

/* Tablet transaction content */
@media (min-width: 768px) and (max-width: 1023px) {
  .transaction-content {
    gap: 6px;
  }
}

.transaction-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Mobile transaction main */
@media (max-width: 767px) {
  .transaction-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}

.transaction-text {
  font-weight: 600;
  color: #333;
}

/* Desktop transaction text */
@media (min-width: 1024px) {
  .transaction-text {
    font-size: 16px;
  }
}

/* Tablet transaction text */
@media (min-width: 768px) and (max-width: 1023px) {
  .transaction-text {
    font-size: 15px;
  }
}

/* Mobile transaction text */
@media (max-width: 767px) {
  .transaction-text {
    font-size: 14px;
  }
}

.transaction-amount {
  font-weight: bold;
}

/* Desktop transaction amount */
@media (min-width: 1024px) {
  .transaction-amount {
    font-size: 18px;
  }
}

/* Tablet transaction amount */
@media (min-width: 768px) and (max-width: 1023px) {
  .transaction-amount {
    font-size: 17px;
  }
}

/* Mobile transaction amount */
@media (max-width: 767px) {
  .transaction-amount {
    font-size: 16px;
  }
}

.transaction-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}

/* Desktop transaction meta */
@media (min-width: 1024px) {
  .transaction-meta {
    font-size: 13px;
  }
}

/* Tablet transaction meta */
@media (min-width: 768px) and (max-width: 1023px) {
  .transaction-meta {
    font-size: 12px;
  }
}

/* Mobile transaction meta */
@media (max-width: 767px) {
  .transaction-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    font-size: 12px;
  }
}

.transaction-category {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
}

/* Desktop transaction category */
@media (min-width: 1024px) {
  .transaction-category {
    padding: 3px 10px;
    font-size: 12px;
  }
}

/* Tablet transaction category */
@media (min-width: 768px) and (max-width: 1023px) {
  .transaction-category {
    padding: 3px 9px;
    font-size: 11px;
  }
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
}

/* Desktop transaction summary */
@media (min-width: 1024px) {
  .transaction-summary {
    margin-top: 20px;
    padding: 12px;
    font-size: 15px;
  }
}

/* Tablet transaction summary */
@media (min-width: 768px) and (max-width: 1023px) {
  .transaction-summary {
    margin-top: 18px;
    padding: 11px;
    font-size: 14px;
  }
}

/* Mobile transaction summary */
@media (max-width: 767px) {
  .transaction-summary {
    font-size: 13px;
  }
}
</style>