<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faPencil } from '@fortawesome/free-solid-svg-icons'
  import InitialPlant from '@/assets/lottie/initial-plant,json.json'
  import { ref } from 'vue'
  import { computed,onMounted } from 'vue'
  import { useProfileDataStore } from '@/stores/userProfile'
  import { UserProfileData } from '@/models/UserProfile'
  
  library.add(faPencil)
  const { userData } = useAuthStore()
  const profileStore = useProfileDataStore()

  const { getUserProfileData, updateUserProfileData } = profileStore
  const isEditMode = ref(false)
  
  const enjoyOptions = [
    {
      value: 1,
      label: 'Cocinar',
      help: ''
    },{
      value: 2,
      label: 'Música',
      help: ''
    },
    {
      value: 3,
      label: 'Videojuegos',
      help: ''
    },
    {
      value: 4,
      label: 'Bailar',
      help: ''
    },
    {
      value: 5,
      label: 'Entrenar',
      help: ''
    },{
      value: 6,
      label: 'Patinar',
      help: ''
    },{
      value: 7,
      label: 'Leer',
      help: ''
    },{
      value: 8,
      label: 'Andar en Bicicleta',
      help: ''
    }]

  const selectedEnjoys = ref()
  const editUserDescription = ref()
  const editableEnjoys = ref()

  onMounted(()=>{
    getInformation()
  })
  
  function getInformation(){
    getUserProfileData(userData?.uid || '').then(() => {
      selectedEnjoys.value = profileStore.userProfileData?.favoriteActivities
      editUserDescription.value = profileStore.userProfileData?.userDescription
      editableEnjoys.value = profileStore.userProfileData?.favoriteActivities
    })
  }

  function saveData(){
    console.log(editableEnjoys.value)
    const userProfileData: UserProfileData = {
      userDescription: editUserDescription.value,
      favoriteActivities: editableEnjoys.value
    }
    updateUserProfileData(userData?.uid || '' , userProfileData).then(()=>{
      enableEdit()
      getInformation()
    })
  }

  function enableEdit(){
    isEditMode.value = !isEditMode.value
  }
  
  const userDescription = computed(() => !profileStore.userProfileData?.userDescription  ? 'Aqui puedes agregar tu descripción...' : profileStore.userProfileData?.userDescription)
  
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
      <button
        class="profile-action-button"
        @click="enableEdit"
      >
        <font-awesome-icon :icon="['fa', 'pencil']" /> 
        Editar
      </button>
    </div>
    <div class="profile-info">
      <div class="profile-info-text">
        <label>Mi Descripción:</label>
        <p
          v-if="!isEditMode"
          class="profile-info-desc"
          :class="{ 'profile-info-desc_empty': !profileStore.userProfileData?.userDescription }"
        >
          {{ userDescription }}
        </p>
        <FormKit
          v-if="isEditMode"
          id="userDescriptionForm"
          v-model="editUserDescription"
          type="textarea"
          name="instructions"
          :help="`${editUserDescription ? editUserDescription.length : 0}/120`"
          placeholder="Aqui puedes agregar tu descripción..."
          cols="20"
          validation="length:0,120"
          validation-visibility="live"
          :validation-messages="{
            length: 'Instructions cannot be more than 120 characters.',
          }"
        />
      </div>
      <div class="profile-info-text">
        <label>Mis gustos y cosas favoritas:</label>
        <div>
          <FormKit
            v-if="!isEditMode"
            id="enjoysGroupNonEditable"
            v-model="selectedEnjoys"
            type="checkbox"
            :options="enjoyOptions"
            :disabled="true"
          />
          <FormKit
            v-if="isEditMode"
            id="enjoysGroupEditable"
            v-model="editableEnjoys"
            type="checkbox"
            :options="enjoyOptions"
          />
        </div>
      </div>
      <FormKit
        v-if="isEditMode"
        type="button"
        label="Guardar"
        @click="saveData"
      />
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