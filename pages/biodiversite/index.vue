<template>
  <div class="min-h-screen bg-stone-700">
    <!-- Header -->
    <header class="mb-8">
      <div class="flex flex-row gap-8 p-8">
        <NuxtLink
          to="/projects"
          class="transform hover:scale-105 transition-all"
        >
          <img
            src="/projets_button.png"
            alt="Projets"
            class="w-[200px] h-auto"
          />
        </NuxtLink>

        <NuxtLink
          to="/biodiversite"
          class="transform hover:scale-105 transition-all"
        >
          <img
            src="/biodiversite_boutton.png"
            alt="Biodiversité"
            class="w-[150px] h-auto"
          />
        </NuxtLink>
      </div>
    </header>
    <!-- Modal for NFT Login -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50"
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-black flex flex-col gap-10"
      >
        <template v-if="!tx">
          <div class="text-xl font-bold">
            Nous créons votre certificat d'impact...
          </div>
          <div class="text-sm font-semibold">
            Hash du certificat : {{ computedHash }}
          </div>
          <div class="flex justify-center">
            <div class="spinner mb-4"></div>
          </div>
        </template>

        <template v-else>
          <div class="flex flex-col items-center gap-6">
            <div class="text-2xl font-bold text-emerald-600">
              Félicitations !
            </div>
            <div class="text-lg">Votre certificat a été créé</div>
            <div class="flex gap-4">
              <UButton
                :href="`https://testnet.xrpl.org/transactions/${tx}/raw`"
                target="_blank"
                color="emerald"
                icon="i-heroicons-arrow-top-right-on-square"
              >
                Voir sur le block explorer
              </UButton>
              <UButton to="/" color="gray" icon="i-heroicons-home">
                Retour à l'accueil
              </UButton>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Progress Steps -->
    <div class="container mx-auto px-4 pt-6">
      <div class="max-w-2xl mx-auto">
        <div class="flex justify-between">
          <template v-for="(title, index) in formTitles" :key="index">
            <div class="flex items-center">
              <div
                :class="[
                  'rounded-full w-8 h-8 flex items-center justify-center font-semibold',
                  currentStep === index
                    ? 'bg-emerald-600 text-white'
                    : index < currentStep
                      ? 'bg-emerald-200 text-emerald-700'
                      : 'bg-gray-200 text-gray-500',
                ]"
              >
                {{ index + 1 }}
              </div>
              <p
                class="ml-2 text-sm hidden sm:block"
                :class="
                  currentStep === index
                    ? 'text-emerald-600 font-medium'
                    : 'text-gray-500'
                "
              >
                {{ title }}
              </p>
            </div>
            <template v-if="index < formTitles.length - 1">
              <div class="flex-grow mx-2 mt-4">
                <div class="h-0.5 bg-gray-200"></div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <UCard class="max-w-2xl mx-auto backdrop-blur-sm bg-white/90">
        <template #header>
          <h2 class="text-2xl font-semibold text-gray-900">
            <template v-if="currentStep === 0">
              Questionnaire du projet
            </template>
            <template v-else-if="currentStep === 1">
              Questionnaire LCPE
            </template>
            <template v-else>
              {{
                formData.preuves.showCertificateForm
                  ? "Création d'un certificat d'impact onchain"
                  : "Documentation des preuves"
              }}
            </template>
          </h2>
          <p class="mt-2 text-gray-600">
            <template v-if="currentStep === 0">
              Veuillez fournir les détails de votre projet de biodiversité.
            </template>
            <template v-else-if="currentStep === 1">
              Veuillez répondre aux questions suivantes concernant le Libre
              Consentement Préalable et Eclairé.
            </template>
            <template v-else>
              {{
                formData.preuves.showCertificateForm
                  ? "Veuillez fournir les détails pour le certificat d'impact onchain."
                  : "Veuillez fournir les informations sur les preuves d'impact du projet."
              }}
            </template>
          </p>
        </template>

        <!-- Project Identity Form -->
        <template v-if="currentStep === 0">
          <form @submit.prevent="nextStep" class="space-y-8">
            <!-- Project Name -->
            <UFormGroup label="Nom du projet" required>
              <UInput
                v-model="formData.identity.projectName"
                placeholder="Entrez le nom de votre projet"
                icon="i-heroicons-document-text"
              />
            </UFormGroup>

            <!-- Project Location -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormGroup label="Pays du projet" required>
                <UInput
                  v-model="formData.identity.projectCountry"
                  placeholder="Entrez le pays du projet"
                  icon="i-heroicons-globe-alt"
                />
              </UFormGroup>

              <UFormGroup label="Position GPS" required>
                <UInput
                  v-model="formData.identity.projectGPS"
                  placeholder="Ex: 48.8566, 2.3522"
                  icon="i-heroicons-map-pin"
                />
              </UFormGroup>
            </div>

            <!-- Co-signatories -->
            <UFormGroup label="Co-signataires de la convention de financement">
              <div class="space-y-4">
                <UInput
                  v-for="(coSignatory, index) in formData.identity
                    .coSignatories"
                  :key="index"
                  v-model="formData.identity.coSignatories[index]"
                  :placeholder="'Co-signataire ' + (index + 1)"
                  icon="i-heroicons-user"
                />
              </div>
            </UFormGroup>

            <!-- Evaluation Period -->
            <UFormGroup label="Période d'évaluation de l'impact" required>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Du</label
                  >
                  <UInput
                    v-model="formData.identity.evaluationStartDate"
                    type="date"
                    icon="i-heroicons-calendar"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Au</label
                  >
                  <UInput
                    v-model="formData.identity.evaluationEndDate"
                    type="date"
                    icon="i-heroicons-calendar"
                  />
                </div>
              </div>
            </UFormGroup>

            <!-- Navigation -->
            <div class="flex justify-end space-x-4">
              <UButton
                to="/projects"
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
        </template>

        <!-- LCPE Form -->
        <template v-else-if="currentStep === 1">
          <form @submit.prevent="nextStep" class="space-y-8">
            <!-- Local Organizations -->
            <UFormGroup
              label="Nom des organisations représentantes des communautés locales"
              required
            >
              <div class="space-y-4">
                <UInput
                  v-for="(org, index) in formData.lcpe.localOrganizations"
                  :key="index"
                  v-model="formData.lcpe.localOrganizations[index]"
                  :placeholder="`Organisation ${index + 1}`"
                  icon="i-heroicons-building-office"
                />
              </div>
            </UFormGroup>

            <!-- Translation Question -->
            <UFormGroup
              label="Est-ce que la convention a été traduite dans une des langues locales ?"
              required
            >
              <div class="space-y-4">
                <URadio
                  v-model="formData.lcpe.isTranslated"
                  value="yes"
                  label="Oui"
                />

                <div
                  v-if="formData.lcpe.isTranslated === 'yes'"
                  class="ml-8 space-y-2"
                >
                  <UFormGroup label="Laquelle ?">
                    <UInput
                      v-model="formData.lcpe.translatedLanguage"
                      placeholder="Langue de traduction"
                      icon="i-heroicons-language"
                    />
                  </UFormGroup>
                </div>

                <URadio
                  v-model="formData.lcpe.isTranslated"
                  value="no"
                  label="Non"
                />
              </div>
            </UFormGroup>

            <!-- Customary Law -->
            <UFormGroup
              label="Quel est le droit coutumier dans la région du projet ?"
              required
            >
              <UTextarea
                v-model="formData.lcpe.customaryLaw"
                :rows="4"
                placeholder="Décrivez le droit coutumier dans la région du projet"
              />
            </UFormGroup>

            <!-- Navigation -->
            <div class="flex justify-end space-x-4">
              <UButton
                type="button"
                @click="previousStep"
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
        </template>

        <!-- Preuves Form -->
        <template v-else>
          <template v-if="!formData.preuves.showCertificateForm">
            <form @submit.prevent="handlePreuvesSubmit" class="space-y-8">
              <!-- Technical Documents -->
              <UFormGroup
                label="Liste des documents et rapports techniques"
                required
              >
                <div class="space-y-4">
                  <UInput
                    v-for="(doc, index) in formData.preuves.technicalDocuments"
                    :key="index"
                    v-model="formData.preuves.technicalDocuments[index]"
                    :placeholder="`Document ${index + 1}`"
                    icon="i-heroicons-document-text"
                  />
                </div>
              </UFormGroup>

              <!-- Standard Selection -->
              <UFormGroup label="Standard utilisé" required>
                <USelect
                  v-model="formData.preuves.selectedStandard"
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

                  <div
                    v-if="formData.preuves.uploadedFiles.length > 0"
                    class="mt-2"
                  >
                    <p class="text-sm text-gray-500">Fichiers téléversés:</p>
                    <ul class="mt-2 divide-y divide-gray-200">
                      <li
                        v-for="(file, index) in formData.preuves.uploadedFiles"
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

              <!-- Navigation -->
              <div class="flex justify-end space-x-4">
                <UButton
                  type="button"
                  @click="previousStep"
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
          </template>

          <template v-else>
            <form @submit.prevent="handleFinalSubmit" class="space-y-8">
              <UFormGroup label="Titre du certificat" required>
                <UInput
                  v-model="formData.preuves.certificateTitle"
                  placeholder="Entrez le titre du certificat"
                  icon="i-heroicons-document-text"
                />
              </UFormGroup>

              <UFormGroup label="Description du certificat" required>
                <UTextarea
                  v-model="formData.preuves.certificateDescription"
                  placeholder="Entrez la description du certificat"
                  rows="4"
                />
              </UFormGroup>

              <div class="flex justify-end space-x-4">
                <UButton
                  type="button"
                  @click="formData.preuves.showCertificateForm = false"
                  color="gray"
                  variant="outline"
                  icon="i-heroicons-arrow-left"
                >
                  Retour
                </UButton>
                <UButton
                  type="submit"
                  color="emerald"
                  icon="i-heroicons-check"
                  :loading="loading"
                >
                  Créer le certificat
                </UButton>
              </div>
            </form>
          </template>
        </template>
      </UCard>
    </main>

    <!-- Decorative Elements -->
    <div class="fixed bottom-0 right-0 w-64 h-64 -z-10 opacity-10">
      <img src="/pattern.svg" alt="" class="w-full h-full" />
    </div>

    <!-- Footer with Logo -->
    <footer class="flex justify-center items-center py-4">
      <img src="/logo-cosyal.png" alt="Cosya Logo" class="h-10" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useNFT } from "@/composables/useNFT";
