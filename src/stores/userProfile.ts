import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/plugins/firebase.config'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import type { UserProfileData } from '@/models/UserProfile'
import { toast } from 'vue3-toastify'

const COMMON_TOAST_OPTIONS = {
  autoClose: 2000,
  hideProgressBar: true,
  closeButton: false,
}

export const useProfileDataStore = defineStore('userProfile', () => {
  const userProfileData = ref<UserProfileData | null>()
  
  const getUserProfileData = async (uid: string) => {
    const docRef = doc(db, 'user-profiles', uid)
    const docSnapshot = await getDoc(docRef)
   
    if(docSnapshot.exists()){
      const { userDescription, favoriteActivities } = docSnapshot.data()
      userProfileData.value = {
        userDescription,
        favoriteActivities
      }
    } else {
      console.error('No data found')
      const newUserProfileDoc = {
        userDescription: '',
        favoriteActivities: []
      }
      
      try{
        await setDoc(docRef, newUserProfileDoc)
      } catch (err) {
        console.error('Error al crear el nuevo documento:', err)
      }
    }
  }

  const updateUserProfileData = async (uid:string, userData: UserProfileData) => {
    const docRef = doc(db, 'user-profiles',uid)

    try {
      await updateDoc(docRef,{
        userDescription: userData.userDescription,
        favoriteActivities: userData.favoriteActivities
      }).then(()=>{
        toast.success('Tu información se actualizó correctamente',{...COMMON_TOAST_OPTIONS})
      })
    } catch (err) {
      console.error('Error al actualizar la información', err)
      toast.error('Hubo un error al actualizar tu información. Por favor, inténtelo de nuevo más tarde.')
    } 
  }

  return {
    //state
    userProfileData,
    //actions
    getUserProfileData,
    updateUserProfileData
    //getters
  }
})