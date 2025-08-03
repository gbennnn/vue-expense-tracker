<template>
  <div class="toast-container">
    <Transition name="toast" appear>
      <div 
        v-if="visible" 
        :class="['toast', `toast--${type}`]"
        @click="hide"
      >
        <div class="toast__icon">
          <span v-if="type === 'success'">✓</span>
          <span v-else-if="type === 'error'">✕</span>
          <span v-else-if="type === 'warning'">⚠</span>
          <span v-else>ℹ</span>
        </div>
        <div class="toast__content">
          <div class="toast__title">{{ title }}</div>
          <div v-if="message" class="toast__message">{{ message }}</div>
        </div>
        <button class="toast__close" @click="hide">×</button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 3000
  },
  autoHide: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['hide']);

const visible = ref(true);

const hide = () => {
  visible.value = false;
  setTimeout(() => {
    emit('hide');
  }, 300);
};

onMounted(() => {
  if (props.autoHide && props.duration > 0) {
    setTimeout(() => {
      hide();
    }, props.duration);
  }
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.toast {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 300px;
  max-width: 400px;
  cursor: pointer;
  border-left: 4px solid;
}

.toast--success {
  border-left-color: #10b981;
}

.toast--error {
  border-left-color: #ef4444;
}

.toast--warning {
  border-left-color: #f59e0b;
}

.toast--info {
  border-left-color: #3b82f6;
}

.toast__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;
  font-weight: bold;
  color: white;
  font-size: 14px;
}

.toast--success .toast__icon {
  background-color: #10b981;
}

.toast--error .toast__icon {
  background-color: #ef4444;
}

.toast--warning .toast__icon {
  background-color: #f59e0b;
}

.toast--info .toast__icon {
  background-color: #3b82f6;
}

.toast__content {
  flex: 1;
}

.toast__title {
  font-weight: 600;
  font-size: 14px;
  color: #1f2937;
  margin-bottom: 2px;
}

.toast__message {
  font-size: 13px;
  color: #6b7280;
}

.toast__close {
  background: none;
  border: none;
  font-size: 18px;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  line-height: 1;
}

.toast__close:hover {
  color: #6b7280;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
