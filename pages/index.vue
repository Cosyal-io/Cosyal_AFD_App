<template>
  <div
    class="min-h-screen bg-stone-700 flex flex-col items-center justify-between p-4 md:p-8 relative overflow-hidden"
    style="
      background-image: url('/bg.png');
      background-size: cover;
      background-position: center;
    "
  >
    <!-- Logo Section -->
    <div class="w-full flex justify-center px-4">
      <div class="relative w-[800px] h-[300px]">
        <!-- PNG logo -->
        <img
          src="/logo-white-cosyal.png"
          alt="Cosyal Logo"
          class="absolute inset-0 w-full h-full object-contain"
          @error="handleImageError"
        />
      </div>
    </div>

    <!-- Buttons Section -->
    <div
      class="flex flex-col md:flex-row gap-8 items-center justify-center z-10"
    >
      <NuxtLink to="/projects">
        <img src="/projets_button.png" alt="Projets" class="w-96 h-auto
        rounded-xl transform transition-all duration-300 hover:scale-105"
      </NuxtLink>
      <NuxtLink to="/projects">
        <img src="/acheteurs_bouton.png" alt="Projets" class="w-96 h-auto
        rounded-xl transform transition-all duration-300 hover:scale-105"
      </NuxtLink>
    </div>

    <!-- Footer Section -->
    <div class="w-full max-w-4xl flex flex-col items-center gap-6 z-10">
      <p
        class="text-white text-center text-lg font-light leading-relaxed mb-40"
      >
        Cosyal transpose numériquement les exigences de haute intégrité des
        meilleurs acteurs de la Finance Climat
      </p>
    </div>

    <!-- Environmental Metrics Button -->
    <div
      class="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-gray-200 bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-md px-3 py-2 shadow-md transition-all duration-300 hover:bg-opacity-100 hover:shadow-lg"
    >
      <img src="/xrp-icon.png" alt="XRP Icon" class="h-6 w-6" />
      <div class="text-xs">
        <div>Environmental metrics</div>
        <div class="font-bold">XRP LEDGER</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const handleImageError = (e) => {
  console.error("PNG logo failed to load:", e.target.src);
  e.target.style.display = "none";
};

const navigateTo = (path) => {
  console.log(`Navigating to: ${path}`);
  // In a real application, you would use Vue Router here
  // this.$router.push(path)
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

body {
  font-family: "Poppins", sans-serif;
}
</style>
