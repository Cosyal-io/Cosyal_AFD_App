<template>
  <div class="page-layout h-screen overflow-hidden w-full" style="
      background-image: url('/bg.png');
      background-size: cover;
      background-position: center;
    ">
    <main class="flex justify-center items-center w-full h-full">
      <slot>No Component for the layout</slot>
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
</script>