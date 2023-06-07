<template>
  <div class="mt-40 shadow-xl bg-white px-5 py-4 rounded-t">  
     <Donate />
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <img
          v-if="status === 'authenticated' && data?.user?.image"
          class="w-12 h-12 rounded-full"
          :src="data.user.image"
          alt="User Avatar"
        />
        <h1 v-if="status === 'authenticated'" class="text-lg">
          Authenticated as {{ data?.user?.name }}!
        </h1>
        <h1 v-else class="text-lg">
          Not logged in
        </h1>
      </div>
   
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">User Information</h2>
        <div v-if="status === 'authenticated'">
          <p><strong>Name:</strong> {{ data?.user?.name }}</p>
          <p><strong>Email:</strong> {{ data?.user?.email }}</p>
          <p><strong>Role:</strong> {{ data?.user?.role }}</p>
        </div>
        <div v-else>
          <p>Please log in to view user information.</p>
        </div>
      </div>
    </div>

    <div class="mt-4">
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
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { status, data, signOut, signIn } = useAuth();
</script>
