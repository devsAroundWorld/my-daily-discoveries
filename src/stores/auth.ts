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
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import type { UserRegisterFieldInterface, UserDataInterface } from '@/models/User'
import { FirebaseError } from 'firebase/app'

const auth = getAuth()

export const useAuthStore = defineStore('auth', () => {
  const userData = ref<UserDataInterface | null>()
  const router = useRouter()
  const loadingSession = ref(false)

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
        await updateProfile(response.user, payload)
        toast.success(`Usuario ${username} registrado correctamente`)
        setTimeout(() => {
          router.push({ name: 'dashboard' })
        }, 2000)
      } else {
        throw new Error('No se pudo registrar el usuario')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`App Error: ${error.message}`)
      } else {
        console.error('Error al registrar el usuario:', error)
        toast.error('Hubo un error al intentar registrar al usuario. Por favor, inténtelo de nuevo más tarde.')
      }
    }
  }

  const resetPassword = async (data: { email: string }) => {
    const { email } = data

    try {
      await sendPasswordResetEmail(auth, email)
      reset('resetForm')
      toast.success('Se ha enviado un correo para restablecer su contraseña')
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`App Error: ${error.message}`)
      } else {
        console.error('Error al restablecer la contraseña:', error)
        toast.error('Hubo un error al intentar restablecer la contraseña. Por favor, inténtelo de nuevo más tarde.')
      }
    }
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