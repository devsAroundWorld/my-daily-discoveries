<script setup lang="ts">
  import { ref, watch } from 'vue'
  import medalLvlOne from '@/assets/img/medals/medal1.png'
  import medalLvlTwo from '@/assets/img/medals/medal2.png'
  import medalLvlThree from '@/assets/img/medals/medal3.png'
  import medalLvlFour from '@/assets/img/medals/medal4.png'
  import medalLvlFive from '@/assets/img/medals/medal5.png'
  import { useFeedStore } from '@/stores/feed'
  import { useAuthStore } from '@/stores/auth'

  type MedalImages = {
    [key: number]: string
  }

  const feedStore = useFeedStore()
  const { getAllPosts } = feedStore

  const authStore = useAuthStore()

  getAllPosts(authStore?.userData!.uid)

  const userPostsCount = ref(0)

  const medalsEnabled = ref([false, false, false, false, false])

  const getMedalImage = (index: number) => {
    const medalImages: MedalImages = {
      0: medalLvlOne,
      1: medalLvlTwo,
      2: medalLvlThree,
      3: medalLvlFour,
      4: medalLvlFive,
    }
    return medalImages[index] || ''
  }

  watch(feedStore.posts, () => {
    userPostsCount.value = feedStore.posts.length

    const conditions = [5, 10, 15, 20, 25]

    for (let i = 0; i < medalsEnabled.value.length; i++) {
      medalsEnabled.value[i] = userPostsCount.value >= conditions[i]
    }
  })
</script>
<template>
  <div class="medal-container">
    <h2 class="medal-title">
      Medallas de reconocimiento
    </h2>
    <div
      v-for="(medal, index) in medalsEnabled"
      :key="index"
      class="medal-wrapper"
    >
      <div
        class="medal-bg"
        :class="{ 'medal-disabled': !medal }"
      >
        <img
          :src="getMedalImage(index)"
          alt="Medalla del usuario"
          class="medal"
        >
      </div>
      <p
        v-if="medal"
        class="medal-label"
      >
        Medalla {{ index + 1 }}
      </p>
    </div>
    <p class="publications-count">
      Publicaciones: {{ userPostsCount }}
    </p>
  </div>
</template>

<style scoped>
@import url('@/assets/styles/06-components/recognitionMedals.css');
</style>
