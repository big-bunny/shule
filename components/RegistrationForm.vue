<template>
    <div>
 
      <form @submit="handleRegister">
        <input type="text" v-model="newUsername" placeholder="New Username" />
        <input type="password" v-model="newPassword" placeholder="New Password" />
        <button type="submit">Register</button>
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
 
      handleRegister() {
        fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.newUsername, password: this.newPassword }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the registration request
            console.log(data);
          })
          .catch((error) => {
            // Handle any error that occurred during the registration request
            console.error(error);
          });
      },
    },
  };
  </script>
  