<template>
  <!-- Main container with flex and backdrop blur styles -->
  <div class="flex flex-col backdrop-blur-2xl items-center justify-center mt-80 mb-60">
    <!-- Conditional rendering based on logged-in status -->
    <p v-if="loggedIn" class="text-lg text-secondary mt-4">You are signed in! Feel free to proceed.</p>
    <p v-else class="text-4xl font-bold text-accent mt-4">Welcome Schield's friend to Schield Center. Please sign in to continue.</p>
    <div class="flex space-x-4">
      <!-- "Get Started" button -->
      <a href="/Home" class="flex items-center justify-center rounded-full space-x-2 bg-green-500 text-white py-2 px-3 text-lg">Get Started</a>
      <div class="rounded-full flex flex-col justify-center p-2">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <!-- Conditional rendering of sign-in or sign-out button -->
          <button
            v-if="loggedIn"
            class="flex items-center justify-center rounded-full space-x-2 bg-red-500 text-white py-2 px-3 text-lg"
            @click="handleSignOut"
          >
            <span>Logout</span>
          </button>
          <button
            v-else
            class="flex items-center justify-center rounded-full space-x-2 bg-green-500 text-white py-2 px-3 text-lg"
            @click="handleSignIn"
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
  setup() {
    // Import and use the useAuth function from your auth library
    const { status, signIn, signOut } = useAuth();

    // Compute the logged-in status based on the authentication status
    const loggedIn = computed(() => status.value === 'authenticated');

    // Handle sign-in action
    async function handleSignIn() {
      await signIn('primaryOptions');
    }

    // Handle sign-out action
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


