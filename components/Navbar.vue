<template>
  <header id="home" class="container justify-items-center">
    <nav id="Home" class="backdrop-blur-3xl flex items-center bg-gradient-to-r from-secondary to rounded-3xl mt-2 mb-2 mr-2 ml-2 justify-between border border-red-600 flex-wrap p-2 z-50 ">
      <div class="flex items-center flex-shrink-0 text-black">
        <img :src="logo" alt="Logo" class="h-8 w-8">
        <span class="font-bold text-lg ml-2">SCHIELD CENTRE</span>
      </div>
      <div class="flex items-center flex-wrap">
        <div class="text-lg text-green flex sm:hidden">
          <button class="flex items-center px-2 py-1 ml-4 border rounded text-red border-gray-500 hover:text-red hover:border-secondary" @click="toggleMenu">
            <i class="fas fa-bars" :class="{ 'hidden': isMenuOpen }"></i>
            <i class="fas fa-times" v-if="isMenuOpen" :class="{ 'hidden': !isMenuOpen }"></i>
          </button>
          <div :class="{ 'hidden': !isMenuOpen }" class="absolute top-full right-0 mt-2 bg-gradient-to-l from-secondary to rounded-md">
            <template v-for="(link, index) in links" :key="index">
              <div v-if="link.dropdownItems">
                <a class="block px-4 py-2 hover:text-green-500 transition duration-300 ease-in-out" @click="toggleDropdown(index)">
                  <i class="fas fa-chevron-down mr-1"></i>
                  {{ link.label }}
                </a>
                <div v-if="link.isOpen" class="dropdown-sublinks">
                  <template v-for="(dropdownItem, dropdownIndex) in link.dropdownItems">
                    <a :href="dropdownItem.url" class="block px-4 py-2 hover:text-green-500 transition duration-300 ease-in-out">
                      <i class="fas fa-chevron-right mr-1"></i>
                      {{ dropdownItem.label }}
                    </a>
                  </template>
                </div>
              </div>
              <a v-if="!link.dropdownItems" :href="link.url" class="block px-2 py-2 mt-2 mr-2 mb-2 ml-2 hover:text-green-500 rounded-md transition duration-300 ease-in-out">
                <span class="fa-icon-wrapper">
                  <i :class="link.icon"></i>
                </span>
                {{ link.label }}
              </a>
            </template>
          </div>
        </div>
        <div class="hidden text-lg text-green sm:flex flex-wrap">
          <template v-for="(link, index) in links" :key="index">
            <div class="relative">
              <a v-if="link.dropdownItems" class="inline-block text-red-500 text-lg mr-4 font-bold hover:text-secondary hover:bg-accent px-4 py-2 rounded-full" @click="toggleDropdown(index)">
                <i class="fas fa-chevron-down mr-1"></i>
                {{ link.label }}
              </a>
              <div v-if="link.dropdownItems && link.isOpen" class="dropdown absolute top-full left-0 mt-2 text-red-500 text-lg font-bold shadow-md rounded-md bg-gradient-to-r from-secondary to-" @click="closeDropdown(index)">
                <template v-for="(dropdownItem, dropdownIndex) in link.dropdownItems" :key="dropdownIndex">
                  <a :href="dropdownItem.url" class="block px-4 py-2 hover:text-green-500 transition duration-300 ease-in-out">
                    <i class="fas fa-chevron-right mr-1"></i>
                    {{ dropdownItem.label }}
                  </a>
                </template>
              </div>
            </div>
            <a v-if="!link.dropdownItems" :href="link.url" class="text-red-500 text-lg font-bold hover:text-secondary hover:bg-accent px-4 py-2 rounded-full">
              <span class="fa-icon-wrapper">
                <i :class="link.icon"></i>
              </span>
              {{ link.label }}
            </a>
          </template>
        </div>
        <div>
          <div class="flex items-center space-x-2">
            <img v-if="status === 'authenticated' && data?.user?.image" class="w-12 h-12 rounded-full" :src="data.user.image" alt="User Avatar">
            <h1 v-if="status === 'authenticated'" class="text-lg">{{ data?.user?.name }}!</h1>
          </div>
          <button v-if="status === 'authenticated'" class="flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg py-2 px-3 text-lg" @click="signOut({ callbackUrl: '/' })">
            <span>Logout</span>
          </button>
          <button v-else class="flex items-center justify-center space-x-2 bg-green-500 text-white rounded-lg py-2 px-3 text-lg" @click="signIn()">
            <i class="fa fa-right-to-bracket pt-0.5"></i>
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