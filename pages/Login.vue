<template>
  <section class="bg-accent rounded-80 min-h-screen flex items-center mt-30 justify-center">
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Welcome to Schield Centre</h1>
      <div class="flex flex-col space-y-4">
        <Providers v-for="provider in providers" :key="provider.id" :provider-name="provider.name" />
      </div>
      <div class="flex items-center mt-4">
        <div class="flex-grow bg-gray-300 h-px"></div>
        <p class="mx-4 text-gray-500">or</p>
        <div class="flex-grow bg-gray-300 h-px"></div>
      </div>

      <LoginForm />
    </div>
  </section>
</template>
<script setup lang="ts">
const { data: providers } = await useFetch('/api/auth/providers')
</script>