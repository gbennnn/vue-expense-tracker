import { ref, nextTick } from 'vue';

const toasts = ref([]);

let toastId = 0;

export function useToast() {
  const addToast = (options) => {
    const toast = {
      id: ++toastId,
      type: 'info',
      duration: 3000,
      autoHide: true,
      ...options
    };
    
    toasts.value.push(toast);
    
    return toast.id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (title, message = '', options = {}) => {
    return addToast({
      type: 'success',
      title,
      message,
      ...options
    });
  };

  const error = (title, message = '', options = {}) => {
    return addToast({
      type: 'error',
      title,
      message,
      duration: 5000,
      ...options
    });
  };

  const warning = (title, message = '', options = {}) => {
    return addToast({
      type: 'warning',
      title,
      message,
      ...options
    });
  };

  const info = (title, message = '', options = {}) => {
    return addToast({
      type: 'info',
      title,
      message,
      ...options
    });
  };

  const clear = () => {
    toasts.value = [];
  };

  return {
    toasts: toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clear
  };
}
