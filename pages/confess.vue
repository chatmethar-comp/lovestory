<template>
  <div class="confess-container relative h-screen w-screen flex justify-center items-center">

    <!-- Flower Animation Background -->
    <div class="absolute inset-0 z-[-1] overflow-hidden">
      <FlowerAnimation class="flower-animation scale-150 h-full w-full object-cover translate-y-[-25%]" />
    </div>
    
    <!-- Animated Text -->
    <div v-if="showText" class="confession-text transform translate-y-[-350%]">
      <transition name="fade">
        <p :class="[isJapanese(currentText) ? 'font-kosugi' : 'font-kanit', 'text-5xl', 'text-white']">{{ currentText }}</p>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FlowerAnimation from '~/components/FlowerAnimation.vue';

const texts = [
  "I love you",
  "ฉันรักเธอ",
  "愛してる",
  "Je t'aime"
];

const currentText = ref(texts[0]);
const showText = ref(false);

const isJapanese = (text) => /[\u3040-\u30ff\u4e00-\u9faf]/.test(text);

onMounted(() => {
  setTimeout(() => {
    showText.value = true;
    
    let index = 0;
    setInterval(() => {
      index = (index + 1) % texts.length;
      currentText.value = texts[index];
    }, 4000);
  }, 5000);
});
</script>

<style scoped>
.confess-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.confession-text {
  font-size: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 0;
  padding: 0 1rem;
  animation: fade-in-out 4s infinite;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes fade-in-out {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

</style>