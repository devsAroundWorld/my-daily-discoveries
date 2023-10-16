<script setup lang="ts">
  import FormLayout from '@/layouts/FormLayout.vue'
  import { useAuthStore } from '@/stores/auth'

  const { resetPassword } = useAuthStore()
</script>

<template>
  <FormLayout
    link-footer-to="/sign-in"
    link-footer-text="Iniciar sesión"
  >
    <template #headingTitle>
      Reestablecer<br>
      <span>Contraseña</span>
    </template>
    <template #body>
      <FormKit
        id="resetForm"
        v-slot="{ state: { valid } }"
        type="form"
        :actions="false"
        incomplete-message="Todos los campos son requeridos, completa los campos."
        @submit="resetPassword"
      >
        <FormKit
          type="email"
          name="email"
          validation="requered|email"
          label="Correo"
        />
        <FormKit
          type="submit"
          label="Reestablecer contraseña"
          :disabled="!valid"
        />
      </FormKit>
    </template>
  </FormLayout>
</template>
