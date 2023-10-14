<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import HeaderApp from '@/components/HeaderApp.vue'
</script>

<template>
  <div class="user-view">
    <HeaderApp />
    <RouterView />
  </div>
</template>

