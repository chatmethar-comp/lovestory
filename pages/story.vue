<template>
  <div class="bg-white h-screen">
    <div class="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto relative" :style="{ backgroundImage: `url(${storyPageBg})` }">
      <!-- Display Story Component -->
      <StoryComponent class="p-6"/>
    </div>
  </div>
</template>

<script setup>
import storyPageBg from '../assets/images/story_page_bg.png';
import StoryComponent from '../components/StoryComponent.vue';

definePageMeta({
  middleware: ['passcode']
})
</script>

<style scoped>

</style>
