<template>
  <div>
    <form @submit="handleSignIn">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
 
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
    };
  },
  methods: {
    handleSignIn() {
      fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the sign-in request
          console.log(data);
        })
        .catch((error) => {
          // Handle any error that occurred during the sign-in request
          console.error(error);
        });
    },
  
  },
};
</script>
