<script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  import MotivationalPhrases from '@/components/dashboard/MotivationalPhrases.vue'
  import RecognitionMedals from '@/components/dashboard/RecognitionMedals.vue'
  import { useDashboardStore } from '@/stores/dashboard'
  import useNotification from '@/composables/useNotification'

  const dashboardStore = useDashboardStore()

  const { showNotification } = useNotification()

  const notificationInterval = ref(0)

  const showPeriodicNotification = () => {
    showNotification('My Daily Discoveries - La Frase Del Día Es:', dashboardStore.phrase)
  }

  onMounted(() => {
    showPeriodicNotification()
    notificationInterval.value = setInterval(showPeriodicNotification, 3600000)
  })

  onBeforeUnmount(() => {
    clearInterval(notificationInterval.value)
  })
</script>

<template>
  <div class="dashboard-view">
    <MotivationalPhrases />
    <RecognitionMedals />
  </div>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/05-objects/dashboardLayout.css');
</style>
