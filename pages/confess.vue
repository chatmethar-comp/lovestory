<template>
  <div class="confess-container relative h-screen w-screen flex justify-center items-center">

    <!-- Flower Animation Background -->
    <div class="absolute inset-0 z-[-1] overflow-hidden">
      <FlowerAnimation class="flower-animation scale-150 h-full w-full object-cover translate-y-[-25%]" />
    </div>
    
    <!-- Animated Text -->
    <div v-if="showText" class="confession-text transform translate-y-[-350%]">
      <transition name="fade">
        <p :class="getFontClass(currentText.language)">{{ currentText.value }}</p>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FlowerAnimation from '~/components/FlowerAnimation.vue';

definePageMeta({
  middleware: ['passcode']
})

const texts = [
  { language: "en", value: "I love you" },
  { language: "th", value: "ฉันรักเธอ" },
  { language: "jp", value: "愛してる" },
  { language: "fr", value: "Je t'aime" }
];

const currentText = ref(texts[0]);
const showText = ref(false);

const getFontClass = (language) => {
  switch (language) {
    case 'jp':
      return 'font-kosugi text-5xl text-white';
    default:
      return 'font-kanit text-5xl text-white';
  }
};
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