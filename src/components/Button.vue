<!-- BaseButton.vue -->
<template>
  <button
    :class="buttonClass"
    :type="type"
    :disabled="isDisabled"
    @click="handleClick"
    aria-label="Button"
  >
    <template v-if="loading">
      <span class="loader"></span> <!-- Loader for loading state -->
    </template>
    <template v-else>
      {{ text }}
    </template>
  </button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

// Props
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

// Emits
const emit = defineEmits(['click']);

// Computed property to handle dynamic class
const buttonClass = computed(() => {
  return [
    'base-button',
    props.className,
    { 'base-button--loading': props.loading, 'base-button--disabled': props.disabled }
  ];
});

const isDisabled = computed(() => props.disabled || props.loading);

// Handle click event
const handleClick = (event) => {
  if (!isDisabled.value) {
    emit('click', event);
  }
};
</script>

<style scoped>
.base-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s, opacity 0.3s;
}

.base-button:hover {
  background-color: #0056b3;
}

.base-button--loading {
  position: relative;
  opacity: 0.7;
  pointer-events: none;
}

.base-button--disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
  color: #a0a0a0;
}

.loader {
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 3px solid #fff;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
