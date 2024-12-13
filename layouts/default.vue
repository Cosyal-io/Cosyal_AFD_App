<template>
  <div class="page-layout h-screen overflow-hidden w-full" style="
      background-image: url('/bg.png');
      background-size: cover;
      background-position: center;
    ">
    <div class="w-full fixed bg-transparent z-20 backdrop-blur-3xl">
      <header class="max-w-[1200px] mx-auto w-full flex justify-between items-center">
        <NuxtLink to="/">
          <div class="flex justify-between items-center">
            <img src="/logo-white-cosyal.png" alt="Cosyal Logo" class="w-24 p-2" />
          </div>
        </NuxtLink>
        <NuxtLink to="/" class="text-sm">
          <UButton color="slate" variant="ghost" :label="user?.username || Connection" />
        </NuxtLink>
      </header>
      <UHorizontalNavigation :links="links" class="max-w-[1200px] mx-auto w-full" />
    </div>
    <main class="flex-1 flex-col overflow-auto w-full mt-100px h-[100vh]">
      <div class="h-[100px]"></div>
      <div class="max-w-[1200px] mx-auto p-2 min-h-[calc(100vh-200px)]">
        <slot>No Component for the layout</slot>
      </div>
      <div class="my-4 flex justify-center max-w-[1200px] mx-auto w-full gap-4">
        <div class="">
          <img src="/logo-cosyal.png" alt="Cosyal Logo" class="h-10" />
        </div>

        <!-- Environmental Metrics Button -->
        <a href="https://www.xrpl-commons.org/engage/explore-xrp-ledgers-sustainability">
          <div
            class="flex items-center gap-2 bg-gray-200 bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-md px-3 py-2 shadow-md transition-all duration-300 hover:bg-opacity-100 hover:shadow-lg text-black">
            <img src="/xrp-icon.png" alt="XRP Icon" class="h-6 w-6" />
            <div class="text-xs">
              <div>Environmental metrics</div>
              <div class="font-bold">XRP LEDGER</div>
            </div>
          </div>
        </a>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const links = [[
  {
    label: 'Projets',
    to: '/projets',
    icon: 'i-heroicons-globe-asia-australia'
  }
]]

const user = usePersistentState('user')

</script>