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
  padding: 1rem 1.2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
