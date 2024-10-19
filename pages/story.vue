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
const storyPageBg = ref('');

onMounted(() => {
  currentContent.value = storyDataWithId[currentIndex.value];
  updateBackground();
});

const nextStory = () => {
  currentIndex.value = (currentIndex.value + 1);
  if (currentIndex.value == storyDataWithId.length) {
    navigateTo('/confess')
  } else {
    currentContent.value = storyDataWithId[currentIndex.value];
    updateBackground();
  }
}

const updateBackground = () => {
  // not sure if directly hardcode `_nuxt/` is a correct standard 
  // this just check if background field is not empty
  // TODO: handle the if that file doesn't exist
  if(currentContent.value.background){
    storyPageBg.value = `/_nuxt/assets/images/story_bg/${currentContent.value.background}`;
  } else {
    storyPageBg.value = `/_nuxt/assets/images/story_bg/story_default.png`;
  }
};
</script>

<style scoped>

</style>
