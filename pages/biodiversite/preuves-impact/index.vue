<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-emerald-900">Preuves d'impact</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12">
      <UCard class="max-w-2xl mx-auto backdrop-blur-sm bg-white/90">
        <template #header>
          <h2 class="text-2xl font-semibold text-gray-900">
            {{
              showCertificateForm
                ? "Création d'un certificat d'impact onchain"
                : "Documentation des preuves"
            }}
          </h2>
          <p class="mt-2 text-gray-600">
            {{
              showCertificateForm
                ? "Veuillez fournir les détails pour le certificat d'impact onchain."
                : "Veuillez fournir les informations sur les preuves d'impact du projet."
            }}
          </p>
        </template>

        <!-- Preuves Form -->
        <form
          v-if="!showCertificateForm"
          @submit.prevent="handleSubmitPreuves"
          class="space-y-8"
        >
          <!-- Technical Documents -->
          <UFormGroup
            label="Liste des documents et rapports techniques"
            required
          >
            <div class="space-y-4">
              <UInput
                v-for="(doc, index) in technicalDocuments"
                :key="index"
                v-model="technicalDocuments[index]"
                :placeholder="`Document ${index + 1}`"
                icon="i-heroicons-document-text"
              />
            </div>
          </UFormGroup>

          <!-- Standard Selection -->
          <UFormGroup label="Standard utilisé" required>
            <USelect
              v-model="selectedStandard"
              :options="standards"
              placeholder="Sélectionnez un standard"
              icon="i-heroicons-check-badge"
            />
          </UFormGroup>

          <!-- File Upload -->
          <UFormGroup
            label="Documents d'évaluation et rapports techniques"
            required
          >
            <div class="space-y-4">
              <input
                type="file"
                ref="fileInputRef"
                @change="handleFileUpload"
                class="hidden"
                multiple
              />
              <UButton
                type="button"
                @click="triggerFileUpload"
                icon="i-heroicons-arrow-up-tray"
                color="gray"
                variant="soft"
                block
              >
                Téléverser des fichiers
              </UButton>

              <!-- File List -->
              <div v-if="uploadedFiles.length > 0" class="mt-2">
                <p class="text-sm text-gray-500">Fichiers téléversés:</p>
                <ul class="mt-2 divide-y divide-gray-200">
                  <li
                    v-for="(file, index) in uploadedFiles"
                    :key="index"
                    class="py-2 flex items-center text-sm text-gray-600"
                  >
                    <UIcon name="i-heroicons-document" class="mr-2" />
                    {{ file.name }}
                  </li>
                </ul>
              </div>
            </div>
          </UFormGroup>

          <!-- Form Footer -->
          <div class="flex justify-end space-x-4">
            <UButton
              to="/biodiversite/lcpe"
              color="gray"
              variant="outline"
              icon="i-heroicons-arrow-left"
            >
              Retour
            </UButton>
            <UButton
              type="submit"
              color="emerald"
              icon="i-heroicons-arrow-right"
            >
              Suivant
            </UButton>
          </div>
        </form>

        <!-- Certificate Form -->
        <form
          v-else
          @submit.prevent="handleSubmitCertificate"
          class="space-y-8"
        >
          <UFormGroup label="Titre du certificat" required>
            <UInput
              v-model="certificateTitle"
              placeholder="Entrez le titre du certificat"
              icon="i-heroicons-document-text"
            />
          </UFormGroup>

          <UFormGroup label="Description du certificat" required>
            <UTextarea
              v-model="certificateDescription"
              placeholder="Entrez la description du certificat"
              rows="4"
            />
          </UFormGroup>

          <div class="flex justify-end space-x-4">
            <UButton
              type="button"
              @click="showCertificateForm = false"
              color="gray"
              variant="outline"
              icon="i-heroicons-arrow-left"
            >
              Retour
            </UButton>
            <UButton type="submit" color="emerald" icon="i-heroicons-check">
              Créer le certificat
            </UButton>
          </div>
        </form>
      </UCard>
    </main>

    <!-- Decorative Elements -->
    <div class="fixed bottom-0 right-0 w-64 h-64 -z-10 opacity-10">
      <img src="/pattern.svg" alt="" class="w-full h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { postMintNFT } = useNFT();
const technicalDocuments = ref(Array(5).fill(""));
const selectedStandard = ref("");
const showCertificateForm = ref(false);
const certificateTitle = ref("");
const certificateDescription = ref("");
const uploadedFiles = ref<File[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);

const standards = [
  { label: "Biodivercity", value: "biodivercity" },
  { label: "NAT5", value: "nat5" },
  { label: "Effinature", value: "effinature" },
  { label: "Vera", value: "vera" },
  { label: "Gold Standards", value: "goldstandards" },
  { label: "NF Biodiversité", value: "nf-biodiversite" },
];

const handleSubmitPreuves = () => {
  console.log("Technical Documents:", technicalDocuments.value);
  console.log("Selected Standard:", selectedStandard.value);
  console.log("Uploaded Files:", uploadedFiles.value);
  showCertificateForm.value = true;
};

const handleSubmitCertificate = async () => {
  console.log("Certificate Title:", certificateTitle.value);
  console.log("Certificate Description:", certificateDescription.value);
  const tx = await postMintNFT("TEST");
  console.log(tx);
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    uploadedFiles.value = Array.from(input.files);
  }
};

const triggerFileUpload = () => {
  fileInputRef.value?.click();
};
</script>
