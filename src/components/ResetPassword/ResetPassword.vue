<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    data() {
      return {
        email: '', // Aquí guardamos el valor del campo email
      }
    },
    methods: {
      sendEmail() {
        // Esta función se ejecuta cuando el usuario hace clic en el botón enviar
        firebase
          .auth()
          .sendPasswordResetEmail(this.email) // Aquí usamos el método .sendPasswordResetEmail con el email del usuario
          .then(() => {
            // Si el correo se envió correctamente, mostramos un mensaje de éxito
            alert('Se ha enviado un correo para restablecer tu contraseña a ' + this.email)
          })
          .catch((error) => {
            // Si hubo algún error, mostramos un mensaje con el código y el mensaje del error
            alert('Ha ocurrido un error: ' + error.code + ' - ' + error.message)
          })
      },
    },
  }
</script>

<template>
  <div class="formRestablecer">
    <!-- <br><br>
    <br><br><br><br><br><br><br><br> -->
    <img 
      class="imgLogo"
      src="@/assets/img/LogoMDD.png"
      alt="Logo My Daily"
    >
    <p class="p--Restablecer">
      Reestablecer contraseña
    </p>
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
    <button 
      class="btn--Restablacer"
      @submit.prevent="sendEmail"
    >
      Restablecer contraseña
    </button>
    <hr>
  </div>
</template>

<style scoped>
.formRestablecer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* border: 1px solid; */
  /* width: 20rem; */
  height: 100%;
  margin-top: 10rem;
  /* background-color: var(--soft-blue); */
}
/* .bg--formReset{
  font
} */
.imgLogo {
  width: 14rem;
  height: 14rem;
}
.p--Restablecer {
  font-family: var(--font-family);
  font-weight: bold;
  font-style: normal;
  font-size: 1.6rem;
  color: #ffffff;
  margin-top: 1rem;
}
.labelCorreo{
  font-family: var(--font-family);
  src: url('@/assets/fonts/Poppins-Bold.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
  color: var(--light-lavender);
  font-size: 2rem !important;
}
.btn--Restablacer {
  font-family: var(--font-family);
  font-weight: bold;
  font-style: normal;
  text-align: center;
  color: #ffffff;
  background-color: var(--pastel-indigo);
  border-radius: 5px;
  width: 291px;
  height: 53px;
  margin-top: 1rem;
  cursor: pointer;
}
</style>
