<template>
  <div v-if="isVisible" class="custom-prompt-overlay" @click.self="close">
    <div class="custom-prompt">
      <h3>Add New Event</h3>
      <input v-model="title" type="text" placeholder="Enter event title" required />
      
      <div class="color-picker">
        <span v-for="color in colors" :key="color" 
              :style="{ backgroundColor: color }" 
              @click="selectColor(color)" 
              class="color-swatch"
              :class="{ selected: color === selectedColor }">
        </span>
      </div>

      <div class="description">
        <input type="text" placeholder="Description for the event" v-model="description">
      </div>

      <Mybutton text="Add" @click="addEvent" />
      <Mybutton text="Close" @click="close" />
    </div>
  </div>
</template>


<script setup>
import { ref, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean,
});

const emits = defineEmits(['close', 'add']);

const title = ref('');
const selectedColor = ref('#ff0000');
const colors = ref(['#ff0000', '#333333', '#0000ff', '#002f6c', '#ff00ff']);
const description = ref('');

const close = () => {
  emits('close');
};

const addEvent = () => {
  emits('add', { title: title.value, color: selectedColor.value, description: description.value });
  title.value = '';
  selectedColor.value = '#ff0000';
  description.value = '';
  close();
};

const selectColor = (color) => {
  selectedColor.value = color;
};
</script>

<style scoped>
.custom-prompt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: opacity 0.3s ease;
}

.custom-prompt {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.custom-prompt h3 {
  margin: 0 0 10px;
}

.custom-prompt input[type="text"] {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.color-picker {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.color-swatch {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.color-swatch.selected {
  border-color: #333;
  border: 3px solid #000000;
}

.custom-prompt button {
  padding: 10px 20px;
  margin-right: 10px;
}

</style>
