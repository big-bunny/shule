<script setup lang="ts">
  // Define the props for the component
  defineProps({
    providerName: String
  })

  // Import the signIn function from the useAuth() hook
  const { signIn } = useAuth()
</script>

<template>
  <!-- Button element for logging in with a specific provider -->    
  <!-- Trigger the signIn function when the button is clicked, passing the lowercase providerName as an argument -->
  <button
    class="flex items-center border border-gray-500 px-4 py-2 rounded-lg text-gray-500 text-sm font-medium hover:text-black hover:bg-gray-100"

    @click="signIn(providerName?.toLocaleLowerCase())"
  >
    <!-- Display the provider name in the button label -->
    Log in with {{ providerName }}
  </button>
</template>
