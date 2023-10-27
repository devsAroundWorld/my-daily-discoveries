import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { reset } from '@formkit/vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import type { UserRegisterFieldInterface, UserDataInterface, UserLoginFieldInterface } from '@/models/User'
import { FirebaseError } from 'firebase/app'

const auth = getAuth()

export const useAuthStore = defineStore('auth', () => {
  const userData = ref<UserDataInterface | null>()
  const authMsg = ref<string | null>(null)
  const router = useRouter()

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

  const registerUser = async (data: UserRegisterFieldInterface) => {
    try {
      const { email, password, username } = data
      const payload = {
        displayName: username
      }
      const userCredentialPromise = createUserWithEmailAndPassword(auth, email, password)
      const response = await toast.promise(userCredentialPromise, {
        pending: `Registrando usuario ${username}`,
        success: `Usuario ${username} registrado correctamente`,
      }, {
        containerId: 'registerToast',
        theme: 'colored'
      })
      if (response.user) {
        reset('registerForm')
        await updateProfile(response.user, payload)
        setTimeout(() => {
          toast.remove('registerToast')
          router.push({ name: 'user' })
        }, 1000)
      } else {
        throw new Error('No se pudo registrar el usuario')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`App Error: ${error.message}`, { theme: 'colored' })
      } else {
        toast.error('Hubo un error al intentar registrar al usuario. Por favor, inténtelo de nuevo o más tarde.', { theme: 'colored' })
      }
    }
  }

  const resetPassword = async (data: { email: string }) => {
    const { email } = data

    try {
      await sendPasswordResetEmail(auth, email)
      reset('resetForm')
      toast.success('Se ha enviado un correo para restablecer su contraseña', { theme: 'colored' })
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`App Error: ${error.message}`, { theme: 'colored' })
      } else {
        toast.error('Hubo un error al intentar restablecer la contraseña. Por favor, inténtelo de nuevo más tarde.', { theme: 'colored' })
      }
    }
  }

  const loginWithEmailAndPassword = async (data: UserLoginFieldInterface) => {
    const { email, password } = data
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
  
      if (userCredential.user) {
        reset('loginFormEmailAndPass')
        authMsg.value = null
        toast.success('Inicio de sesión satisfactorio', {
          autoClose: 500,
          onClose: () => {
            router.push({ name: 'user' })
          },
          theme: 'colored'
        })
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessages: { [key: string]: string } = {
          'auth/invalid-login-credentials': 'Las credenciales son incorrectas o están vencidas. Por favor, inténtelo de nuevo o más tarde.',
          'auth/too-many-requests': 'Demasiados intentos fallidos. Por favor, inténte de nuevo más tarde o restablezca su contraseña',
        }
        const errorMessage = errorMessages[error.code]
        if (errorMessage) {
          authMsg.value = errorMessage
        } else {
          toast.error(`App Error: ${error.message}`, { theme: 'colored' })
        }
      } else {
        toast.error('Hubo un error al intentar iniciar sesión al usuario. Por favor, inténtelo de nuevo o más tarde.', { theme: 'colored' })
      }
    }
  }
  

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const userCredential = await signInWithPopup(auth, provider)
      if (userCredential.user) {
        toast.success('Inicio de sesión satisfactorio con Google', {
          autoClose: 1200,
          onClose: () => {
            router.push({ name: 'user' })
          },
          theme: 'colored'
        })
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/popup-closed-by-user') {
          toast.error('Ventana externa cerrada por el usuario. Intente de nuevo.', { theme: 'colored' })
        } else {
          toast.error(`App Error: ${e.message}`, { theme: 'colored' })
        }
      } else {
        toast.error('Hubo un error al intentar iniciar sesión con Google. Por favor, inténtelo de nuevo o más tarde.', { theme: 'colored' })
      }
    }
  }

  const logOut = async () => {
    try {
      const logOutPromise = signOut(auth)
      await toast.promise(logOutPromise, {
        pending: 'Cerrando sesión',
        success: 'Cierre de sesión satisfactorio',
      }, {
        containerId: 'logoutToast',
        onClose: () => {
          toast.remove('logoutToast')
          userData.value = null
          router.push({ name: 'sign-in' })
        },
        autoClose: 500,
        hideProgressBar: true,
        closeButton: false,
        theme: 'colored'
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`App Error: ${error.message}`, { theme: 'colored' })
      } else {
        toast.error('Hubo un error al intentar cerrar sesión. Por favor, inténtelo de nuevo o más tarde.', { theme: 'colored' })
      }
    }
  }

  return {
    // State
    userData,
    authMsg,
    // Getters
    // Actions
    registerUser,
    currentUser,
    resetPassword,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logOut
  }
})