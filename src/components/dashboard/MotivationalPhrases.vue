<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { phrases } from '@/mockup-data/motivational-phrases.json'

  export interface PhraseInterface {
    id?: number
    frase?: string
    autor?: string
  }

  const currentPhrase = ref<PhraseInterface>({})

  const getRandomPhrase = () => {
    currentPhrase.value = phrases[Math.floor(Math.random() * phrases.length)]
  }

  onMounted(() => {
    getRandomPhrase()
    setInterval(getRandomPhrase, 300000)
  })
</script>

<template>
  <div class="phrase">
    <h1 class="phrase__title">
      Frase del día
    </h1>
    <p class="phrase__info">
      "{{ currentPhrase.frase }}"
    </p>
    <p class="phrase__author">
      - {{ currentPhrase.autor }}
    </p>
  </div>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/06-components/motivationalPhrases.css');
</style>
