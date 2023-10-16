<script setup lang="ts">
  import FormLayout from '@/layouts/FormLayout.vue'
  import useInputPassword from '@/composables/useInputPassword'
  import { useAuthStore } from '@/stores/auth'

  const { handleToggleIconPass } = useInputPassword()
  const { registerUser } = useAuthStore()
</script>

<template>
  <FormLayout
    class="signup-view"
    link-footer-text="Inicia sesión"
    link-footer-to="/sign-in"
  >
    <template #headingTitle>
      Se parte de <br>
      <span class="signup-view__sub-title">My Daily Discoveries</span>
    </template>
    <template #body>
      <FormKit
        id="registerForm"
        v-slot="{ state: { valid } }"
        type="form"
        :actions="false"
        incomplete-message="Todos los campos son requeridos, completa los campos."
        @submit="registerUser"
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
    </template>
  </FormLayout>
</template>

<style lang="css" scoped>
.signup-view {
  & .signup-view__sub-title {
    font-weight: 600;
    color: var(--pastel-indigo);
  }
}

@media screen and (min-width: 768px) {
  .signup-view {
    & .signup-title {
      font-size: 2rem;
    }
  }
}
</style>
