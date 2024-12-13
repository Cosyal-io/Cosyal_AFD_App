import { defineNuxtModule, createResolver, addImports } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'confirm',
    version: '1.0.0'
  },
  setup() {
    // Authentication logic will go here
    const { resolve } = createResolver(import.meta.url)

    // make useAuth() composable available throughout the application, ie. in pages templates
    addImports({
      name: 'useConfirm',
      from: resolve('./composables/useConfirm')
    })
  }
})
