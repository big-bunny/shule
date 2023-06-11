<script setup lang="ts">
// Import and destructure variables from the useAuth module
const { status, data, signOut, signIn } = useAuth()
</script>


<template>
  <!-- Container div with width, maximum width, center alignment, and styling -->
  <div class="w-full max-w-5xl mx-auto rounded-t-xl mt-40 shadow-xl">
    <!-- Display the Donate component if the user is authenticated -->
    <div v-if="status === 'authenticated'" class="space-x-4">
      <Donate />
    </div>
    <!-- Header section with backdrop blur effect and gradient background -->
    <div class="backdrop-blur flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent to rounded-t">
      <!-- Flex container with item alignment and spacing -->
      <div class="flex items-center space-x-4">
        <!-- Display user avatar if authenticated and available -->
        <img
          v-if="status === 'authenticated' && data?.user?.image"
          class="w-12 h-12 rounded-full"
          :src="data.user.image"
          alt="User Avatar"
        />     <div v-if="status === 'authenticated'">
          <p><strong>Name:</strong> {{ data?.user?.name }}</p>
          <p><strong>Email:</strong> {{ data?.user?.email }}</p>
          <p><strong>Role:</strong> {{ data?.user?.role }}</p>
        </div>
        <div v-else>
          <p>Please log in to view user information.</p>
        </div>
        <div>
          <!-- Display user name if authenticated -->
          <h1 v-if="status === 'authenticated'" class="text-lg font-bold text-white">Schield's friends {{ data?.user?.name }} is about to donate! logout if you dont want to processed </h1>
          <!-- Display "Not logged in" if not authenticated -->
          <h1 v-else class="text-lg text-white">Not logged in</h1>
        </div>
      </div>


      <!-- Logout button if authenticated -->
      <button
        v-if="status === 'authenticated'"
        class="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white rounded-lg py-2 px-3 text-lg"
        @click="signOut({ callbackUrl: '/' })"
      >
        <span>Logout</span>
      </button>
      <!-- Login button if not authenticated -->
      <button
        v-else
        class="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 focus:bg-green-600 text-white rounded-lg py-2 px-3 text-lg"
        @click="signIn()"
      >
        <!-- Right-to-bracket icon -->
        <i class="fa fa-right-to-bracket pt-0.5"></i>
        <span>Login</span>
      </button>
    </div>
  </div>
</template>


<style>
/* No custom styles needed as Tailwind CSS classes are used */
</style>
