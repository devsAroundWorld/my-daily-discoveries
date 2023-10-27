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
const COMMON_TOAST_OPTIONS = {
  autoClose: 1000,
  hideProgressBar: true,
  closeButton: false,
}

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
      }, { containerId: 'registerToast' })
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
        toast.error(`App Error: ${error.message}`)
      } else {
        console.error('Error al registrar el usuario:', error)
        toast.error('Hubo un error al intentar registrar al usuario. Por favor, inténtelo de nuevo o más tarde.')
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

  const loginWithEmailAndPassword = async (data: UserLoginFieldInterface) => {
    const { email, password } = data
    try {
      const loginWithEmailAndPassPromise = signInWithEmailAndPassword(auth, email, password)
     
      loginWithEmailAndPassPromise.then((userCredential) =>{
        if(userCredential){
          authMsg.value = null
          reset('loginFormEmailAndPass')
          router.push({ name: 'user' })
        }
      }).catch((error) => {
        if(error.code === 'auth/invalid-login-credentials'){
          authMsg.value = 'Las credenciales son incorrectas o están vencidas. Por favor, inténtelo de nuevo o más tarde.'
        } else if(error.code === 'auth/too-many-requests'){
          authMsg.value = 'Demasiados intentos fallidos. Por favor, intente de nuevo más tarde o restablezca su contraseña'
        } else {
          authMsg.value = 'Hubo un error al iniciar sesión.'
        }
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`App Error: ${error.message}`)
      } else {
        toast.error('Hubo un error al intentar iniciar sesión al usuario. Por favor, inténtelo de nuevo o más tarde.')
      }
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const loginGooglePromise = signInWithPopup(auth, provider)
      try{
        await toast.promise(loginGooglePromise, {
          pending: 'Iniciando sesión con google',
          success: 'Inicio de sesión satisfactorio con google',
        }, {
          containerId: 'loginToastGoogle',
          onClose: () => {
            toast.remove('loginToastGoogle')
            router.push({ name: 'user' })
          },
          ...COMMON_TOAST_OPTIONS,
        })
      }catch(error){
        if(error.code === 'auth/popup-closed-by-user'){
          setTimeout(() => toast.error('Ventana externa cerrada por el usuario. Intente de nuevo.'), 1000)
        }
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`App Error: ${error.message}`)
      } else {
        toast.error('Hubo un error al intentar iniciar sesión con google. Por favor, inténtelo de nuevo o más tarde.')
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
          router.push({ name: 'sign-in' })
          userData.value = null
        },
        ...COMMON_TOAST_OPTIONS,
      })
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`App Error: ${error.message}`)
      } else {
        toast.error('Hubo un error al intentar cerrar sesión. Por favor, inténtelo de nuevo o más tarde.')
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