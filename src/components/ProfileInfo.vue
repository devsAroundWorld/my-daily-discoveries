<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faPencil } from '@fortawesome/free-solid-svg-icons'
  import InitialPlant from '@/assets/lottie/initial-plant,json.json'
  import { ref } from 'vue'
  
  library.add(faPencil)
  const { userData } = useAuthStore()
  
  const enjoyOptions = [
    {
      value: '1',
      label: 'Cocinar',
      help: ''
    },{
      value: '2',
      label: 'Música',
      help: ''
    },
    {
      value: '3',
      label: 'Videojuegos',
      help: ''
    },
    {
      value: '4',
      label: 'Bailar',
      help: ''
    },
    {
      value: '5',
      label: 'Entrenar',
      help: ''
    },{
      value: '6',
      label: 'Patinar',
      help: ''
    },{
      value: '7',
      label: 'Leer',
      help: ''
    },{
      value: '8',
      label: 'Andar en Bicicleta',
      help: ''
    }]

  const value = ref()

</script>

<template>
  <div class="profile-container">
    <div class="profile-picture">
      <img 
        v-if="userData?.photo" 
        :src="userData?.photo"
      >
      <img
        v-else
        src="@/assets/img/LogoMDD.png"
      >
    </div>
    <div class="profile-name">
      <label>@{{ userData?.userName }}</label>
    </div>
    <div class="profile-action">
      <button class="profile-action-button">
        <font-awesome-icon :icon="['fa', 'pencil']" /> 
        Editar
      </button>
    </div>
    <div class="profile-info">
      <div class="profile-info-text">
        <label>Mi Descripción:</label>
        <p class="profile-info-desc">
          Esta es una descripción acerca de mi :D
        </p>
      </div>
      <div class="profile-info-text">
        <label>Mis gustos y cosas favoritas:</label>
        <div>
          <FormKit
            id="enjoysGroup"
            v-model="value"
            type="checkbox"
            :options="enjoyOptions"
          />
        </div>
      </div>
    </div>
    <p class="profile-animation-info">
      <span>0/10</span> Posts para el siguiente nivel
    </p>
    <div class="profile-animation">
      <label>Nivel 1</label>
      <Vue3Lottie
        :animation-data="InitialPlant"
        pause-on-hover
      />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/05-objects/profile.css'
</style>