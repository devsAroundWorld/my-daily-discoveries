<script setup lang="ts">
  import BgFormPrincipal from '@/components/forms/BgFormPrincipal.vue'
  import CardForm from '@/components/forms/CardForm.vue'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import { useRouter } from 'vue-router'

  library.add(faChevronLeft)
  
  export interface Props {
    linkFooterTo: string
    linkFooterText: string
    hasResetPassword?: boolean
  }

  const props = defineProps<Props>()

  const router = useRouter()

  const handleGoLandingPage = () => {
    router.push({ name: 'landingPage' })
  }
</script>

<template>
  <div class="form-layout">
    <BgFormPrincipal>
      <button
        class="form-layout__btn-return"
        @click="handleGoLandingPage"
      >
        <font-awesome-icon :icon="['fa', 'chevron-left']" />
        Regresar
      </button>
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
          v-if="props.linkFooterTo"
          class="form-layout__links"
        >
          <router-link
            v-if="props.hasResetPassword"
            :to="{ name: 'reset-password' }"
          >
            Reestablecer mi contraseña
          </router-link>
          <router-link :to="props.linkFooterTo">
            {{ props.linkFooterText }}
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
  padding: 1rem;
  .form-layout__btn-return {
    color: var(--pastel-indigo);
    padding: 0 .6rem;
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 0 .5rem 0;
    & svg {
      width: fit-content;
      margin-right: .5rem;
    }
  }
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
  & .form-layout__links {
    text-align: right;
    color: var(--pastel-indigo);
    font-weight: normal;
    font-size: .8rem;
    display: flex;
    justify-content: space-between;
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
    & .form-layout__links {
      font-size: 1rem;
    }
  }
}
</style>
