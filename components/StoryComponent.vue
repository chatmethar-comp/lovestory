<template>
  <div class="w-full h-44">
    <div class="story-container relative p-4">
      <transition name="fade" mode="out-in">
        <div :key="content.id" class="story-content font-kanit text-lg" v-html="content.content"></div>
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
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>