<script setup lang="ts">
  import FormLayout from '@/layouts/FormLayout.vue'
  import useInputPassword from '@/composables/useInputPassword'
  import { useAuthStore } from '@/stores/auth'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faGoogle } from '@fortawesome/free-brands-svg-icons'

  const { handleToggleIconPass } = useInputPassword()
  const { registerUser } = useAuthStore()
  library.add(faGoogle)
</script>

<template>
  <FormLayout
    class="signup-view"
    link-text="Registrate aquí"
    link-to="/sign-up"
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
            type="submit"
            label="Iniciar sesióon"
            :disabled="!valid"
          />
          <p>o usa</p>
          <FormKit type="submit">
            <span>
              Iniciar sesión con gmail
              <font-awesome-icon icon="fa-brands fa-google" />
            </span>
          </FormKit>
        </div>
      </FormKit>
    </template>
  </FormLayout>
</template>

<style lang="css" scoped>
</style>
