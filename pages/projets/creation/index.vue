<template>
  <div>

    <!-- Modal for NFT Login -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-black flex flex-col gap-10">
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
            <div class="flex flex-col gap-4">
              <UButton :to="`https://testnet.xrpl.org/transactions/${tx}/raw`" target="_blank"
                icon="i-heroicons-arrow-top-right-on-square" variant="outline" color="gray">
                Voir sur le block explorer
              </UButton>
              <UButton :to="`/nft/${hash}`" icon="i-heroicons-document-magnifying-glass" variant="outline" color="gray">
                Consulter le certificat
              </UButton>
              <UButton to="/projets" icon="i-heroicons-home">
                Aller à la liste des projets
              </UButton>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Progress Steps -->
    <UTabs :items="items" class="w-full" v-model="activeTab">

      <template #step1="{ item }">
        <div class="container mx-auto p-4 relative z-10 bg-gray-800 rounded-md">
          <!-- Main Heading -->

          <UAlert title="Il existe plusieures catégories d'impact mesurables." />
          <br />

          <URadioGroup legend="Quelle est la catégorie d'impact de votre projet ?" :options="categories"
            v-model="formData.categorie" />

          <!-- <h1 class="text-white">
            Quelle est la catégorie d'impact de votre projet ?
          </h1>          
          <div class="flex flex-row gap-4 mx-auto items-center py-4">
            {{ formData.categorie }}
            <div
              class="bg-[#f7561c] w-36 h-36 opacity-85 hover:opacity-100 pointer flex rounded-md text-black font-bold justify-center items-center border-2"
              :class="{ 'border-white': formData.categorie === 'biodiversité' }"
              @click="formData.categorie = 'biodiversité'">
              Biodiversité
            </div>
            <div
              class="bg-[#cccdce] w-36 h-36 opacity-85 hover:opacity-100 pointer flex rounded-md text-black font-bold justify-center items-center border-2 border-transparent"
              :class="{ 'opacity-100!': !!formData.categorie === 'carbone' }" @click="formData.categorie = 'carbone'">
              Carbone
            </div>
            <div
              class="bg-[#00888d] w-36 h-36 opacity-85 hover:opacity-100 pointer flex rounded-md text-black font-bold justify-center items-center border-2"
              :class="{ 'border-white': formData.categorie === 'impact humain' }"
              @click="formData.categorie = 'impact humain'">
              Impact humain
            </div>
            <div
              class="bg-[#e4f427] w-36 h-36 opacity-85 hover:opacity-100 pointer flex rounded-md text-black font-bold justify-center items-center border-2"
              :class="{ 'border-white': formData.categorie === 'hybride' }" @click="formData.categorie = 'hybride'">
              Hybride
            </div>
          </div> -->

          <!-- Navigation -->
          <div class="flex justify-end space-x-4">
            <!-- <UButton @click="activeTab=activeTab-1"  variant="outline" icon="i-heroicons-arrow-left">
              Retour
            </UButton> -->
            <UButton @click="activeTab = activeTab + 1" icon="i-heroicons-arrow-right">
              Suivant
            </UButton>
          </div>
        </div>
      </template>

      <template #step2="{ item }">
        <div class="container mx-auto p-4 relative z-10 bg-gray-800 rounded-md">

          <UAlert title="Veuillez fournir les détails de votre projet de biodiversité." />
          <br />

          <form @submit.prevent="nextStep" class="space-y-8">
            <!-- Project Name -->
            <UFormGroup label="Nom du projet" required>
              <UInput v-model="formData.identity.projectName" placeholder="Entrez le nom de votre projet"
                icon="i-heroicons-document-text" />
            </UFormGroup>

            <!-- Project Location -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormGroup label="Pays du projet" required>
                <UInput v-model="formData.identity.projectCountry" placeholder="Entrez le pays du projet"
                  icon="i-heroicons-globe-alt" />
              </UFormGroup>

              <UFormGroup label="Points de contrôle GPS de la zone géographique du projet" required>
                <UInput v-model="formData.identity.projectGPS" placeholder="Ex: 48.8566, 2.3522"
                  icon="i-heroicons-map-pin" />
              </UFormGroup>
            </div>

            <!-- Co-signatories -->
            <UFormGroup label="Co-signataires de la convention de financement">
              <div class="space-y-4">
                <UInput v-for="(coSignatory, index) in formData.identity
                  .coSignatories" :key="index" v-model="formData.identity.coSignatories[index]"
                  :placeholder="'Co-signataire ' + (index + 1)" icon="i-heroicons-user" />
              </div>
            </UFormGroup>

            <!-- Evaluation Period -->
            <UFormGroup label="Période d'évaluation de l'impact" required>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-200 mb-1">Du</label>
                  <UInput v-model="formData.identity.evaluationStartDate" type="date" icon="i-heroicons-calendar" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-200 mb-1">Au</label>
                  <UInput v-model="formData.identity.evaluationEndDate" type="date" icon="i-heroicons-calendar" />
                </div>
              </div>
            </UFormGroup>

            <!-- Navigation -->
            <div class="flex justify-end space-x-4">
              <UButton @click="activeTab = activeTab - 1" variant="outline" icon="i-heroicons-arrow-left">
                Retour
              </UButton>
              <UButton @click="activeTab = activeTab + 1" icon="i-heroicons-arrow-right">
                Suivant
              </UButton>
            </div>
          </form>
        </div>
      </template>

      <template #step3="{ item }">
        <div class="container mx-auto p-4 relative z-10 bg-gray-800 rounded-md">

          <UAlert
            title="Veuillez répondre aux questions suivantes concernant le Libre Consentement Préalable et Eclairé." />
          <br />

          <form @submit.prevent="nextStep" class="space-y-8">
            <!-- Local Organizations -->
            <UFormGroup label="Nom des organisations représentantes des communautés locales" required>
              <div class="space-y-4">
                <UInput v-for="(org, index) in formData.lcpe.localOrganizations" :key="index"
                  v-model="formData.lcpe.localOrganizations[index]" :placeholder="`Organisation ${index + 1}`"
                  icon="i-heroicons-building-office" />
              </div>
            </UFormGroup>

            <!-- Translation Question -->
            <UFormGroup label="Est-ce que la convention a été traduite dans une des langues locales ?" required>
              <div class="space-y-4">
                <URadio v-model="formData.lcpe.isTranslated" value="yes" label="Oui" />

                <div v-if="formData.lcpe.isTranslated === 'yes'" class="ml-8 space-y-2">
                  <UFormGroup label="Laquelle ?">
                    <UInput v-model="formData.lcpe.translatedLanguage" placeholder="Langue de traduction"
                      icon="i-heroicons-language" />
                  </UFormGroup>
                </div>

                <URadio v-model="formData.lcpe.isTranslated" value="no" label="Non" />
              </div>
            </UFormGroup>

            <!-- Customary Law -->
            <UFormGroup label="Quel est le droit coutumier dans la région du projet ?" required>
              <UTextarea v-model="formData.lcpe.customaryLaw" :rows="4"
                placeholder="Décrivez le droit coutumier dans la région du projet" />
            </UFormGroup>

            <!-- Navigation -->
            <div class="flex justify-end space-x-4">
              <UButton @click="activeTab = activeTab - 1" variant="outline" icon="i-heroicons-arrow-left">
                Retour
              </UButton>
              <UButton @click="activeTab = activeTab + 1" icon="i-heroicons-arrow-right">
                Suivant
              </UButton>
            </div>
          </form>
        </div>
      </template>
      <template #step4="{ item }">
        <div class="container mx-auto p-4 relative z-10 bg-gray-800 rounded-md">

          <UAlert title="Veuillez fournir les informations sur les preuves d'impact du projet." />
          <br />

          <form @submit.prevent="handlePreuvesSubmit" class="space-y-8">
            <!-- Technical Documents -->
            <UFormGroup label="Liste des documents et rapports techniques" required>
              <div class="space-y-4">
                <UInput v-for="(doc, index) in formData.preuves.technicalDocuments" :key="index"
                  v-model="formData.preuves.technicalDocuments[index]" :placeholder="`Document ${index + 1}`"
                  icon="i-heroicons-document-text" />
              </div>
            </UFormGroup>

            <!-- Standard Selection -->
            <UFormGroup label="Standard utilisé" required>
              <USelect v-model="formData.preuves.selectedStandard" :options="standards"
                placeholder="Sélectionnez un standard" icon="i-heroicons-check-badge" />
            </UFormGroup>

            <!-- File Upload -->
            <UFormGroup label="Documents d'évaluation et rapports techniques" required>
              <div class="space-y-4">
                <input type="file" ref="fileInputRef" @change="handleFileUpload" class="hidden" multiple />
                <UButton type="button" @click="triggerFileUpload" icon="i-heroicons-arrow-up-tray" variant="soft" block>
                  Téléverser des fichiers
                </UButton>

                <div v-if="formData.preuves.uploadedFiles.length > 0" class="mt-2">
                  <p class="text-sm text-gray-500">Fichiers téléversés:</p>
                  <ul class="mt-2 divide-y divide-gray-200">
                    <li v-for="(file, index) in formData.preuves.uploadedFiles" :key="index"
                      class="py-2 flex items-center text-sm text-gray-600">
                      <UIcon name="i-heroicons-document" class="mr-2" />
                      {{ file.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </UFormGroup>

            <!-- Navigation -->
            <div class="flex justify-end space-x-4">
              <UButton @click="activeTab = activeTab - 1" variant="outline" icon="i-heroicons-arrow-left">
                Retour
              </UButton>
              <UButton @click="activeTab = activeTab + 1" icon="i-heroicons-arrow-right">
                Suivant
              </UButton>
            </div>
          </form>
        </div>
      </template>

      <template #step5="{ item }">
        <div class="container mx-auto p-4 relative z-10 bg-gray-800 rounded-md">

          <UAlert title="Veuillez fournir les détails pour le certificat d'impact onchain." />
          <br />

          <form @submit.prevent="handleFinalSubmit" class="space-y-8">
            <UFormGroup label="Titre du certificat" required>
              <UInput v-model="formData.preuves.certificateTitle" placeholder="Entrez le titre du certificat"
                icon="i-heroicons-document-text" />
            </UFormGroup>

            <UFormGroup label="Description du certificat" required>
              <UTextarea v-model="formData.preuves.certificateDescription"
                placeholder="Entrez la description du certificat" rows="4" />
            </UFormGroup>

            <div class="flex justify-end space-x-4">
              <UButton @click="activeTab = activeTab - 1" variant="outline" icon="i-heroicons-arrow-left">
                Retour
              </UButton>
              <UButton type="submit" icon="i-heroicons-check" :loading="loading">
                Créer le certificat
              </UButton>
            </div>
          </form>
        </div>
      </template>
    </UTabs>

    <!-- <pre>{{ formData }}</pre>

    <div class="border-2 border-white bg-transparent p-4 mb-4 w-fit mx-auto rounded-2xl">
      <h1 class="text-white text-3xl font-medium">
        {{ stepTitles[currentStep] }}
      </h1>
    </div>
    <main class="container mx-auto px-4 py-4">
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
      </UCard>
    </main> -->

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
const hash = ref("");
const projectData = ref("");
const isModalOpen = ref(false);
const activeTab = ref(0)
const loading = ref(0)

const projects = usePersistentState('projects')

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const categories = [{
  value: 'biodiversité',
  label: 'Biodiversité'
}, {
  value: 'carbone',
  label: 'Carbone'
}, {
  value: 'impact humain',
  label: 'Impact Humain'
}, {
  value: 'hybride',
  label: 'Hybride'
}]
const formTitles = [
  "Libre Consentement Préalable et Eclairé",
  "Preuves d'impact",
  "Certificat d'impact",
];
const stepTitles = {
  0: "Identité",
  1: "Libre Consentement Préalable et Eclairé",
  2: "Preuves d'impact",
  3: "Certificat d'impact",
};
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
  categorie: 'biodiversité'
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
    // projectData.value = JSON.stringify({
    //   identity: {
    //     projectName: formData.identity.projectName,
    //     projectCountry: formData.identity.projectCountry,
    //     projectGPS: formData.identity.projectGPS,
    //     coSignatories: formData.identity.coSignatories.filter(Boolean),
    //     evaluationPeriod: {
    //       startDate: formData.identity.evaluationStartDate,
    //       endDate: formData.identity.evaluationEndDate,
    //     },
    //   },
    //   lcpe: {
    //     localOrganizations: formData.lcpe.localOrganizations.filter(Boolean),
    //     isTranslated: formData.lcpe.isTranslated,
    //     translatedLanguage: formData.lcpe.translatedLanguage,
    //     customaryLaw: formData.lcpe.customaryLaw,
    //   },
    //   preuves: {
    //     technicalDocuments: formData.preuves.technicalDocuments.filter(Boolean),
    //     selectedStandard: formData.preuves.selectedStandard,
    //     certificateTitle: formData.preuves.certificateTitle,
    //     certificateDescription: formData.preuves.certificateDescription,
    //   },
    // });
    const result = await postMintNFT(JSON.stringify(formData));
    tx.value = result.transaction.hash;
    hash.value = result.transaction.nftoken_id;
    formData.transaction = result.transaction
    formData.createdAt = new Date()

    // save new project
    projects.value.push(formData)
    console.log("tx value : ", tx.value);
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
    evaluationEndDate
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

const items = [{
  slot: 'step1',
  label: 'Catégorie'
},
{
  slot: 'step2',
  label: 'Identité'
},
{
  slot: 'step3',
  label: 'Consentements'
},
{
  slot: 'step4',
  label: "Preuves d'impact"
},
{
  slot: 'step5',
  label: 'Certificat'
}]
</script>

<style scoped>
.container {
  max-width: 1280px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: green;
  /* Change this color to match your theme */
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
