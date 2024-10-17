<template>
  <div class="w-full h-44" >
    <div class="story-container relative items-center justify-center p-4">
      <transition name="fade" mode="out-in">
        <div :key="content.id" class="story-content font-kanit text-2xl">{{ content.content }}</div>
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