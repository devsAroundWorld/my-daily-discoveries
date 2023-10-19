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
@import url('@/assets/styles/05-objects/formLayout.css');
</style>
