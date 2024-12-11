<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Client, nftInfoRequest } from "xrpl";

interface NFTMetadata {
  id: string;
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

interface NFTBlockchainData {
  tokenId: string;
  owner: string;
  taxon: number;
  sequence: number;
  issuer: string;
  transferFee: number;
  flags: number;
}

const route = useRoute();
const nftId = route.params.id as string;
const isLoading = ref(true);
const error = ref<string | null>(null);
const metadata = ref<NFTMetadata | null>(null);
const blockchainData = ref<NFTBlockchainData | null>(null);

const fetchNFTData = async () => {
  try {
    const client = new Client("wss://clio.altnet.rippletest.net:51233");
    await client.connect();

    // Fetch NFT metadata using NFT ID
    const nftResponse = await client.request({
      command: "nft_info",
      nft_id: nftId,
    });

    isLoading.value = true;
    error.value = null;

    // Example XRPL client setup (you'll need to import the xrpl library)

    if (nftResponse.result) {
      blockchainData.value = {
        tokenId: nftResponse.result.nft_id,
        owner: nftResponse.result.owner,
        taxon: nftResponse.result.taxon,
        sequence: nftResponse.result.sequence,
        issuer: nftResponse.result.issuer,
        uri: nftResponse.uri,
      };
    }
    await client.disconnect();
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to fetch NFT data";
  } finally {
    isLoading.value = false;
    console.log(blockchainData.value);
  }
};

onMounted(() => {
  fetchNFTData();
});
const goBack = () => {
  window.history.back();
};

const retryFetch = () => {
  fetchNFTData();
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
      <USpinner class="h-8 w-8" />
    </div>

    <!-- Enhanced Error State -->
    <div
      v-else-if="error"
      class="min-h-[50vh] flex items-center justify-center"
    >
      <UCard class="max-w-lg w-full">
        <div class="text-center space-y-6 p-4">
          <!-- Error Icon -->
          <div class="flex justify-center">
            <div
              class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center"
            >
              <Icon
                name="heroicons:exclamation-triangle"
                class="h-8 w-8 text-red-500"
              />
            </div>
          </div>

          <!-- Error Message -->
          <div class="space-y-2">
            <h2 class="text-xl font-semibold text-gray-900">
              Failed to Load NFT
            </h2>
            <p class="text-gray-500">
              We couldn't fetch the NFT data for ID: {{ nftId }}
            </p>
            <p class="text-sm text-gray-600 mt-2">Error: {{ error }}</p>
          </div>

          <!-- Possible Solutions -->
          <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p class="font-medium mb-2">Possible solutions:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Check if the NFT ID is correct</li>
              <li>Verify your network connection</li>
              <li>The NFT might have been burned or transferred</li>
              <li>The XRPL node might be temporarily unavailable</li>
            </ul>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 justify-center pt-2">
            <UButton color="gray" variant="outline" @click="goBack">
              Go Back
            </UButton>
            <UButton color="primary" @click="retryFetch"> Try Again </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- NFT Content (keep existing content) -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left Column: Image -->
      <div class="space-y-4">
        <UCard>
          <img
            v-if="metadata?.image"
            :src="metadata.image"
            :alt="metadata.name"
            class="w-full h-auto rounded-lg"
          />
          <div
            v-else
            class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <span class="text-gray-400">No image available</span>
          </div>
        </UCard>
      </div>

      <!-- Right Column: Details -->
      <div class="space-y-6">
        <!-- Basic Info -->
        <UCard>
          <div class="space-y-4">
            <h1 class="text-2xl font-bold">
              {{ metadata?.name || "Certificat d'impact" }}
            </h1>
            <p class="text-gray-600">{{ metadata?.description }}</p>
          </div>
        </UCard>

        <!-- Blockchain Info -->
        <UCard>
          <h2 class="text-lg font-semibold mb-4">Blockchain Details</h2>
          <div class="space-y-2">
            <div class="grid grid-cols-3 gap-2 text-sm">
              <span class="text-gray-500">Token ID</span>
              <span class="col-span-2 font-mono">{{
                blockchainData?.tokenId
              }}</span>

              <span class="text-gray-500">Owner</span>
              <span class="col-span-2 font-mono">{{
                blockchainData?.owner
              }}</span>

              <span class="text-gray-500">Issuer</span>
              <span class="col-span-2 font-mono">{{
                blockchainData?.issuer
              }}</span>

              <span class="text-gray-500">Taxon</span>
              <span class="col-span-2">{{ blockchainData?.taxon }}</span>

              <span class="text-gray-500">Sequence</span>
              <span class="col-span-2">{{ blockchainData?.sequence }}</span>

              <span class="text-gray-500">Transfer Fee</span>
              <span class="col-span-2">{{ blockchainData?.transferFee }}%</span>
            </div>
          </div>
        </UCard>

        <!-- Attributes -->
        <UCard v-if="metadata?.attributes?.length">
          <h2 class="text-lg font-semibold mb-4">Attributes</h2>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(attr, index) in metadata.attributes"
              :key="index"
              class="bg-gray-50 p-3 rounded-lg"
            >
              <div class="text-sm text-gray-500">{{ attr.trait_type }}</div>
              <div class="font-medium">{{ attr.value }}</div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
