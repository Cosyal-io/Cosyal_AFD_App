<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-emerald-900">
          {{ formTitles[currentStep] }}
        </h1>
      </div>
    </header>

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
  </div>
</template>
<script setup lang="ts">
const { postMintNFT } = useNFT();
const currentStep = ref(0);
const fileInputRef = ref<HTMLInputElement | null>(null);

const formTitles = ["Identité du projet", "LCPE", "Preuves d'impact"];

const standards = [
  { label: "Biodivercity", value: "biodivercity" },
  { label: "NAT5", value: "nat5" },
  { label: "Effinature", value: "effinature" },
  { label: "Vera", value: "vera" },
  { label: "Gold Standards", value: "goldstandards" },
  { label: "NF Biodiversité", value: "nf-biodiversite" },
];

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
    // Create the complete project data object
    const projectData = {
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
    };

    // Mint NFT with the complete project data
    const tx = await postMintNFT(JSON.stringify(projectData));

    if (tx) {
      // Show success message
      useToast().add({
        title: "Succès",
        description: "Le certificat a été créé avec succès",
        color: "green",
      });
    }
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
</style>

