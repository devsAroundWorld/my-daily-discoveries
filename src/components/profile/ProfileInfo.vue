<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faPencil } from '@fortawesome/free-solid-svg-icons'
  import InitialPlant from '@/assets/lottie/initial-plant.json'
  import BeginnerPlant from '@/assets/lottie/beginner-plant.json'
  import MiddlePlant from '@/assets/lottie/middle-plant.json'
  import AdvancedPlant from '@/assets/lottie/advanced-plant.json'
  import ProPlant from '@/assets/lottie/pro-plant.json'
  import { ref } from 'vue'
  import { computed,onMounted } from 'vue'
  import { useProfileDataStore } from '@/stores/userProfile'
  import type { UserProfileDataInterface, UserAnimationLvl } from '@/models/UserProfile'
  import { useFeedStore } from '@/stores/feed'
  import { watch } from 'vue'
  import { Vue3Lottie } from 'vue3-lottie'
  
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

  const animationLevels: UserAnimationLvl[] = [{
    level: 1,
    minRequiredPosts: 0,
    maxRequiredPosts: 5,
    animationReward: InitialPlant
  },{
    level: 2,
    minRequiredPosts: 5,
    maxRequiredPosts: 10,
    animationReward: BeginnerPlant
  },{
    level: 3,
    minRequiredPosts: 10,
    maxRequiredPosts: 15,
    animationReward: MiddlePlant
  },{
    level: 4,
    minRequiredPosts: 15,
    maxRequiredPosts: 20,
    animationReward: AdvancedPlant
  },{
    level: 5,
    minRequiredPosts: 20,
    maxRequiredPosts: 25,
    animationReward: ProPlant,
  }]

  const currentLevel = ref<UserAnimationLvl>({
    level: 1,
    minRequiredPosts: 0,
    maxRequiredPosts: 5,
    animationReward: InitialPlant
  })

  const selectedEnjoys = ref()
  const editableEnjoys = ref()

  const userDescription = computed(() => !profileStore.userProfileData?.userDescription  ? 'Aqui puedes agregar tu descripción...' : profileStore.userProfileData?.userDescription)
  const editableUserDescription = ref()
  
  onMounted(()=>{
    getInformation()
  })
  
  function getInformation(){
    getUserProfileData(userData?.uid || '').then(() => {
      selectedEnjoys.value = profileStore.userProfileData?.favoriteActivities
      editableUserDescription.value = profileStore.userProfileData?.userDescription
      editableEnjoys.value = profileStore.userProfileData?.favoriteActivities
    })
  }
  
  watch(() => feedStore.posts.length, (newPostsNum) => {
    const newLevel = animationLevels.find((element) => newPostsNum >= element.minRequiredPosts && newPostsNum < element.maxRequiredPosts)

    if (newLevel) {
      currentLevel.value = newLevel
    }

    if(newPostsNum >= 25){
      currentLevel.value = animationLevels[4]
    }
  })

  function saveData(){
    const userProfileData: UserProfileDataInterface = {
      userDescription: editableUserDescription.value,
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
  
</script>

<template>
  <div class="profile-container">
    <div class="profile-container__avatar">
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
        <p>Este es tu nombre de usuario</p>
        <label>@{{ userData?.userName }}</label>
      </div>
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
          v-model="editableUserDescription"
          type="textarea"
          name="description"
          :help="`${editableUserDescription ? editableUserDescription.length : 0}/120`"
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
        :disabled="editableUserDescription.length > 120"
        @click="saveData"
      />
    </div>
    <p
      v-if="feedStore.posts.length <= 25"
      class="profile-animation-info"
    >
      <span>{{ feedStore.posts.length }}/{{ currentLevel.maxRequiredPosts }}</span> Posts para el siguiente nivel
    </p>
    <p
      v-else
      class="profile-animation-info"
    >
      <span>¡Has alcanzado el nivel máximo! ¡Felicidades!</span>
    </p>
    <div class="profile-animation">
      <label>Nivel {{ currentLevel.level }}</label>
      <Vue3Lottie
        v-if="currentLevel.level === 1"
        :animation-data="InitialPlant"
        :loop="1"
      />
      <Vue3Lottie
        v-if="currentLevel.level === 2"
        :animation-data="BeginnerPlant"
        :loop="1"
      />
      <Vue3Lottie
        v-if="currentLevel.level === 3"
        :animation-data="MiddlePlant"
        :loop="1"
      />
      <Vue3Lottie
        v-if="currentLevel.level === 4"
        :animation-data="AdvancedPlant"
        :loop="1"
      />
      <Vue3Lottie
        v-if="currentLevel.level === 5"
        :animation-data="ProPlant"
        :loop="1"
      />
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/06-components/profileInfo.css';
</style>
