<template>
  <div class="w-full h-44" >
    <div class="story-container relative items-center justify-center p-4">
      <transition name="fade" mode="out-in">
        <div :key="content.id" class="story-content font-kanit text-lg">{{ content.content }}</div>
      </transition>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.story-container {
  text-align: center;
  margin-top: 2rem;
}

  
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>