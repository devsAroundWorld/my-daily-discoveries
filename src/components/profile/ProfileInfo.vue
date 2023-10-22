<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faPencil } from '@fortawesome/free-solid-svg-icons'
  import InitialPlant from '@/assets/lottie/initial-plant,json.json'
  import { ref } from 'vue'
  import { computed,onMounted } from 'vue'
  import { useProfileDataStore } from '@/stores/userProfile'
  import type { UserProfileDataInterface } from '@/models/UserProfile'
  import { useFeedStore } from '@/stores/feed'
  
  library.add(faPencil)
  const { userData } = useAuthStore()
  const profileStore = useProfileDataStore()
  const feedStore = useFeedStore()
  
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
  const postsNumber = ref()
  postsNumber.value = feedStore.posts.length

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
    const userProfileData: UserProfileDataInterface = {
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
          name="description"
          :help="`${editUserDescription ? editUserDescription.length : 0}/120`"
          placeholder="Aqui puedes agregar tu descripción..."
          cols="20"
          validation="length:0,120"
          validation-visibility="live"
          :validation-messages="{
            length: 'La descripción no puede tener más de 120 caracteres.',
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
        :disabled="editUserDescription.length > 120"
        @click="saveData"
      />
    </div>
    <p class="profile-animation-info">
      <span>{{ postsNumber }}/10</span> Posts para el siguiente nivel
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