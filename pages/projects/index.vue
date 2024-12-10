<template>
  <div class="min-h-screen bg-gradient-to-br from-[#1E2527] to-[#141a1c] relative overflow-hidden">
    <!-- Projects Badge -->
    <div class="absolute top-8 left-8 z-10">
      <div class="bg-[#C5D82D] text-[#1E2527] text-4xl px-12 py-4 rounded-full transform hover:scale-105 transition-all shadow-xl">
        Projets
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-8 pt-32 pb-16 relative z-10">
      <!-- Main Heading -->
      <h1 class="text-white text-5xl font-bold mb-16 max-w-3xl">
        Quelle est la catégorie d'impact de votre projet ?
      </h1>

      <!-- Button Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <NuxtLink to="/biodiversite" class="group">
          <div class="bg-[#F15A24] hover:bg-[#ff6b3d] text-white text-3xl py-8 px-10 rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm">
            <div class="flex items-center space-x-4">
              <Icon name="ph:leaf-fill" class="w-8 h-8" />
              <span>Biodiversité</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/carbone" class="group">
          <div class="bg-white hover:bg-gray-100 text-[#1E2527] text-3xl py-8 px-10 rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm">
            <div class="flex items-center space-x-4">
              <Icon name="ph:tree-fill" class="w-8 h-8" />
              <span>Carbone</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/impact-humain" class="group">
          <div class="bg-[#2A9D8F] hover:bg-[#34c5b3] text-white text-3xl py-8 px-10 rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm">
            <div class="flex items-center space-x-4">
              <Icon name="ph:users-fill" class="w-8 h-8" />
              <span>Impact humain</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/hybrid" class="group">
          <div class="bg-[#C5D82D] hover:bg-[#d9ed33] text-[#1E2527] text-3xl py-8 px-10 rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm">
            <div class="flex items-center space-x-4">
              <Icon name="ph:infinity-fill" class="w-8 h-8" />
              <span>Hybrid</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-96 h-96 opacity-10">
      <svg viewBox="0 0 100 100" class="w-full h-full text-white">
        <path d="M50,0 C60,20 80,20 100,20 C80,40 80,60 100,80 C80,80 60,80 50,100 C40,80 20,80 0,80 C20,60 20,40 0,20 C20,20 40,20 50,0" fill="currentColor"/>
      </svg>
    </div>

    <!-- Footer with Logo -->
    <div class="absolute bottom-8 right-8 flex items-center gap-4 z-10">
      <div class="relative w-32">
        <svg viewBox="0 0 400 100" class="w-full">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#C5D82D" />
              <stop offset="100%" stop-color="#F15A24" />
            </linearGradient>
          </defs>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="64" font-weight="bold" fill="url(#logoGradient)" style="font-family: Arial, sans-serif">
            COSYAL
          </text>
        </svg>
      </div>
      <span class="text-white/60 text-sm">© 2025</span>
    </div>

    <!-- Environmental Metrics Button -->
    <div class="absolute bottom-4 right-4 z-10">
      <UButton
        class="bg-gray-200 hover:bg-gray-300 transition-colors"
        size="lg"
        variant="soft"
      >
        <template #leading>
          <img src="/xrp-icon.png" alt="XRP Icon" class="w-6 h-6" />
        </template>
        <div class="text-left">
          <div class="text-xs">Environmental metrics</div>
          <div class="font-bold text-sm">XRP LEDGER</div>
        </div>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Cosyal Platform - Impact Projects',
  meta: [
    { name: 'description', content: 'Choose your project impact category on the Cosyal Platform' }
  ]
})
</script>

<style>
.container {
  max-width: 1440px;
}
</style>