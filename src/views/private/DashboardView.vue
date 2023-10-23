<script setup lang="ts">
  import MotivationalPhrases from '@/components/dashboard/MotivationalPhrases.vue'
  import RecognitionMedals from '@/components/dashboard/RecognitionMedals.vue'
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
