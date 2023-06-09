<script setup lang="ts">
const { status, data, signOut, signIn } = useAuth()
</script>

<template>
  <div class="w-full max-w-5xl mx-auto rounded-t-xl mt-40 shadow-xl">
    <div v-if="status === 'authenticated'" class="space-x-4">
      <Donate />
    </div>
    <div class="backdrop-blur flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent to rounded-t">
      <div class="flex items-center space-x-4">
        <img
          v-if="status === 'authenticated' && data?.user?.image"
          class="w-12 h-12 rounded-full"
          :src="data.user.image"
          alt="User Avatar"
        />
        <div>
          <h1 v-if="status === 'authenticated'" class="text-lg font-bold text-white">Schield's friends {{ data?.user?.name }} is about to donate! logout if you dont want to processed </h1>
          <h1 v-else class="text-lg text-white">Not logged in</h1>
        </div>
      </div>
      <button
        v-if="status === 'authenticated'"
        class="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white rounded-lg py-2 px-3 text-lg"
        @click="signOut({ callbackUrl: '/' })"
      >
        <span>Logout</span>
      </button>
      <button
        v-else
        class="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 focus:bg-green-600 text-white rounded-lg py-2 px-3 text-lg"
        @click="signIn()"
      >
        <i class="fa fa-right-to-bracket pt-0.5"></i>
        <span>Login</span>
      </button>
    </div>
  </div>
</template>

<style>
/* No custom styles needed as Tailwind CSS classes are used */
</style>
