<script setup lang="ts">
  import FormLayout from '@/layouts/FormLayout.vue'
  import useInputPassword from '@/composables/useInputPassword'
  import { useAuthStore } from '@/stores/auth'

  const { handleToggleIconPass } = useInputPassword()
  const authStore = useAuthStore()
  const { loginWithEmailAndPassword, loginWithGoogle } = authStore
</script>

<template>
  <FormLayout
    class="signin-view"
    link-footer-text="Registrate"
    link-footer-to="/sign-up"
    has-reset-password
  >
    <template #headingTitle>
      Iniciar <b>sesión</b> 
    </template>
    <template #body>
      <div>
        <FormKit
          id="loginFormEmailAndPass"
          v-slot="{ state: { valid } }"
          type="form"
          :actions="false"
          incomplete-message="Todos los campos son requeridos, completa los campos."
          @submit="loginWithEmailAndPassword"
        >
          <div class="signup-card">
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
            <p
              v-if="authStore.authMsg"
              class="auth-msg"
            >
              {{ authStore.authMsg }}
            </p>
            <FormKit
              type="submit"
              label="Iniciar sesión"
              :disabled="!valid"
            />
          </div>
        </FormKit>
        <p class="sign-in__or-text">
          o
        </p>
        <FormKit
          id="loginFormGoogle"
          type="form"
          :actions="false"
          @submit="loginWithGoogle"
        >
          <FormKit
            type="submit"
            label="Iniciar sesión con google"
            suffix-icon="google"
          />
        </FormKit>
      </div>
    </template>
  </FormLayout>
</template>

<style lang="css" scoped>
.signin-view {
  & .sign-in__or-text {
    font-weight: 400;
    font-style: normal;
    margin: 1rem 0;
    text-align: center;
  }
  & b {
    color: var(--pastel-indigo);
  }
}

.auth-msg {
  margin: 1rem 0;
  color: var(--red);
  font-weight: 400;
  font-style: normal;
}
</style>
