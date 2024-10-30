<template>
  <div class="bg-white h-screen" @click="handleStoryClick">
    <div
      class="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto relative bg-cover bg-center overflow-hidden"
      :style="{ backgroundImage: currentContent ? `url(/images/story_bg/${currentContent.background || 'story_default.png'})` : '' }"
    >
      <div class="flex flex-col justify-center items-center h-full relative">
        <StoryComponent v-if="currentContent" :content="currentContent" class="p-6" />
      </div>

      <!-- Loop through decorations and add classes for animations dynamically based on src -->
      <div
        v-if="currentContent && currentContent.decoration"
        v-for="(decoration, index) in currentContent.decoration"
        :key="index"
        :style="getDecorationStyle(decoration)"
        class="absolute decoration"
        :class="`animate-${decoration.src.split('.')[0]}`"
      >
        <img :src="`/images/decoration/${decoration.src}`" :alt="decoration.src" />
      </div>
    </div>
    <BGMusic />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import StoryComponent from '../components/StoryComponent.vue';
import storyData from '@/story.json';

definePageMeta({
  middleware: ['passcode']
});

const storyDataWithId = storyData.map((item, index) => ({
  ...item,
  id: index,
}));

const currentIndex = ref(0);
const currentContent = ref(null);
const nextContent = ref(null);

onMounted(() => {
  currentContent.value = storyDataWithId[currentIndex.value];
  animateDecorationsIn(); // Animate in decorations on initial load
  window.onbeforeunload = () => {
    return "ต้องการออกจากหน้านี้จริงๆหรอ";
  };
});

const handleStoryClick = async () => {
  await animateDecorationsOut(); // Wait for exit animation
  nextStory();
  animateDecorationsIn(); // Animate in decorations for the new story
};

const nextStory = () => {
  currentIndex.value = (currentIndex.value + 1) % storyDataWithId.length;
  currentContent.value = storyDataWithId[currentIndex.value];
};

// Reusable function to animate elements in from a specified direction
const animateInFrom = (element, direction) => {
  const startPosition = { opacity: 0 };
  if (direction === 'top') startPosition.y = -200;
  if (direction === 'bottom') startPosition.y = 200;
  if (direction === 'left') startPosition.x = -200;
  if (direction === 'right') startPosition.x = 200;

  gsap.fromTo(
    element,
    startPosition,
    { x: 0, y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
  );
};

// Reusable function to animate elements out to a specified direction
const animateOutTo = (element, direction) => {
  const endPosition = { opacity: 0 };
  if (direction === 'top') endPosition.y = -200;
  if (direction === 'bottom') endPosition.y = 200;
  if (direction === 'left') endPosition.x = -200;
  if (direction === 'right') endPosition.x = 200;

  return gsap.to(element, { ...endPosition, duration: 1, ease: 'power2.in' });
};

// Entrance Animation
const animateDecorationsIn = async () => {
  await nextTick(); // Ensure DOM updates

  currentContent.value.decoration.forEach((decoration) => {
    const element = document.querySelector(`.animate-${decoration.src.split('.')[0]}`);
    if (element) {
      const direction = decoration.animation?.in || 'bottom'; // Default to 'bottom' if not specified
      animateInFrom(element, direction);
    }
  });
};

// Exit Animation
const animateDecorationsOut = () => {
  return new Promise((resolve) => {
    const timeline = gsap.timeline({ onComplete: resolve });

    currentContent.value.decoration.forEach((decoration) => {
      const element = document.querySelector(`.animate-${decoration.src.split('.')[0]}`);
      if (element) {
        const direction = decoration.animation?.out || 'bottom'; // Default to 'bottom' if not specified
        timeline.add(animateOutTo(element, direction), '<');
      }
    });
  });
};

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
    console.log(decoration.src)
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
  window.onbeforeunload = null;
});
</script>
