<script setup lang="ts">
import FormLayout from "@/layouts/FormLayout.vue";
import useInputPassword from "@/composables/useInputPassword";
import useRegisterUser from "@/composables/auth/useRegisterUser";
const { handleToggleIconPass } = useInputPassword();
const { handleCreateUser } = useRegisterUser();
</script>

<template>
  <FormLayout class="resetpass-view">
    <template #head>
      <img class="" src="@/assets/img/LogoMDD.png" alt="Logo My Daily" />
      <p class="resetpass-title">Reestablecer contraseña</p>
      <div class="formRestablecer">
        <FormKit
          type="form"
          :actions="false"
          validation="required|alphanumeric|length:0,8"
          validation-label="Nombre de usuario"
        >
          <FormKit
            class="labelCorreo"
            type="email"
            name="email"
            validation="requered|email"
            label="Correo"
          />
        </FormKit>
        <!-- 👀 Look, this is not part of the form. -->
        <button class="btn--Restablacer" @submit.prevent="sendEmail">
          Restablecer contraseña
        </button>
      </div>
    </template>
  </FormLayout>
</template>

<style lang="css" scoped>
@import "@/assets/styles/05-objects/resetPassword.css";
</style>
