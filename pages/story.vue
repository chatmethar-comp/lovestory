<template>
  <div class="bg-white h-screen" @click="nextStory">
    <div 
      class="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto relative bg-cover bg-center overflow-hidden" 
      :style="{ backgroundImage: currentContent ? `url(/images/story_bg/${currentContent.background || 'story_default.png'})` : '' }"
    >
      <div class="flex flex-col justify-center items-center h-full relative">
        <StoryComponent v-if="currentContent" :content="currentContent" class="p-6"/>
      </div>
      
      <!-- Loop through decorations and position each one -->
      <div 
          v-if="currentContent && currentContent.decoration"
          v-for="(decoration, index) in currentContent.decoration" 
          :key="index" 
          :style="getDecorationStyle(decoration)" 
          class="absolute"
        >
          <img :src="`/images/decoration/${decoration.src}`" :alt="decoration.src" />
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
const currentContent = ref(null);const storyPageBg = ref('');

onMounted(() => {
  currentContent.value = storyDataWithId[currentIndex.value];
});

const nextStory = () => {
  currentIndex.value = (currentIndex.value + 1) % storyDataWithId.length;
  currentContent.value = storyDataWithId[currentIndex.value];
};

const getDecorationStyle = (decoration) => {
  const style = {};
  if (decoration.position.top !== undefined) style.top = `${decoration.position.top}px`;
  if (decoration.position.bottom !== undefined) style.bottom = `${decoration.position.bottom}px`;
  if (decoration.position.left !== undefined) style.left = `${decoration.position.left}px`;
  if (decoration.position.right !== undefined) style.right = `${decoration.position.right}px`;
  if (decoration.position.horizontal === 'center') style.left = '50%';
  if (decoration.position.vertical === 'center') style.top = '50%';
  if (decoration.position.width === 'full') style.width = '100%';
  return style;
};
</script>

<style scoped>

</style>
