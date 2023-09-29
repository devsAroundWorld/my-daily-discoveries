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
  background: rgba(229, 217, 242, 0.34);
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>