import { sha512 } from "js-sha512";
import { convertStringToHex } from "xrpl";

const { postMintNFT } = useNFT();
const currentStep = ref(0);
const fileInputRef = ref<HTMLInputElement | null>(null);
const tx = ref("");
const projectData = ref("");
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const formTitles = [
  "Libre Consentement Préalable et Eclairé",
  "Preuves d'impact",
  "Certificat d'impact",
];

const standards = [
  { label: "Biodivercity", value: "biodivercity" },
  { label: "NAT5", value: "nat5" },
  { label: "Effinature", value: "effinature" },
  { label: "Vera", value: "vera" },
  { label: "Gold Standards", value: "goldstandards" },
  { label: "NF Biodiversité", value: "nf-biodiversite" },
];
const computedHash = computed(() => {
  const hash = convertStringToHex(sha512(projectData.value));
  return `${hash.slice(0, 6)}[...]${hash.slice(-6)}`;
});

const formData = reactive({
  identity: {
    projectName: "",
    projectCountry: "",
    projectGPS: "",
    coSignatories: ["", "", ""],
    evaluationStartDate: "",
    evaluationEndDate: "",
  },
  lcpe: {
    localOrganizations: Array(4).fill(""),
    isTranslated: null as string | null,
    translatedLanguage: "",
    customaryLaw: "",
  },
  preuves: {
    technicalDocuments: Array(5).fill(""),
    selectedStandard: "",
    uploadedFiles: [] as File[],
    showCertificateForm: false,
    certificateTitle: "",
    certificateDescription: "",
  },
});

