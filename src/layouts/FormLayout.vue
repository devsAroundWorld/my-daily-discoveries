<script setup lang="ts">
  import BgFormPrincipal from '@/components/forms/BgFormPrincipal.vue'
  import CardForm from '@/components/forms/CardForm.vue'

  export interface Props {
    linkTo: string
    linkText: string
  }
  const props = defineProps<Props>()
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
        <div
          v-if="props.linkTo"
          class="form-layout__link"
        >
          <router-link :to="props.linkTo">
            {{ props.linkText }}
          </router-link>
        </div>
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
  & .form-layout__link {
    text-align: right;
    color: var(--pastel-indigo);
    font-weight: normal;
    font-size: .8rem;
    & a {
      font-weight: 500;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .form-layout {
    & .form-layout__title {
      font-size: 2rem;
    }
    & .form-layout__link {
      font-size: 1rem;
    }
  }
}
</style>
