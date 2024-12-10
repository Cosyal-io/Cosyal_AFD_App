<template>
  <div class="min-h-screen bg-stone-700 relative overflow-hidden">
    <!-- Projects Badge -->
    <img
      src="/projets_button.png"
      alt="Projets"
      class="absolute top-8 left-8 z-10 transform hover:scale-105 transition-all w-[200px] h-auto"
    />
    <!-- Main Content -->
    <div class="container mx-auto px-8 pt-32 pb-16 relative z-10">
      <!-- Main Heading -->
      <h1
        class="text-white text-5xl font-bold mb-16 max-w-3xl mx-auto text-center"
      >
        Quelle est la catégorie d'impact de votre projet ?
      </h1>

      <!-- Button Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <NuxtLink to="/biodiversite" class="group">
          <div
            class="bg-[#F15A24] hover:bg-[#ff6b3d] text-white text-3xl py-8 px-10 rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm"
          >
            <div class="flex items-center space-x-4">
              <Icon name="ph:leaf-fill" class="w-8 h-8" />
              <span>Biodiversité</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/carbone" class="group">
          <div
            class="bg-white hover:bg-gray-100 text-[#1E2527] text-3xl py-8 px-10 rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm"
          >
            <div class="flex items-center space-x-4">
              <Icon name="ph:tree-fill" class="w-8 h-8" />
              <span>Carbone</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/impact-humain" class="group">
          <div
            class="bg-[#2A9D8F] hover:bg-[#34c5b3] text-white text-3xl py-8 px-10 rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm"
          >
            <div class="flex items-center space-x-4">
              <Icon name="ph:users-fill" class="w-8 h-8" />
              <span>Impact humain</span>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/hybrid" class="group">
          <div
            class="bg-[#C5D82D] hover:bg-[#d9ed33] text-[#1E2527] text-3xl py-8 px-10 rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm"
          >
            <div class="flex items-center space-x-4">
              <Icon name="ph:infinity-fill" class="w-8 h-8" />
              <span>Hybrid</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-96 h-96 opacity-10 z-50">
      <img
        src="/flower-cut.png"
        alt="Decorative Flower"
        class="w-full h-full"
      />
    </div>

    <!-- Footer with Logo -->
    <div class="absolute bottom-8 left-8 flex items-center gap-4 z-10">
      <div class="relative w-32">
        <svg viewBox="0 0 400 100" class="w-full">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#C5D82D" />
              <stop offset="100%" stop-color="#F15A24" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            font-size="64"
            font-weight="bold"
            fill="url(#logoGradient)"
            style="font-family: Arial, sans-serif"
          >
            COSYAL
          </text>
        </svg>
      </div>
      <span class="text-white/60 text-sm">© 2025</span>
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
