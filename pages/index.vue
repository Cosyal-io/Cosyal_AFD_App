<template>
  <div class="mt-20 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">

    <div class="rounded-3xl bg-black w-[300px] p-4"> <!-- Logo Section -->
      <div class="w-full flex justify-center px-4">
        <!-- PNG logo -->
        <img src="/logo-white-cosyal.png" alt="Cosyal Logo" class="inset-0 w-[300px] object-contain" />
      </div>
      <div class="p-4">Merci de vous authentifier</div>

      <UForm :schema="schema" :state="state" class="space-y-4 p-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Mot de passe" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <div class="flex justify-end">
          <UButton type="submit" color="primary">
            Connection
          </UButton>
        </div>
      </UForm>
    </div>

    <!-- Footer Section -->
    <div class="w-full md:w-1/2 flex flex-col items-center z-10">
      <p class="text-white text-center text-lg font-light leading-relaxed m-4 bg-slate-600 rounded-md p-2">
        Cosyal transpose numériquement les exigences de haute intégrité des
        meilleurs acteurs de la Finance Climat
      </p>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { InferType } from 'yup'
import { object, string } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const router = useRouter()

definePageMeta({
  layout: 'full'
})

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

const user = usePersistentState('user')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
  router.push('/projets')

  const [username,] = state.email.split('@')
  user.value = {
    email: state.email,
    username
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

body {
  font-family: "Poppins", sans-serif;
}
</style>
