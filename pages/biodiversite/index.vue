`
<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-emerald-900">Identité du projet</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12">
      <UCard class="max-w-2xl mx-auto backdrop-blur-sm bg-white/90">
        <template #header>
          <h2 class="text-2xl font-semibold text-gray-900">
            Questionnaire du projet
          </h2>
          <p class="mt-2 text-gray-600">
            Veuillez fournir les détails de votre projet de biodiversité.
          </p>
        </template>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Project Name -->
          <UFormGroup label="Nom du projet" required>
            <UInput
              v-model="projectName"
              placeholder="Entrez le nom de votre projet"
              icon="i-heroicons-document-text"
            />
          </UFormGroup>

          <!-- Project Location -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormGroup label="Pays du projet" required>
              <UInput
                v-model="projectCountry"
                placeholder="Entrez le pays du projet"
                icon="i-heroicons-globe-alt"
              />
            </UFormGroup>

            <UFormGroup label="Position GPS" required>
              <UInput
                v-model="projectGPS"
                placeholder="Ex: 48.8566, 2.3522"
                icon="i-heroicons-map-pin"
              />
            </UFormGroup>
          </div>

          <!-- Co-signatories -->
          <UFormGroup label="Co-signataires de la convention de financement">
            <div class="space-y-4">
              <UInput
                v-for="(coSignatory, index) in coSignatories"
                :key="index"
                v-model="coSignatories[index]"
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
                  v-model="evaluationStartDate"
                  type="date"
                  icon="i-heroicons-calendar"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Au</label
                >
                <UInput
                  v-model="evaluationEndDate"
                  type="date"
                  icon="i-heroicons-calendar"
                />
              </div>
            </div>
          </UFormGroup>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4">
            <UButton
              to="/porteurs-de-projets"
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
      </UCard>
    </main>

    <!-- Decorative Elements -->
    <div class="fixed bottom-0 right-0 w-64 h-64 -z-10 opacity-10">
      <img src="/pattern.svg" alt="" class="w-full h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const projectName = ref("");
const projectCountry = ref("");
const projectGPS = ref("");
const coSignatories = ref(["", "", ""]);
const evaluationStartDate = ref("");
const evaluationEndDate = ref("");

const handleSubmit = () => {
  console.log({
    projectName: projectName.value,
    projectCountry: projectCountry.value,
    projectGPS: projectGPS.value,
    coSignatories: coSignatories.value,
    evaluationPeriod: {
      start: evaluationStartDate.value,
      end: evaluationEndDate.value,
    },
  });

  // Navigate to LCPE questionnaire
  router.push("/biodiversite/lcpe");
};
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
`

