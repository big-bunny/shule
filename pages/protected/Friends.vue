<template>
  <div>
    <Donate />
  </div>
</template>

<script>
export default {
  middleware({ redirect }) {
    if (!loggedIn) { // Replace "loggedIn" with your own condition to check if the user is logged in
      return redirect('/login'); // Redirect to the login page if not logged in
    }
  },

  // ...
}
</script>
