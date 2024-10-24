<template>
  <audio ref="backgroundAudio" autoplay loop>
    <source src="/static/musics/Test.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
</template>

<script lang="ts">
export default {
  mounted() {
    const audio = this.$refs.backgroundAudio as HTMLAudioElement;
    audio.volume = 0.5; 
  },
};
</script>

<style scoped>
</style>
