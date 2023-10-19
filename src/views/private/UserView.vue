<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import HeaderApp from '@/components/HeaderApp.vue'
</script>

<template>
  <div class="user-view">
    <HeaderApp />
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/07-utils/transitions.css');
</style>
