<script setup lang="ts">
  import notFoundAnimation from '@/assets/lottie/notFoundAnimation.json'
  import { Vue3Lottie } from 'vue3-lottie'
</script>

<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1 class="not-found__content-code">
        404
      </h1>
      <div class="not-found__content-info">
        <Vue3Lottie
          width="350px"
          height="350px"
          :animation-data="notFoundAnimation"
        />
        <p class="not-found__content-title">
          Página no encontrada
        </p>
        <router-link
          class="not-found__content-link-return"
          to="/"
        >
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/05-objects/notFoundLayout.css');
</style>