const nextStep = () => {
  if (currentStep.value < formTitles.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    formData.preuves.uploadedFiles = Array.from(input.files);
  }
};

const triggerFileUpload = () => {
  fileInputRef.value?.click();
};

const handlePreuvesSubmit = (event: Event) => {
  event.preventDefault();
  formData.preuves.showCertificateForm = true;
};

const handleFinalSubmit = async () => {
  try {
    openModal();
    projectData.value = JSON.stringify({
      identity: {
        projectName: formData.identity.projectName,
        projectCountry: formData.identity.projectCountry,
        projectGPS: formData.identity.projectGPS,
        coSignatories: formData.identity.coSignatories.filter(Boolean),
        evaluationPeriod: {
          startDate: formData.identity.evaluationStartDate,
          endDate: formData.identity.evaluationEndDate,
        },
      },
      lcpe: {
        localOrganizations: formData.lcpe.localOrganizations.filter(Boolean),
        isTranslated: formData.lcpe.isTranslated,
        translatedLanguage: formData.lcpe.translatedLanguage,
        customaryLaw: formData.lcpe.customaryLaw,
      },
      preuves: {
        technicalDocuments: formData.preuves.technicalDocuments.filter(Boolean),
        selectedStandard: formData.preuves.selectedStandard,
        certificateTitle: formData.preuves.certificateTitle,
        certificateDescription: formData.preuves.certificateDescription,
      },
    });
    const result = await postMintNFT(projectData.value);
    tx.value = result.transaction.hash;
  } catch (error) {
    console.error("Error submitting form:", error);
    useToast().add({
      title: "Erreur",
      description: "Une erreur est survenue lors de la création du certificat",
      color: "red",
    });
  }
};

