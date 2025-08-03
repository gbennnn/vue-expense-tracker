<template>
  <header class="app-header">
    <div class="header-content">
      <h1 class="app-title">
        <span class="title-icon">💸</span>
        <span class="title-text">Expense Tracker</span>
      </h1>
      <p class="app-subtitle">Take control of your finances</p>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #9c88ff 0%, #6b5ce7 100%);
  color: white;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Desktop header */
@media (min-width: 1024px) {
  .app-header {
    padding: 60px 40px;
    margin-bottom: 40px;
  }
}

/* Tablet header */
@media (min-width: 768px) and (max-width: 1023px) {
  .app-header {
    padding: 50px 30px;
    margin-bottom: 35px;
  }
}

/* Mobile header */
@media (max-width: 767px) {
  .app-header {
    padding: 40px 20px;
    margin-bottom: 30px;
  }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.app-title {
  font-weight: 700;
  margin: 0 0 10px 0;
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

/* Desktop title */
@media (min-width: 1024px) {
  .app-title {
    font-size: 3.5rem;
    gap: 20px;
  }
}

/* Tablet title */
@media (min-width: 768px) and (max-width: 1023px) {
  .app-title {
    font-size: 3rem;
    gap: 18px;
  }
}

/* Mobile title */
@media (max-width: 767px) {
  .app-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 10px;
  }
}

.title-icon {
  animation: float 3s ease-in-out infinite;
}

/* Desktop icon */
@media (min-width: 1024px) {
  .title-icon {
    font-size: 3rem;
  }
}

/* Tablet icon */
@media (min-width: 768px) and (max-width: 1023px) {
  .title-icon {
    font-size: 2.5rem;
  }
}

/* Mobile icon */
@media (max-width: 767px) {
  .title-icon {
    font-size: 2rem;
  }
}

.app-subtitle {
  opacity: 0.9;
  margin: 0;
  font-weight: 300;
}

/* Desktop subtitle */
@media (min-width: 1024px) {
  .app-subtitle {
    font-size: 1.25rem;
  }
}

/* Tablet subtitle */
@media (min-width: 768px) and (max-width: 1023px) {
  .app-subtitle {
    font-size: 1.125rem;
  }
}

/* Mobile subtitle */
@media (max-width: 767px) {
  .app-subtitle {
    font-size: 1rem;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>