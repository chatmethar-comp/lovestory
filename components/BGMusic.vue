<template>
  <audio id="background_music" ref="backgroundAudio" loop allow="autoplay" autoplay >
    <source src="/musics/B.mp3" type="audio/mpeg" />
  </audio>
</template>

<script setup>
const backgroundAudio = ref(null);

onMounted(() => {
  if (backgroundAudio.value) {
    backgroundAudio.value.play().catch((error) => {
      console.error('Autoplay failed:', error);
    });
  }
});
</script>

<style scoped>
</style>
