
<template>
  <!-- Header element with id "home" and CSS classes "container justify-items-center" -->
  <header id="home" class="container justify-items-center">
    <!-- Navigation element with id "Home" and CSS classes "backdrop-blur-3xl flex items-center bg-gradient-to-r from-secondary to rounded-3xl mt-2 mb-2 mr-2 ml-2 justify-between border border-red-600 flex-wrap p-2 z-50" -->
    <nav id="Home" class="backdrop-blur-3xl flex items-center bg-gradient-to-r from-secondary to rounded-3xl mt-2 mb-2 mr-2 ml-2 justify-between border border-red-600 flex-wrap p-2 z-50">
      <!-- Logo and site name section -->
      <div class="flex items-center flex-shrink-0 text-black">
        <!-- Logo image -->
        <img :src="logo" alt="Logo" class="h-8 w-8">
        <!-- Site name -->
        <span class="font-bold text-lg ml-2">SCHIELD CENTRE</span>
      </div>
      <!-- Mobile menu section -->
      <div class="flex items-center flex-wrap">
        <!-- Mobile menu button -->
        <div class="text-lg text-green flex sm:hidden">
          <!-- Button to toggle the mobile menu -->
          <button class="flex items-center px-2 py-1 ml-4 border rounded text-red border-gray-500 hover:text-red hover:border-secondary" @click="toggleMenu">
            <!-- Icon for the mobile menu (bars) -->
            <i class="fas fa-bars" :class="{ 'hidden': isMenuOpen }"></i>
            <!-- Icon for closing the mobile menu (times) -->
            <i class="fas fa-times" v-if="isMenuOpen" :class="{ 'hidden': !isMenuOpen }"></i>
          </button>
          <!-- Mobile menu dropdown content -->
          <div :class="{ 'hidden': !isMenuOpen }" class="absolute top-full right-0 mt-2 bg-gradient-to-l from-secondary to rounded-md">
            <!-- Iterate over links -->
            <template v-for="(link, index) in links" :key="index">
              <!-- If the link has dropdown items -->
              <div v-if="link.dropdownItems">
                <!-- Dropdown toggle button -->
                <a class="block px-4 py-2 hover:text-green-500 transition duration-300 ease-in-out" @click="toggleDropdown(index)">
                  <!-- Icon for the dropdown toggle -->
                  <i class="fas fa-hands-helping mr-1"></i>
                  <!-- Label for the dropdown toggle -->
                  {{ link.label }}
                </a>
                <!-- Dropdown content -->
                <div v-if="link.isOpen" class="dropdown-sublinks">
                  <!-- Iterate over dropdown items -->
                  <template v-for="(dropdownItem, dropdownIndex) in link.dropdownItems">
                    <!-- Dropdown item link -->
                    <a :href="dropdownItem.url" class="block px-4 py-2 hover:text-green-500 transition duration-300 ease-in-out">
                      <!-- Icon for the dropdown item -->
                      <i class="fas fa-donate right mr-1"></i>
                      <!-- Label for the dropdown item -->
                      {{ dropdownItem.label }}
                    </a>
                  </template>
                </div>
              </div>
              <!-- If the link does not have dropdown items -->
              <a v-if="!link.dropdownItems" :href="link.url" class="block px-2 py-2 mt-2 mr-2 mb-2 ml-2 hover:text-green-500 rounded-md transition duration-300 ease-in-out">
                <!-- Icon for the link -->
                <span class="fa-icon-wrapper">
                  <i :class="link.icon"></i>
                </span>
                <!-- Label for the link -->
                {{ link.label }}
              </a>
            </template>
          </div>
        </div>
        <!-- Desktop menu section -->
        <div class="hidden text-lg text-green sm:flex flex-wrap">
          <!-- Iterate over links -->
          <template v-for="(link, index) in links" :key="index">
            <div class="relative">
              <!-- If the link has dropdown items -->
              <a v-if="link.dropdownItems" class="inline-block text-red-500 text-lg mr-4 font-bold hover:text-green-500 hover:bg-accent px-4 py-2 rounded-full" @click="toggleDropdown(index)">
                <!-- Icon for the dropdown toggle -->
                <i class="fas fa-hands-helping mr-1"></i>
                <!-- Label for the dropdown toggle -->
                {{ link.label }}
              </a>
              <!-- Dropdown content -->
              <div v-if="link.dropdownItems && link.isOpen" class="dropdown absolute top-full left-0 mt-2 text-red-500 text-lg font-bold shadow-md rounded-md bg-gradient-to-r from-secondary to-" @click="closeDropdown(index)">
                <!-- Iterate over dropdown items -->
                <template v-for="(dropdownItem, dropdownIndex) in link.dropdownItems" :key="dropdownIndex">
                  <!-- Dropdown item link -->
                  <a :href="dropdownItem.url" class="block px-4 py-2 hover:text-green-500 hover:bg-accent rounded-full transition duration-300 ease-in-out">
                    <!-- Icon for the dropdown item -->
                    <i class="fas fa-donate mr-1"></i>
                    <!-- Label for the dropdown item -->
                    {{ dropdownItem.label }}
                  </a>
                </template>
              </div>
            </div>
            <!-- If the link does not have dropdown items -->
            <a v-if="!link.dropdownItems" :href="link.url" class="text-red-500 text-lg font-bold hover:text-secondary hover:bg-accent px-4 py-2 rounded-full">
              <!-- Icon for the link -->
              <span class="fa-icon-wrapper">
                <i :class="link.icon"></i>
              </span>
              <!-- Label for the link -->
              {{ link.label }}
            </a>
          </template>
        </div>
        <!-- User profile and authentication section -->
        <div>
          <div class="flex items-center space-x-2">
            <!-- User avatar image -->
            <img v-if="status === 'authenticated' && data?.user?.image" class="w-12 h-12 rounded-full" :src="data.user.image" alt="User Avatar">
            <!-- User name -->
            <h1 v-if="status === 'authenticated'" class="text-lg">{{ data?.user?.name }}!</h1>
          </div>
          <!-- Logout button (displayed when authenticated) -->
          <button v-if="status === 'authenticated'" class="flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg py-2 px-3 text-lg" @click="signOut({ callbackUrl: '/' })">
            <span>Logout</span>
          </button>
          <!-- Login button (displayed when not authenticated) -->
          <button v-else class="flex items-center justify-center space-x-2 bg-green-500 text-white rounded-lg py-2 px-3 text-lg" @click="signIn()">
            <!-- Icon for the login button -->
            <i class="fa fa-right-to-bracket pt-0.5"></i>
            <!-- Label for the login button -->
            <span>Login</span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>



