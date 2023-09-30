<script setup lang="ts">
  import BgFormPrincipal from '@/components/forms/BgFormPrincipal.vue'
  import CardForm from '@/components/forms/CardForm.vue'
</script>

<template>
  <div class="signup-view">
    <BgFormPrincipal height="700px">
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
          type="form"
          submit-label="Crear cuenta"
        >
          <div class="signup-card">
            <FormKit
              type="text"
              name="username"
              label="Nombre de usuario"
            />
            <FormKit
              type="email"
              name="email"
              label="Correo"
            />
            <FormKit
              type="password"
              name="password"
              label="Contraseña"
              suffix-icon="eyeClosed"
            />
            <FormKit
              type="password"
              name="passwordConfirm"
              label="Confirmar contraseña"
              suffix-icon="eyeClosed"
            />
          </div>
        </FormKit>
      </CardForm>
      <p class="signup-view__have-account">
        ¿Ya tienes una cuenta?
        <router-link to="/">
          Inicia Sesión
        </router-link>
      </p>
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
    color: #ffffff;
    font-weight: normal;
    & a {
      font-weight: 500;
      color: var(--pastel-indigo);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>