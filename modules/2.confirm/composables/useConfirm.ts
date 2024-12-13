// @ts-expect-error vue modals are compiled
import ConfirmModal from '../templates/ConfirmModal.vue'

const launchConfirm = async ({ title, message, label, labelCancel, variant }: { title: string, message?: string, label?: string, labelCancel?: string, variant?: string }) => {
  const modal = useModal()

  return new Promise((resolve, reject) => {
    try {
      modal.open(ConfirmModal, {
        title,
        message,
        label,
        labelCancel,
        variant,
        onConfirm: () => {
          modal.close()
          resolve(true)
        },
        onCancel: () => {
          modal.close()
          resolve(false)
        }
      })
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

export const useConfirm = () => {
  return {
    open: launchConfirm
  }
}
