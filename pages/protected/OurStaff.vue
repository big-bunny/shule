<script lang="ts">
// Import staff images
import staff1 from '@/static/images/staff/staff1.jpg';
import staff2 from '@/static/images/staff/staff2.jpg';
import staff4 from '@/static/images/staff/staff4.jpg';

// Set page metadata
definePageMeta({ auth: false });

export default {
  props: {
    href: String,
  },
  
  data() {
    // Array of staff members with their details
    const staff = [
      {
        id: 2,
        title: 'HEADTEACHER',
        name: 'Mr. Felix',
        src: staff1,
      },
      // ... other staff members ...
    ];

    return {
      staff,
      selectedStaff: null,
    };
  },
  
  methods: {
    // Show modal with full staff member details
    showModal(staff) {
      this.selectedStaff = staff;
      this.$nextTick(() => {
        this.$refs.title[0].classList.remove('truncate-ovrflow');
      });
    }
  }
};
</script>

<template>
  <section id="child" class="container py-20 border-t border-secondary">
    <div class="mx-auto px-4 text-center sm:px-6 lg:px-8 py-16">
      <h1 class="text-3xl justify-text-center font-extrabold  text-gray-900 inline-block rounded-full px-6 py-2 bg-gradient-to-r from-accent to-secondary">OUR TEAM</h1>
      <!-- <Donate class="mt-25 w-full"/> -->
      <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <!-- Display each staff member -->
        <div v-for="item in staff" :key="item.id" class="bg-accent shadow-lg rounded-lg overflow-hidden">
          <!-- Display staff member image -->
          <img class="h-48 w-full object-cover" :src="item.src" :alt="staff" />
          <div class="p-6">
            <!-- Display staff member name and title -->
            <h2 class="text-xl font-semibold text-gray-900">{{ item.name }}</h2>
            <p class="mt-2 text-green-600">{{ item.title }} </p>
            <!-- Display truncated staff member bio -->
            <p class="text-lg leading-relaxed truncate-overflow" v-html="item.bio" ref="bio"></p>
          
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
