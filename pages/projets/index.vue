<template>
  <div>
    <!-- Main Content -->
    <div class="flex justify-end mb-2">
      <NuxtLink to="/projets/creation">
        <UButton label="Créer un Projet" />
      </NuxtLink>
    </div>
    <UTable :rows="projectList" :columns="columns" class="bg-gray-800 rounded-md p-4"
      :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'Aucun certificat pour le moment' }"
      @select="handleSelect" />
    <div class="p-2" v-if="projects?.length > 0">
      <UButton @click="handleInit" variant="ghost" label="Initialiser le tableau" color="white" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const projects = usePersistentState('projects')
const confirm = useConfirm()


if (!projects.value) {
  projects.value = []
}

const columns = [
  {
    key: 'projectName',
    label: 'Nom du Projet'
  },
  {
    key: 'tx',
    label: 'Transaction'
  },
  {
    key: 'creationDateTime',
    label: 'Certifié le'
  }
]

const projectList = computed(() => {
  return projects.value.map(p => ({
    projectName: p.identity.projectName,
    tx: p.transaction.hash.slice(0, 6),
    creationDateTime: new Date(p.createdAt).toLocaleString('fr-FR'),
    nftId: p.transaction.nftoken_id
  }))
})

const handleSelect = (itemInfo) => {
  console.log(itemInfo)
  router.push('/nft/' + itemInfo.nftId)
}

const handleInit = async () => {
  const confirmed = await confirm.open({
    title: 'Initialiser les projets',
    message: `Etes vous sur de vouloir initialiser tous les projets? Les projets existants seront supprimés de cette liste. Les preuves sur la chaine ne seront pas supprimées.`,
    label: 'Initialiser',
    variant: 'danger'
  })
  if (confirmed) {
    projects.value = []
  }
}

</script>