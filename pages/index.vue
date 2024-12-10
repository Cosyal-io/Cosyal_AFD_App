<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#1E2527] to-[#2C3539] flex flex-col items-center justify-between p-4 md:p-8 relative overflow-hidden"
  >
    <!-- Logo Section -->
    <div class="w-full flex justify-center mb-16 mt-8 px-4">
      <div class="relative w-[400px] h-[100px]">
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
      class="flex flex-col md:flex-row gap-8 items-center justify-center mb-16 z-10"
    >
      <NuxtLink to="/projects">
        <button
          class="text-[#1E2527] bg-gradient-to-r from-[#C5D82D] to-[#D6E93D] hover:from-[#b1c229] hover:to-[#c2d435] text-5xl px-2 py-0.5 rounded-full w-64 h-32 flex items-center justify-center transform transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Projets
        </button>
      </NuxtLink>
      <button
        @click="navigateTo('/acheteurs')"
        class="text-white bg-gradient-to-r from-[#F15A24] to-[#F47B51] hover:from-[#d94f1f] hover:to-[#e56e46] text-5xl px-2 py-0.5 rounded-3xl w-64 h-24 flex items-center justify-center transform transition-all duration-300 hover:scale-105 shadow-lg"
      >
        Acheteurs
      </button>
    </div>

    <!-- Footer Section -->
    <div class="w-full max-w-4xl flex flex-col items-center gap-6 z-10">
      <p
        class="text-white text-center text-lg font-light leading-relaxed pb-10"
      >
        Cosyal transpose numériquement les exigences de haute intégrité des
        meilleurs acteurs de la Finance Climat
      </p>
    </div>

    <!-- Decorative Leaf -->
    <div
      class="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 transition-opacity duration-500 ease-in-out hover:opacity-20"
    >
      <img src="/leaf.png" alt="Decorative Leaf" class="h-auto w-[400px]" />
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
