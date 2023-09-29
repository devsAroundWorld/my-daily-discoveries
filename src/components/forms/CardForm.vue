<script setup lang="ts"></script>

<template>
  <div class="card-form">
    <slot />
  </div>
</template>

<style scoped>
.card-form {
  border-radius: .5rem;
  overflow: hidden;
  padding: .5rem 1rem;
  background: rgba(255, 255, 255, 0.51);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
