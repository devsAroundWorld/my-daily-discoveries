<script setup lang="ts">
  import BgFormPrincipal from '@/components/forms/BgFormPrincipal.vue'
  import CardForm from '@/components/forms/CardForm.vue'
  import useInputPassword from '@/composables/useInputPassword'
  import useRegisterUser from '../composables/firebase/useRegisterUser'

  const { handleToggleIconPass } = useInputPassword()
  const { handleCreateUser } = useRegisterUser()
</script>

<template>
  <div class="signup-view">
    <BgFormPrincipal min-height="700px">
      <img
        src="@/assets/img/LogoMDD.png"
        alt="MY DAILY DISCOVERIES LGOO"
      >

      <h1 class="signup-title">
        Se parte de <br>
        <span>My Daily Discoveries</span>
      </h1>
      <CardForm>
        <FormKit
          v-slot="{ state: { valid }, value }"
          type="form"
          :actions="false"
          incomplete-message="Todos los campos son requeridos, completa los campos."
          @submit="handleCreateUser"
        >
          <div class="signup-card">
            <FormKit
              type="text"
              name="username"
              label="Nombre de usuario"
              placeholder="@username"
              validation="required|alphanumeric|length:0,8"
              validation-label="Nombre de usuario"
            />
            <FormKit
              type="email"
              name="email"
              label="Correo"
              validation="required|email"
            />
            <FormKit
              type="password"
              name="password"
              label="Contraseña"
              validation="required|length:0,8"
              suffix-icon="eyeClosed"
              @suffix-icon-click="handleToggleIconPass"
            />
            <FormKit
              type="password"
              name="password_confirm"
              label="Confirmar contraseña"
              validation="required|confirm|length:0,8"
              validation-label="Confirmar contraseña"
              suffix-icon="eyeClosed"
              @suffix-icon-click="handleToggleIconPass"
            />
            <FormKit
              type="submit"
              label="Crear cuenta"
              :disabled="!valid"
            />
            {{ value }}
          </div>
        </FormKit>
        <p class="signup-view__have-account">
          ¿Ya tienes una cuenta?
          <router-link to="/">
            Inicia sesión aquí
          </router-link>
        </p>
      </CardForm>
    </BgFormPrincipal>
  </div>
</template>

<style lang="css" scoped>
.signup-view {
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
  & .signup-title {
    color: #ffffff;
    font-weight: normal;
    font-size: 2rem;
    text-align: center;
    & span {
      font-weight: 600;
      color: var(--pastel-indigo);
    }
  }
  & .signup-view__have-account {
    text-align: right;
    color: var(--pastel-indigo);
    font-weight: normal;
    & a {
      font-weight: 500;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
