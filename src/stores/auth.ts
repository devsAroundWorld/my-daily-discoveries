import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'
import { reset } from '@formkit/vue'
import type { UserRegisterFieldInterface, UserDataInterface } from '@/models/User'

const auth = getAuth()

export const useAuthStore = defineStore('auth', () => {
  const userData = ref<UserDataInterface | null>()

  const loadingSession = ref(false)
  const error = ref()

  function currentUser () {
    return new Promise((resolve, reject) => {
      const onSuscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            const { displayName, email, uid, photoURL, phoneNumber } = user
            userData.value = {
              userName: displayName,
              email,
              uid,
              photo: photoURL,
              phone: phoneNumber,
            }
          } else {
            userData.value = null
          }
          onSuscribe()
          resolve(user)
        },
        (e) => {
          onSuscribe()
          reject(e)
        }
      )
    })
  }

  const registerUser = async (user: UserRegisterFieldInterface) => {
    try {
      const { email, password, username } = user
      const payload = {
        displayName: username
      }
      const response = await createUserWithEmailAndPassword(auth, email, password)
      reset('registerForm')
      if (response.user) {
        updateProfile(response.user, payload)
          .then(() => {
            //TODO: Si el registro es correcto mandar un toast de que fue correctamente regustrado
            //TODO: Si el registro es correcto mandar a la vista del dashboard
            alert('Usuario registrado correctamente')
          })
      }
    } catch (e) {
      error.value = e
      //TODO: Si el registro es correcto mandar un toast de que fue Incorrectamente regustrado
      //TODO: Si el registro es correcto mandar a la vista del dashboard
    }
  }

  const resetPassword = (data: { email: string }) => {
    const { email } = data
    sendPasswordResetEmail(auth, email)
      .then(() => {
        reset('resetForm')
      })
      .catch((e) => {
        console.log(e)
        error.value = e
      })
  }

  return {
    // State
    userData,
    loadingSession,
    // Getters
    // Actions
    registerUser,
    currentUser,
    resetPassword
  }
})