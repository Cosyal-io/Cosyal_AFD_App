<template>
  <UModal>
    <UCard>
      <div class="font-title mb-2">
        {{ title }}
      </div>
      <div>
        {{ message }}
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="white" @click="$emit('cancel')"> Annuler </UButton>
          <UButton :color="color" variant="solid" @click="$emit('confirm')">{{ label }}</Ubutton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Confirm'
  },
  message: {
    type: String,
    default: 'Do you confirm?'
  },
  label: {
    type: String,
    default: 'Confirm'
  },
  labelCancel: {
    type: String,
    default: 'Cancel'
  },
  variant: {
    type: String,
    default: 'primary'
  }
})
defineEmits(['confirm', 'cancel'])

const { title, message, label, variant } = props
const variants: Record<string, string> = {
  info: 'black',
  success: 'green',
  warning: 'orange',
  danger: 'red'
}

const color = variants[variant] || 'primary'
</script>