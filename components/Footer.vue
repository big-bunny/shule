<template>
  <footer> <!-- footer container -->
    <nav class="text-gray-800 py-12"> <!-- navigation container -->
      <div class="container flex flex-wrap justify-around items-center"> <!-- flex container -->
        <contact-card class="rounded-full"/>
        <nav class="pb-8 md:pb-0"> <!-- logo container -->
          <img :src="logo" alt="logo" class="mx-auto" width="240" />
        </nav>
        <nav class="min-w-full md:min-w-0 items-center md:max-w-1/4 text-primary order-1 md:order-2 pb-8 md:pb-0"> <!-- sub-navigation container -->
          <h4 class="text-center text-lg tracking-wide font-bold pb-4"> <!-- heading -->
            Quick Links
          </h4>
          <!-- quick links with loop using v-for -->
          <div class="flex flex-col items-center"> <!-- Center the quick links -->
            <a v-for="link in quickLinks" :key="link.label" :href="link.url"
              class="block px-6 py-2 my-2 font-medium bg-accent rounded-full">
              <i class="fas mr-4" :class="link.icon"></i>
              {{ link.label }}
            </a>
          </div>
        </nav>
      </div>
    </nav>

    <nav class="container text-center text-gray-800 py-12"> <!-- navigation container -->
      <div class="text-xl text-primary pb-4"> <!-- social links container -->
      
      </div>

      <div class="text-green-500"> <!-- school name and powered by container -->
        &copy; {{ $config.schoolName }}, 2021. Powered by
        <a href="https://g-hub.com" class="font-bold text-primary">G-Hub</a>
      </div>
    </nav>
  </footer>
</template>


<script lang="ts">
import logoImage from '../public/logo.png';

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
          url: '/protected/Friends',
       
        },
        { label: 'TEAM', url: '/protected/OurStaff', icon: 'fas fa-users' }, // Link to the team page
        { label: 'GALLERY', url: '/Gallery', icon: 'fas fa-images' }, // Link to the gallery
        { label: 'PROFILE', url: '/protected/Friends', icon: 'fas fa-user-friends' } // Link to the friends section
      ],
      // Define an array of social links with their titles, icons, and hrefs
   
    };
  },
};
</script>



