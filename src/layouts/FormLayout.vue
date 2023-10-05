<script setup lang="ts">
  import BgFormPrincipal from '@/components/forms/BgFormPrincipal.vue'
  import CardForm from '@/components/forms/CardForm.vue'
</script>

<template>
  <div class="form-layout">
    <BgFormPrincipal>
      <slot name="head" />
      <CardForm>
        <slot name="body" />
      </CardForm>
    </BgFormPrincipal>
  </div>
</template>

<style lang="css" scoped>
.form-layout {
  min-height: calc(100vh - 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