<script lang="ts">
import { defineComponent } from 'vue';
import logoImage from '/public/logo.png';
// import { useAuth } from 'your-auth-library'; // Import your authentication library or implement your own logic

export default defineComponent({
  data() {
    return {
      logo: logoImage, // The imported logo image
      isMenuOpen: false, // Flag to track the menu open/close state
       links: [
        { label: 'HOME', url: '/Home', icon: 'fas fa-home' }, // Link to the homepage
        { label: 'BLOG', url: '/News', icon: 'fas fa-newspaper' }, // Link to the blog section
        {
          label: 'SPONSOR',
          url: '#',
          isOpen: false, // Flag to track the dropdown open/close state
          dropdownItems: [
            { label: 'Support a child', url: '/Sponsor', icon: 'fas fa-hands-helping' }, // Dropdown link to support a child
            { label: 'Sponsor a program', url: '/Sponsor-program', icon: 'fas fa-donate' } // Dropdown link to sponsor a program
          ]
        },
        { label: 'TEAM', url: '/protected/OurStaff', icon: 'fas fa-users' }, // Link to the team page
        { label: 'GALLERY', url: '/Gallery', icon: 'fas fa-images' }, // Link to the gallery
        { label: 'FRIENDS of SCHIELD', url: '/protected/Friends', icon: 'fas fa-user-friends' } // Link to the friends section
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Toggles the menu open/close state
    },
    toggleDropdown(index: number) {
      this.links[index].isOpen = !this.links[index].isOpen; // Toggles the dropdown open/close state for the specified index
    },
    closeDropdown(index: number) {
      this.links[index].isOpen = false; // Closes the dropdown for the specified index
    }
  },
  setup() {
    const { status, data, signOut, signIn } = useAuth(); // Use the useAuth function from your authentication library

    return {
      status,
      data,
      signOut,
      signIn
    };
  }
});
</script>