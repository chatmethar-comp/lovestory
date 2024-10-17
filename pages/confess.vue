<template>
    <div>
      <FlowerAnimation />
    </div>
</template>

<script setup>
import FlowerAnimation from '~/components/FlowerAnimation.vue';

definePageMeta({
  middleware: ['passcode']
})
</script>

<style scoped>

</style>