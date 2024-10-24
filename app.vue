<template>
  <div @click="enterFullScreen">
    <!-- Add the BGMusic component here -->
    <BGMusic />
    <NuxtPage />
  </div>
</template>

<script setup>
import BGMusic from '~/components/BGMusic.vue'; // Import the BGMusic component

const enterFullScreen = () => {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
};
</script>

<style scoped>
</style>
