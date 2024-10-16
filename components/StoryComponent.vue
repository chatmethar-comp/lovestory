<template>
  <div class="w-full h-44">
    <div class="story-container relative items-center justify-center p-4">
      <transition name="fade" mode="out-in">
        <div v-html="currentContent" :key="currentIndex" class="story-content font-kanit text-2xl"></div>
      </transition>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import storyData from '../story.json';
  
  // State to manage story progression
  const currentIndex = ref(0);
  const currentContent = ref('');
  
  // Load story data and start displaying it
  onMounted(() => {
    displayStory();
  });
  
  // Function to update the content based on current index
  const displayStory = () => {
    const storyItem = storyData[currentIndex.value]; // Use imported storyData
  
    if (storyItem && storyItem.type === "normal") {
      currentContent.value = storyItem.content;
  
      // Move to the next story item after a delay (e.g., 2 seconds)
      setTimeout(() => {
        if (currentIndex.value < storyData.length - 1) {
          currentIndex.value++;
          displayStory();
        }
      }, 4000); // Adjust timing as needed
    }
  };
  </script>
  
  <style scoped>
  .story-container {
    text-align: center;
    margin-top: 2rem;
  }
  
  .story-content {
    font-size: 1.5rem;
    line-height: 2rem;
    opacity: 0.9;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  