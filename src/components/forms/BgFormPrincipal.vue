<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    height: string
  }>(), {
    height: 'auto'
  })

  const getHeightCard = computed(() => props.height)
</script>

<template>
  <div class="bg-form-principal">
    <slot />
  </div>
</template>

<style scoped>
.bg-form-principal {
  padding: 1rem 1.5rem;
  background-image: url('@/assets/img/bg-principal-forms.png');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 2rem;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: v-bind(getHeightCard);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
