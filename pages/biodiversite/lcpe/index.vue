<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Preuves d'impact</h1>
      </div>
    </header>
    <main class="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle>{{ showCertificateForm ? "Création d'un certificat d'impact onchain" : "Preuves d'impact" }}</CardTitle>
          <CardDescription>
            {{ showCertificateForm 
              ? "Veuillez fournir les détails pour le certificat d'impact onchain."
              : "Veuillez fournir les informations sur les preuves d'impact du projet." }}
          </CardDescription>
        </CardHeader>
        <transition name="fade" mode="out-in">
          <form v-if="!showCertificateForm" @submit.prevent="handleSubmitPreuves">
            <CardContent>
              <div class="space-y-6">
                <div class="space-y-2">
                  <Label>Liste des documents et rapports techniques</Label>
                  <Input
                    v-for="(doc, index) in technicalDocuments"
                    :key="index"
                    :placeholder="`Document ${index + 1}`"
                    v-model="technicalDocuments[index]"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="standard">Standard utilisé</Label>
                  <Select v-model="selectedStandard">
                    <SelectTrigger id="standard">
                      <SelectValue placeholder="Sélectionnez un standard" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="biodivercity">Biodivercity</SelectItem>
                      <SelectItem value="nat5">NAT5</SelectItem>
                      <SelectItem value="effinature">Effinature</SelectItem>
                      <SelectItem value="vera">Vera</SelectItem>
                      <SelectItem value="goldstandards">Gold Standards</SelectItem>
                      <SelectItem value="nf-biodiversite">NF Biodiversité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="space-y-2">
                  <Label>Veuillez télécharger les documents d'évaluation et les rapports techniques liés au projet</Label>
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileUpload"
                    class="hidden"
                    multiple
                  />
                  <Button type="button" @click="triggerFileUpload" class="w-full">
                    Télécharger des fichiers
                  </Button>
                  <div v-if="uploadedFiles.length > 0" class="mt-2">
                    <p>Fichiers téléchargés:</p>
                    <ul class="list-disc pl-5">
                      <li v-for="(file, index) in uploadedFiles" :key="index">{{ file.name }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter class="flex justify-between">
              <Button as-child variant="outline">
                <router-link to="/biodiversite/lcpe">Retour</router-link>
              </Button>
              <Button type="submit">Suivant</Button>
            </CardFooter>
          </form>
          <form v-else @submit.prevent="handleSubmitCertificate">
            <CardContent>
              <div class="space-y-6">
                <div class="space-y-2">
                  <Label for="certificateTitle">Titre du certificat</Label>
                  <Input
                    id="certificateTitle"
                    v-model="certificateTitle"
                    placeholder="Entrez le titre du certificat"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="certificateDescription">Description du certificat</Label>
                  <Input
                    id="certificateDescription"
                    v-model="certificateDescription"
                    placeholder="Entrez la description du certificat"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter class="flex justify-between">
              <Button type="button" variant="outline" @click="showCertificateForm = false">
                Retour
              </Button>
              <Button type="submit">Créer le certificat</Button>
            </CardFooter>
          </form>
        </transition>
      </Card>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const router = useRouter()

const technicalDocuments = reactive(["", "", "", "", ""])
const selectedStandard = ref("")
const showCertificateForm = ref(false)
const certificateTitle = ref("")
const certificateDescription = ref("")
const uploadedFiles = ref([])
const fileInput = ref(null)

const handleSubmitPreuves = () => {
  console.log("Technical Documents:", technicalDocuments)
  console.log("Selected Standard:", selectedStandard.value)
  console.log("Uploaded Files:", uploadedFiles.value)
  showCertificateForm.value = true
}

const handleSubmitCertificate = () => {
  console.log("Certificate Title:", certificateTitle.value)
  console.log("Certificate Description:", certificateDescription.value)
  // Navigate to XRP explorer
  window.location.href = "https://xrplexplorer.com/explorer/D79BF23B59ED2DAA2377D32CB0B90A5D73C576A9B2EEF5DF4AE1ACFC9B0D80E5"
}

const handleFileUpload = (event) => {
  if (event.target.files) {
    uploadedFiles.value = Array.from(event.target.files)
  }
}

const triggerFileUpload = () => {
  fileInput.value.click()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>