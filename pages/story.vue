<template>
  <div class="bg-white h-screen" @click="nextStory">
    <div 
      class="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto relative bg-cover bg-center" 
      :style="{ backgroundImage: `url(${storyPageBg})` }"
    >
      <StoryComponent :content="currentContent" class="p-6"/>
    </div>
  </div>
</template>

<script setup>
import storyPageBg from '../assets/images/story_page_bg.png';
import StoryComponent from '../components/StoryComponent.vue';
import storyData from '@/story.json';

definePageMeta({
  middleware: ['passcode']
})

const storyDataWithId = storyData.map((item, index) => ({
  ...item,
  id: index, // generate id
}));

const currentIndex = ref(0);
const currentContent = ref(storyDataWithId[currentIndex.value]);

onMounted(() => {
  currentContent.value = storyDataWithId[currentIndex.value];
});

const nextStory = () => {
  currentIndex.value = (currentIndex.value + 1);
  if (currentIndex.value == storyDataWithId.length) {
    navigateTo('/confess')
  } else {
    currentContent.value = storyDataWithId[currentIndex.value];
  }
}
</script>

<style scoped>

</style>
