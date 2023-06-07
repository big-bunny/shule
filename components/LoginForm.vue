<template>
  <div>
    <form @submit="handleLogin">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
// import { useAuth } from '#auth'

export default {
  setup() {
    const { signIn } = useAuth()

    const username = ref('')
    const password = ref('')

    async function handleLogin(event) {
      event.preventDefault()
      
      try {
        await signIn('credentials', {
          username: username.value,
          password: password.value,
          callbackUrl: '/protected/friends' // Redirect after successful login
        })
        // Handle successful login, e.g., redirect to a protected page
      } catch (error) {
        // Handle login error, e.g., display an error message
      }
    }

    return {
      username,
      password,
      handleLogin
    }
  }
}
</script>
