<template>
  <div
    class="min-h-screen bg-stone-700 relative overflow-hidden"
    style="
      background-image: url('/bg.png');
      background-size: cover;
      background-position: center;
    "
  >
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
        class="text-white text-3xl pt-10 sm:text-5xl font-bold mb-16 max-w-3xl mx-auto text-center"
      >
        Quelle est la catégorie d'impact de votre projet ?
      </h1>

      <!-- Button Grid -->
      <div
        class="flex flex-col sm:flex-row gap-8 mx-auto items-center h-full pt-20"
      >
        <NuxtLink to="/biodiversite" class="group">
          <img
            src="/biodiversite_boutton.png"
            alt="Biodiversité"
            class="h-auto rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm"
          />
        </NuxtLink>

        <NuxtLink to="/carbone" class="group">
          <img
            src="/carbone_bouton.png"
            alt="Carbone"
            class="h-auto rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm"
          />
        </NuxtLink>

        <NuxtLink to="/impact-humain" class="group">
          <img
            src="/impact_humain_bouton.png"
            alt="Impact Humain"
            class="h-auto rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm"
          />
        </NuxtLink>

        <NuxtLink to="/hybrid" class="group">
          <img
            src="/hybrid_bouton.png"
            alt="Hybrid"
            class="h-auto rounded-3xl transition-all transform group-hover:scale-105 group-hover:shadow-2xl shadow-lg backdrop-blur-sm"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Footer with Logo -->
    <footer
      class="absolute bottom-4 w-full flex justify-center items-center py-4"
    >
      <img src="/logo-cosyal.png" alt="Cosya Logo" class="h-10" />
    </footer>
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
</template>
