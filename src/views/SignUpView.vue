<script setup lang="ts">

</script>

<template>
  <div class="signup-view">
    <img
      src="@/assets/img/LogoMDD.png"
      alt="MY DAILY DISCOVERIES LGOO"
    >

    <h1 class="signup-title">
      Se parte de <br>
      <span>My Daily Discoveries</span>
    </h1>
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
  </div>
</template>

<style lang="css" scoped>
.signup-view {
  padding: 1rem;
  & img {
    object-fit: cover;
    width: 100px;
    height: 100px;
    margin: 0 auto 1rem;
  }
  & .signup-title {
    color: var(--pastel-indigo);
    font-weight: normal;
    font-size: 2rem;
    text-align: center;
    margin: 0 0 1rem 0;
    & span {
      font-weight: 600;
    }
  }
}
</style>