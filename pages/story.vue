<template>
  <div class="bg-white h-screen" @click="handleStoryClick">
    <div
      class="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto relative bg-cover bg-center overflow-hidden"
      :style="{ backgroundImage: currentContent ? `url(/images/story_bg/${currentContent.background || 'story_default.png'})` : '' }"
    >
      <div class="flex flex-col justify-center items-center h-full relative">
        <StoryComponent v-if="currentContent" :content="currentContent" class="p-6" />
      </div>

      <!-- Loop through decorations and add classes for animations -->
      <div
        v-if="currentContent && currentContent.decoration"
        v-for="(decoration, index) in currentContent.decoration"
        :key="index"
        :style="getDecorationStyle(decoration)"
        class="absolute decoration"
        :class="{
          'animate-book': decoration.src === 'book.png',
          'animate-girl': decoration.src === 'girl_drawing_1.png',
          'animate-keyboard': decoration.src === 'keyboard_work.png',
          'animate-rabbit': decoration.src === 'rabbit_river.png',
          'animate-rapunzel': decoration.src === 'rapunzel_1.png',
          'animate-star': decoration.src === 'star_1.png',
          'animate-night': decoration.src === 'night.png',
          'animate-sun': decoration.src === 'sun.png'
        }"
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

onMounted(() => {
  currentContent.value = storyDataWithId[currentIndex.value];
  animateDecorationsIn(); // Animate in decorations on initial load
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

// Entrance Animation
const animateDecorationsIn = async () => {
  await nextTick(); // Ensure DOM updates

  // Target elements by their classes
  const bookEl = document.querySelector('.animate-book');
  const girlEl = document.querySelector('.animate-girl');
  const keyboardEl = document.querySelector('.animate-keyboard');
  const rabbitEl = document.querySelector('.animate-rabbit');
  const rapunzelEl = document.querySelector('.animate-rapunzel');
  const starEl = document.querySelector('.animate-star');
  const nightEl = document.querySelector('.animate-night');
  const sunEl = document.querySelector('.animate-sun');

  if (bookEl) {
    gsap.fromTo(bookEl, { y: 200, opacity: 0 }, { y: 30, opacity: 1, duration: 1, ease: "power2.out" });
  }

  if (girlEl) {
    gsap.fromTo(girlEl, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power2.out" });
  }

  if (keyboardEl) {
    gsap.fromTo(keyboardEl, { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" });
  }
  
  if (rabbitEl) {
    gsap.fromTo(rabbitEl, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power2.out" });
  }

  if (rapunzelEl) {
    gsap.fromTo(rapunzelEl, { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power2.out" });
  }

  if (starEl) {
    gsap.fromTo(starEl, { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" });
  }

  if (nightEl) {
    gsap.fromTo(nightEl, { y: -200, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" });
  }

  if (sunEl) {
    gsap.fromTo(sunEl, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" });
  }
};

// Exit Animation
const animateDecorationsOut = () => {
  return new Promise((resolve) => {
    // Target elements by their classes
    const bookEl = document.querySelector('.animate-book');
    const girlEl = document.querySelector('.animate-girl');
    const keyboardEl = document.querySelector('.animate-keyboard');
    const rabbitEl = document.querySelector('.animate-rabbit');
    const rapunzelEl = document.querySelector('.animate-rapunzel');
    const starEl = document.querySelector('.animate-star');
    const nightEl = document.querySelector('.animate-night');
    const sunEl = document.querySelector('.animate-sun');

    const timeline = gsap.timeline({ onComplete: resolve }); // Resolve after animation completes

    if (bookEl) {
      timeline.to(bookEl, { y: 200, opacity: 0, duration: 1, ease: "power2.in" });
    }

    if (girlEl) {
      timeline.to(girlEl, { x: 200, opacity: 0, duration: 1, ease: "power2.in" }, "<"); // "<" for simultaneous animation
    }

    if (keyboardEl) {
      timeline.to(keyboardEl, { y: -200, opacity: 0, duration: 1, ease: "power2.in" }, "<");
    }
    
    if (rabbitEl) {
      timeline.to(rabbitEl, { x: 200, opacity: 0, duration: 1, ease: "power2.in" }, "<");
    }

    if (rapunzelEl) {
      timeline.to(rapunzelEl, { x: -200, opacity: 0, duration: 1, ease: "power2.in" }, "<");
    }

    if (starEl) {
      timeline.to(starEl, { y: -200, opacity: 0, duration: 1, ease: "power2.in" }, "<");
    }

    if (nightEl) {
      timeline.to(nightEl, { y: -200, opacity: 0, duration: 1, ease: "power2.in" }, "<");
    }

    if (sunEl) {
      timeline.to(sunEl, { y: 200, opacity: 0, duration: 1, ease: "power2.in" }, "<");
    }
  });
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

onBeforeUnmount(() => {
  window.onbeforeunload = null;
});
</script>
