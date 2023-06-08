<template>
  <div class="min-h-screen items-center justify-center flex flex-col bg-[url('/images/backdrop.jpg')] bg-cover bg-center">
    <Navbar class=" z-50 fixed w-full top-0" /> <!-- Set the navbar height to 16px -->
    <div class="flex flex-col items-center justify-center flex-grow">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
// Your script logic goes here
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
