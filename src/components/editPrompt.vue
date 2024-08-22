<template>
  <div v-if="isVisible" class="event-actions-overlay" @click.self="close">
    <div class="event-actions">
      <div class="title-edit">
        <h3>{{ eventTitle }}</h3>
        <p>{{ event.extendedProps.description }}</p>
      </div>
      <div class="mybuttons">
      <Mybutton  text="Edit event" @click="editEventTitle" />
      <Mybutton text="Remove" @click="removeEvent"/>
      <Mybutton text="Cancel" @click="close"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';


const props = defineProps({
  isVisible: Boolean,
  eventTitle: String,
  event: Object,
});

const emits = defineEmits(['close', 'edit', 'remove']);

const close = () => {
  emits('close');
};

const editEventTitle = () => {
  emits('edit', props.event);
  close();
};


const removeEvent = () => {
  emits('remove', props.event);
  close();
};
</script>

<style scoped>
/* Overlay to cover the background and show the event actions */
.event-actions-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure overlay is above other content */
  transition: opacity 0.3s ease;
}

/* Container for the event actions */
.event-actions {
  background: #fff; /* White background for the card */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  width: 350px; /* Fixed width for the card */
  padding: 20px; /* Padding around content */
  box-sizing: border-box; /* Ensure padding is included in width */
  text-align: center; /* Center text */
  transition: transform 0.3s ease;
}

/* Title section styling */
.title-edit {
  margin-bottom: 20px; /* Space between title and buttons */
}

.title-edit h3 {
  margin: 0;
  font-size: 1.5em; /* Large font size for the title */
  color: #333; /* Darker text color */
}

.title-edit p {
  margin: 5px 0;
  font-size: 1em; /* Standard font size for description */
  color: #666; /* Slightly lighter text color */
}

/* Styling for buttons container */
.mybuttons {
  display: flex;
  flex-direction: row; /* Stack buttons vertically */
  gap: 10px; /* Space between buttons */
}

/* Base button styling */
.mybutton {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

/* Specific button styles */
.mybutton-edit {
  background-color: #007bff; /* Primary button color */
  color: #fff; /* White text color */
}

.mybutton-remove {
  background-color: #dc3545; /* Danger button color */
  color: #fff; /* White text color */
}

.mybutton-cancel {
  background-color: #6c757d; /* Neutral button color */
  color: #fff; /* White text color */
}

/* Button hover effects */
.mybutton:hover {
  opacity: 0.9; /* Slightly transparent on hover */
}

/* Button focus styles for accessibility */
.mybutton:focus {
  outline: 2px solid #007bff; /* Focus ring color */
  outline-offset: 2px;
}

</style>
