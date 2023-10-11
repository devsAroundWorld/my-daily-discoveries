<script setup lang="ts">
  import BgFormPrincipal from '@/components/forms/BgFormPrincipal.vue'
  import CardForm from '@/components/forms/CardForm.vue'
</script>

<template>
  <div class="form-layout">
    <BgFormPrincipal>
      <img
        src="@/assets/img/LogoMDD.png"
        alt="MY DAILY DISCOVERIES LOGO"
      >
      <h1 class="form-layout__title">
        <slot name="headingTitle" />
      </h1>
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
  & img {
    object-fit: cover;
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
  & .form-layout__title {
    color: var(--white);
    font-weight: normal;
    font-size: 1.6rem;
    text-align: center;
    & span {
      font-weight: 600;
      color: var(--pastel-indigo);
    }
  }
}
</style>
