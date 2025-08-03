<template>
  <div class="toast-wrapper">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      :duration="toast.duration"
      :auto-hide="toast.autoHide"
      @hide="removeToast(toast.id)"
    />
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast.js';
import Toast from './Toast.vue';

const { toasts, removeToast } = useToast();
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