// Form validation
const validateIdentityStep = computed(() => {
  const {
    projectName,
    projectCountry,
    projectGPS,
    evaluationStartDate,
    evaluationEndDate,
  } = formData.identity;
  return Boolean(
    projectName &&
      projectCountry &&
      projectGPS &&
      evaluationStartDate &&
      evaluationEndDate,
  );
});

const validateLCPEStep = computed(() => {
  const { localOrganizations, isTranslated, customaryLaw } = formData.lcpe;
  const hasOrganization = localOrganizations.some((org) => org.trim() !== "");
  return Boolean(hasOrganization && isTranslated && customaryLaw);
});

const validatePreuvesStep = computed(() => {
  const { technicalDocuments, selectedStandard, uploadedFiles } =
    formData.preuves;
  const hasDocument = technicalDocuments.some((doc) => doc.trim() !== "");
  return Boolean(hasDocument && selectedStandard && uploadedFiles.length > 0);
});

// Watch for changes to show validation feedback
watch(currentStep, (newStep) => {
  switch (newStep) {
    case 0:
      if (!validateIdentityStep.value) {
        useToast().add({
          title: "Attention",
          description: "Veuillez remplir tous les champs requis",
          color: "yellow",
        });
      }
      break;
    case 1:
      if (!validateLCPEStep.value) {
        useToast().add({
          title: "Attention",
          description: "Veuillez remplir tous les champs requis",
          color: "yellow",
        });
      }
      break;
    case 2:
      if (!validatePreuvesStep.value) {
        useToast().add({
          title: "Attention",
          description: "Veuillez remplir tous les champs requis",
          color: "yellow",
        });
      }
      break;
  }
});
</script>

<style scoped>
.container {
  max-width: 1280px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: green; /* Change this color to match your theme */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
