import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGeneralStore = defineStore('general', () => {
  const isFirstEntry = ref(true)
  const isLoading = ref(true)

  return {
    isFirstEntry,
    isLoading
  }
})
