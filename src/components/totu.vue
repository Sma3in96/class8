<template>
  <div class="video-container">
    <video ref="videoElement" class="video-player" autoplay loop>
      <source src="../images/addEventVideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const videoElement = ref(null);

onMounted(() => {
  const video = videoElement.value;
  if (video) {
    video.addEventListener('ended', () => {
      video.play();
    });
  }
});
</script>

<style scoped>
.video-container {
  position: fixed;
  top: 50px;
  left: 10;
  width: 80%;
  height: auto;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: opacity 0.3s ease;
}

.video-player {
  width: 100%; /* Adjust width as needed */
  height: auto; /* Maintain aspect ratio */
  object-fit: cover; /* Cover the video container */
  border: 5px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
</style>
