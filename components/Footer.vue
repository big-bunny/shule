<template>
  <footer> <!-- footer container -->
    <nav class="text-gray-800 py-12"> <!-- navigation container -->
      <div class="container flex flex-wrap justify-around items-center"> <!-- flex container -->
        <contact-card />
        <nav class="pb-8 md:pb-0"> <!-- logo container -->
          <img :src="logo" alt="logo" class="mx-auto" width="240" />
        </nav>

        <div class="h-8 py-60 px-1 rounded-full bg-secondary mx-8"></div> <!-- dividing line -->

        <nav class="min-w-full md:min-w-0 md:max-w-1/4 text-primary order-1 md:order-2 pb-8 md:pb-0"> <!-- sub-navigation container -->
          <h4 class="text-center text-lg tracking-wide font-bold pb-4"> <!-- heading -->
            Quick Links
          </h4>
          <!-- quick links with loop using v-for -->
          <a v-for="link in quickLinks" :key="link.label" :href="link.url"
            class="block px-6 py-2 my-2 font-medium bg-accent rounded-full">
            <i class="fas mr-4" :class="link.icon"></i>
            {{ link.label }}
          </a>
        </nav>
      </div>
    </nav>

    <nav class="container text-center text-gray-800 py-12"> <!-- navigation container -->
      <div class="text-xl text-primary pb-4"> <!-- social links container -->
      
      </div>

      <div class=""> <!-- school name and powered by container -->
        &copy; {{ $config.schoolName }}, 2021. Powered by
        <a href="https://g-hub.com" class="font-bold text-primary">G-Hub</a>
      </div>
    </nav>
  </footer>
</template>

<script lang="ts">
import logoImage from '../public/Logo.png';

export default {
  data() {
    return {
      logo: logoImage,

      // Define an array of quick links with their labels, URLs, and icons
      quickLinks: [
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
      ],
      // Define an array of social links with their titles, icons, and hrefs
   
    };
  },
};
</script>



