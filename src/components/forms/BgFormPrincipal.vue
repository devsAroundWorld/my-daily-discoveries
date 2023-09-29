<script setup lang="ts"></script>

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
}
</style>
