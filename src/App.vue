<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { app } from '@/plugins/firebase.config'

  const auth = getAuth(app)
  const router = useRouter()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push({ name: 'user' })
    }
  })
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/07-utils/transitions.css');
</style>