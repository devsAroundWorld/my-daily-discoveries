import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const phrase = ref('')

  return {
    // State
    phrase
  }
})