<template>
  <div class="flex flex-col items-center justify-center mt-80 mb-60  ">
<h1>WELCOME ALL TO SCHIELD CENTRE</h1>
    <div class="flex space-x-4">
      <a href="/Home" class="text-red bg-green-500 hover:bg-accent px-4 py-2 rounded-lg">Get Started</a>
      <div class=" rounded-full flex flex-col justify-center p-2">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <button
            v-if="status === 'authenticated'"
            class="flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg py-2 px-3 text-lg"
            @click="signOut({ callbackUrl: '/' })"
          >
            <span>Logout</span>
          </button>
          <button
            v-else
            class="flex items-center justify-center space-x-2 bg-green-500 text-white rounded-lg py-2 px-3 text-lg"
            @click="signIn()"
          >
            <i class="fa fa-right-to-bracket pt-0.5"></i>
            <span>Login</span>
          </button>
        </div>
      </div>
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
