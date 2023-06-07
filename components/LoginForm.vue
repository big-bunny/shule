<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col items-center mt-8">
    <input v-model="email" type="email" placeholder="Email" class="w-64 px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
    <input v-model="password" type="password" placeholder="Password" class="w-64 px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
    <button type="submit" class="w-64 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign in</button>
  </form>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      email: '',
      password: '',
    });

    const handleSubmit = async () => {
      console.log('form submitted');
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: state.email,
            password: state.password,
          }),
        });

        if (response.ok) {
          const user = await response.json();
          
          console.log('User signed in:', user);
        } else {
          alert('Invalid email or password');
        }
      } catch (error) {
        console.error(error);
        alert('An error iko occurred');
      }
    };

    return {
      ...state,
      handleSubmit,
    };
  },
};
</script>
