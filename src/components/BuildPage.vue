<script setup lang="ts">
  import { Vue3Lottie } from 'vue3-lottie'
  import buildPageAnimation from '@/assets/lottie/buildPageAnimation.json'
</script>

<template>
  <div class="build-page">
    <Vue3Lottie
      id="build-page-animation"
      :animation-data="buildPageAnimation"
    />
    <p>
      La página esta en construcción
    </p>
    <span>Estamos trabajando en mejorar esta página. Por favor, vuelve más tarde para ver las actualizaciones.</span>
  </div>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/06-components/buildPage.css');
</style>