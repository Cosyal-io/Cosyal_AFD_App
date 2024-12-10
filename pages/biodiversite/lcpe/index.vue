<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-emerald-900">
          LCPE (Libre Consentement Préalable et Eclairé)
        </h1>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12">
      <UCard class="max-w-2xl mx-auto backdrop-blur-sm bg-white/90">
        <template #header>
          <h2 class="text-2xl font-semibold text-gray-900">
            Questionnaire LCPE
          </h2>
          <p class="mt-2 text-gray-600">
            Veuillez répondre aux questions suivantes concernant le Libre
            Consentement Préalable et Eclairé.
          </p>
        </template>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Local Organizations -->
          <UFormGroup
            label="Nom des organisations représentantes des communautés locales"
            required
          >
            <div class="space-y-4">
              <UInput
                v-for="(org, index) in localOrganizations"
                :key="index"
                v-model="localOrganizations[index]"
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
              <URadio v-model="isTranslated" value="yes" label="Oui" />

              <!-- Language Input (Conditional) -->
              <div v-if="isTranslated === 'yes'" class="ml-8 space-y-2">
                <UFormGroup label="Laquelle ?">
                  <UInput
                    v-model="translatedLanguage"
                    placeholder="Langue de traduction"
                    icon="i-heroicons-language"
                  />
                </UFormGroup>
              </div>

              <URadio v-model="isTranslated" value="no" label="Non" />
            </div>
          </UFormGroup>

          <!-- Customary Law -->
          <UFormGroup
            label="Quel est le droit coutumier dans la région du projet ?"
            required
          >
            <UTextarea
              v-model="customaryLaw"
              :rows="4"
              placeholder="Décrivez le droit coutumier dans la région du projet"
            />
          </UFormGroup>

          <!-- Form Footer -->
          <div class="flex justify-end space-x-4">
            <UButton
              to="/biodiversite"
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
const localOrganizations = ref(Array(4).fill(""));
const isTranslated = ref<string | null>(null);
const translatedLanguage = ref("");
const customaryLaw = ref("");

const handleSubmit = () => {
  console.log("Local Organizations:", localOrganizations.value);
  console.log("Is convention translated:", isTranslated.value);
  console.log("Translated language:", translatedLanguage.value);
  console.log("Customary law:", customaryLaw.value);

  // Navigate to the Preuves d'impact page
  navigateTo("/biodiversite/preuves-impact");
};
</script>
