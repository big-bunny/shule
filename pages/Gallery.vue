<template>
  <section id="child" class="container py-20 border-t border-secondary">
    <div class="mx-auto px-4 text-center sm:px-6 lg:px-8 py-16">
      <!-- Display the heading for the gallery section -->
      <h1 class="text-3xl justify-text-center font-extrabold text-gray-900 inline-block rounded-full px-6 py-2 bg-gradient-to-r from-accent to-secondary">
        GALLERY
      </h1>

      <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <!-- Display each image in the gallery -->
        <div
          v-for="item in gallery"
          :key="item.id"
          class="backdrop-blur-3xl shadow-lg rounded-lg overflow-hidden relative cursor-pointer"
          @click="showModal(item)"
          @mouseover="item.hover = true"
          @mouseout="item.hover = false"
        >
          <div class="relative">
            <!-- Display the image -->
            <img
              class="h-64 w-full object-cover transition duration-500 transform hover:scale-110"
              :src="item.src"
              :alt="item.name"
            />
            <div
              class="absolute inset-0 flex items-center justify-center bg-yellow-400 bg-opacity-50 opacity-0 transition-opacity"
              :class="{ 'opacity-100': item.hover }"
            >
              <!-- Display overlay with image details on hover -->
              <div class="p-4 bg-white rounded-lg">
                <h2 class="text-2xl font-bold mb-2">{{ item.name }}</h2>
                <p class="text-base leading-relaxed text-lg">{{ item.title }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Display each video in the gallery -->
        <div v-for="video in videos" :key="video.title" class="backdrop-blur-3xl shadow-lg rounded-lg overflow-hidden relative">
          <div class="relative h-64">
            <!-- Display the video iframe -->
            <iframe
              :src="video.src"
              frameborder="0"
              class="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- Display the selected image or video in a modal -->
    <div v-if="selectedGallery" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div class="backdrop-blur-3xl p-8 rounded-lg max-w-2xl">
        <!-- Display the selected image or video -->
        <img :src="selectedGallery.src" :alt="selectedGallery.name" class="w-full rounded-lg shadow-lg" />
        <div class="mt-4 text-center">
          <h2 class="text-xl text-secondary font-bold mb-2">{{ selectedGallery.name }}</h2>
          <p class="text-base text-green-500 leading-relaxed">{{ selectedGallery.title }}</p>
        </div>
        <!-- Close button for the modal -->
        <button class="mt-6 py-2 px-4 bg-accent rounded-full bg-red-500 text-secondary font-bold" @click="selectedGallery = null">Close</button>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import staff1 from '@/static/images/staff/staff1.jpg';
import staff2 from '@/static/images/staff/staff2.jpg';
import staff4 from '@/static/images/staff/staff4.jpg';

definePageMeta({ auth: false });
export default {
  props: {
    href: String,
  },
  data() {
    // Array of gallery items (images) with their details
 const gallery = [
      {
        id: 2,
        title: 'HEADTEACHER',
        name: 'Mr. Felix',
        src: staff1,
        hover: false
      },
      {
        id: 1,
        title: 'Vice Principal (Academics)',
        name: 'Mrs Omolo',
        src: staff4,
        hover: false
      },
      {
        id: 3,
        title: 'Vice Principal (Administration)',
        name: 'Mrs Trina',
        src: staff2,
        hover: false
      }
    ];
   // Array of gallery items (vedios) with their details
    const videos = [
      {
        title: 'videos',
        src: 'https://www.youtube.com/embed/playlist?list=PLU_mcNMHvxin46MFUTYinAx7EgGpRTa-0',
      },
      {
        title: 'Shorts',
        src: 'https://www.youtube.com/embed/videoseries?list=PLU_mcNMHvxilz_9XO9xIZ9CHRAej-JPZr',
      }
    ];

    return {
      gallery,
      videos,
      selectedGallery: null,
    };
  },
  methods: {
    // Show modal with selected gallery item
    showModal(item) {
      this.selectedGallery = item;
    },
    // Close the modal
    closeModal() {
      this.selectedGallery = null;
    },
    // Handle clicks outside the modal to close it
    handleClickOutside(event) {
      if (event.target.closest('.bg-white')) return;
      this.closeModal();
    }
  },
  mounted() {
    // Add event listener to handle clicks outside the modal
    window.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    // Remove event listener when the component is unmounted
    window.removeEventListener('click', this.handleClickOutside);
  }
};
</script>
