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
        :data-decoration-src="decoration.src"
        :style="getDecorationStyle(decoration)"
        class="absolute decoration"
      >
        <img :src="`/images/decoration/${decoration.src}`" :alt="decoration.src" />
      </div>
    </div>
  </div>
  <BGMusic />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import StoryComponent from '../components/StoryComponent.vue';
import storyData from '@/story.json';

definePageMeta({
  middleware: ['passcode']
});

const storyDataWithId = storyData.map((item, index) => ({
  ...item,
  id: index, // generate id
}));

const currentIndex = ref(0);
const currentContent = ref(null);
const nextContent = ref(null);

onMounted(() => {
  currentContent.value = storyDataWithId[currentIndex.value];
  window.onbeforeunload = () => {
    return "ต้องการออกจากหน้านี้จริงๆหรอ";
  };
});

const nextStory = async () => {
  const newIndex = (currentIndex.value + 1) % storyDataWithId.length;
  nextContent.value = storyDataWithId[newIndex];

  // Trigger animations for matching decorations
  await animateMatchingDecorations();

  // Set next content after animations are complete
  setTimeout(() => {
    currentIndex.value = newIndex;
    currentContent.value = nextContent.value;
    nextContent.value = null;
  }, 500); // Adjust delay as needed
};

// Function to animate decorations if they exist on both pages
const animateMatchingDecorations = async () => {
  if (!currentContent.value.decoration || !nextContent.value.decoration) return

  // Wait for the next DOM update
  await nextTick();

  currentContent.value.decoration.forEach((currentDecoration) => {
    const matchingDecoration = nextContent.value.decoration.find(
      (nextDecoration) => nextDecoration.src === currentDecoration.src
    );

    if (matchingDecoration) {
      // Log that animation will happen for the matched decoration
      console.log(`Animating decoration ${currentDecoration.src} to new position and scale.`);

      // Get current and target positions from decorations
      const currentEl = document.querySelector(`[data-decoration-src='${currentDecoration.src}']`);
      if (currentEl) { // Check if currentEl exists
        const targetStyle = getDecorationStyle(matchingDecoration);

        // Animate position and scale with GSAP
        gsap.to(currentEl, {
          x: targetStyle.left || 0,
          y: targetStyle.top || 0,
          scale: matchingDecoration.scale || 1,
          duration: 1,
          ease: "power2.inOut"
        });
      } else {
        console.warn(`Decoration element for ${currentDecoration.src} not found.`);
      }
    }
  });
};

// Function to retrieve styles based on decoration position from JSON
const getDecorationStyle = (decoration) => {
  const style = {
    position: 'absolute',
    ...decoration.position,
  };
  if (decoration.position.top !== undefined) style.top = `${decoration.position.top}px`;
  if (decoration.position.bottom !== undefined) style.bottom = `${decoration.position.bottom}px`;
  if (decoration.position.left !== undefined) style.left = `${decoration.position.left}px`;
  if (decoration.position.right !== undefined) style.right = `${decoration.position.right}px`;
  if (decoration.position.horizontal === 'center') {
    style.left = '50%';
    style.transform = 'translateX(-50%)';
  }
  if (decoration.position.vertical === 'center') {
    style.top = '50%';
    style.transform = (style.transform || '') + ' translateY(-50%)';
  }
  if (decoration.position.width === 'full') style.width = '100%';
  return style;
};

onBeforeUnmount(() => {
  window.onbeforeunload = null; // Clean up the event listener
});
</script>

<style scoped>

</style>
