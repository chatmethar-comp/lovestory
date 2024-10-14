<script setup>
const MOCK_API = 'https://670abcf9ac6860a6c2ca5bd3.mockapi.io'
const { data } = await useFetch(`${MOCK_API}/users`)
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-gray-900 sm:text-3xl md:text-2xl lg:text-xl xl:text-lg">Hello world</h1>
    <ul class="mt-4 space-y-2">
      <li v-for="user in data" :key="user.id" class="p-4 bg-white rounded shadow-md">
      <div class="text-lg font-semibold text-gray-800">{{ user.id }} - {{ user.name }}</div>
      <div class="text-sm text-gray-600">{{ user.email }}</div>
      </li>
    </ul>
  </div>
</template>
