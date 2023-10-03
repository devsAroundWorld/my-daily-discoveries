<script setup lang="ts">
  import BgFormPrincipal from '@/components/forms/BgFormPrincipal.vue'
  import CardForm from '@/components/forms/CardForm.vue'
  import useInputPassword from '@/composables/useInputPassword'
  import useRegisterUser from '@/composables/auth/useRegisterUser'

  const { handleToggleIconPass } = useInputPassword()
  const { handleCreateUser } = useRegisterUser()
</script>

<template>
  <div class="signup-view">
    <BgFormPrincipal min-height="700px">
      <img
        src="@/assets/img/LogoMDD.png"
        alt="MY DAILY DISCOVERIES LOGO"
      >

      <h1 class="signup-title">
        Se parte de <br>
        <span>My Daily Discoveries</span>
      </h1>
      <CardForm>
        <FormKit
          id="registerForm"
          v-slot="{ state: { valid } }"
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
@import '@/assets/styles/05-objects/signUpLayout.css';
</style>
