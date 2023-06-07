<template>
  <div class="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-fixed" style="background-image: url('/path/to/cover-image.jpg')">
    <h1 class="text-4xl text-white font-bold mb-6">Welcome to Schield Centre</h1>
    <div class="flex space-x-4">
      <a href="/Home" class="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Get Started</a>
      <div class=" bg-accent rounded-full flex flex-col justify-center p-2">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <button
        v-if="loggedIn"
        @click="handleSignOut"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign out
      </button>
      <button
        v-else
        @click="handleSignIn"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign in
      </button>
    </div>
  </div>
      <!-- <a href="/Register" class="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Register as Schield's Friend</a> -->
    </div>
  </div>
</template>
<script lang="ts">

export default {
  // Component code
  setup() {
    const { status, signIn, signOut } = useAuth(); // Use the useSession function
    
    const loggedIn = computed(() => status.value === 'authenticated');
    
    async function handleSignIn() {
      await signIn('primaryOptions');
    }
     async function handleSignOut() {
      await signOut();
     }

    return {
      status,
      signIn,
      signOut,
      loggedIn,
      handleSignIn,
      handleSignOut
    };
  },
};
</script>
<style>
/* Tailwind CSS classes are applied directly, no additional comments needed */
</style>
