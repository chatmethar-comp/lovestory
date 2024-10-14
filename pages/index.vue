<template>
  <div class="bg-white h-screen">
    <div class="flex flex-col items-center justify-center min-h-screen bg-softpink max-w-md mx-auto relative">
      <!-- Top Section: Title -->
      <div class="text-center mb-6">
        <h1 class="font-kanit text-4xl font-semibold text-lovestory-700 mb-2 leading-custom">โปรดใส่รหัสผ่าน</h1>        
        <p class="font-kanit text-2xl font-semibold text-lovestory-600">วันเกิดของคุณ</p>
      </div>

      <!-- Middle Section: Input Fields -->
      <PasswordInput />

      <!-- Envelope Image Section -->
      <div class="mb-52 ">
        <div class="relative w-fit h-auto">
          <img :src="envelope" alt="Letter" class="w-fit h-auto"/>
          <img :src="waxSeal" alt="Wax" class="absolute top-32 left-36 w-fit h-auto"/>
          <img :src="toSeal" alt="To" class="absolute top-28 left-40 w-fit h-auto"/>
        </div>
      </div>

      <!-- Bottom Flower Image -->
      <div class="absolute bottom-0 w-full">
        <img :src="flower" alt="Flower" class="w-full h-auto"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import envelope from '@/assets/images/envelope.png';
import waxSeal from '@/assets/images/k_wax_seal.png';
import toSeal from '@/assets/images/To Patitta C..png';
import flower from '@/assets/images/ripped_flower_01 1.png';
</script>

<style scoped>
/* You may not need additional styles if everything is handled by Tailwind */
</style>
