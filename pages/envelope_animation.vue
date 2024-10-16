<template>
    <div class="bg-white h-screen">
      <div class="flex flex-col items-center justify-center min-h-screen bg-softpink max-w-md mx-auto relative fade-in-animation">
        <!-- Envelope Image Section -->
        <div class="mb-52">
          <div class="relative w-fit h-auto">
            <img :src="envelope" alt="Letter" class="w-fit h-auto transition-transform transform scale-125 opacity-0 fade-in"/>
            <img :src="waxSeal" alt="Wax" class="absolute top-80 left-64 w-fit h-auto rotate-12"/>
          </div>
        </div>
  
        <!-- Bottom Flower Image (will move away) -->
        <div class="absolute bottom-0 w-full flower-move-out">
          <img :src="flower" alt="Flower" class="w-full h-auto"/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  import envelope from '@/assets/images/envelope_open.png';
  import waxSeal from '@/assets/images/k_wax_seal.png';
  import flower from '@/assets/images/ripped_flower_01 1.png';

  definePageMeta({
    middleware: ['passcode']
  })
  
  const router = useRouter();
  
  onMounted(() => {
    setTimeout(() => {
      router.push('/story');
    }, 5000);
  });
  </script>
  
  <style scoped>
  /* Envelope fade-in animation */
  .fade-in {
    animation: fadeIn 0.5s ease-in forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Flower moving out of frame animation */
  .flower-move-out {
    animation: moveOut 2s ease-in forwards;
    animation-delay: 0.5s;
  }
  
  @keyframes moveOut {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
  
  /* Fade-in animation for the whole container */

  </style>
  