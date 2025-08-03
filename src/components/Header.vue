<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">
        <span class="title-icon">💸</span>
        Expense Tracker
      </h1>
      <p class="app-subtitle">Take control of your finances</p>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #9c88ff 0%, #6b5ce7 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 400px;
  margin: 0 auto;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.title-icon {
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
}

.app-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
  font-weight: 300;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 10px;
  }
  
  .title-icon {
    font-size: 1.5rem;
  }
}
</style>