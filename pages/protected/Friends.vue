<script setup lang="ts">
  // Import and destructure variables from the useAuth module
  const { status, data, signOut, signIn } = useAuth()
</script>

<template>
<section class="mt-20">
<div v-if="status === 'authenticated'" class="">
      <Donate />
    </div>
<section>
  <!-- Container div with width, maximum width, center alignment, and styling -->
  <div class="w-full max-w-5xl mx-auto rounded-t-xl mt-30 shadow-xl">
    <!-- Display the Donate component if the user is authenticated -->
    
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
        />
        <div v-if="status === 'authenticated'">
          <p class="text-green-500 bg-gradient-to-r from-secondary to-accent p-2 rounded-lg transition-all hover:scale-105">
            <strong>Name:</strong> {{ data?.user?.name }}
          </p>
          <p class="text-green-500 bg-gradient-to-r from-secondary to-accent p-2 rounded-lg transition-all hover:scale-105 mt-2">
            <strong>Email:</strong> {{ data?.user?.email }}
          </p>
       
        </div>
        <div v-else>
          <p>Please log in</p>
        </div>
        <div>
          <!-- Display user name if authenticated -->
          <h1 v-if="status === 'authenticated'" class="text-lg font-bold text-red-500">
            Schield's friends {{ data?.user?.name }} is about to donate! Logout if you don't want to proceed.
          </h1>
          <!-- Display "Not logged in" if not authenticated -->
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
  </section>
  </section>
</template>



<style>
/* No custom styles needed as Tailwind CSS classes are used */
</style>
