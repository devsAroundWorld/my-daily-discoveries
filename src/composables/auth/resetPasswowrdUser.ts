import { ref } from 'vue'
import { getAuth, sendPasswordResetEmail, updateProfile } from 'firebase/auth'
import { reset } from '@formkit/vue'

export interface UserType {
  email: string
  password: string
  username: string
  password_confirm: string
}

const resetPasswordUser = () => {
  const auth = getAuth()
  const userCredential = ref({})
  const errorData = ref()

  const handleCreateUser = async (user: UserType) => {
    try {
      const { email, username } = user
      const payload = {
        displayName: username
      }
      const response = await sendPasswordResetEmail(auth, email)
      userCredential.value = response
      reset('registerForm')
      if (response.user) {
        updateProfile(response.user, payload)
          .then(() => {
            console.log(response.user)
            alert('Usuario registrado correctamente')
          })
      }
      //TODO: Si el registro es correcto mandar un toast de que fue correctamente regustrado
      //TODO: Si el registro es correcto mandar a la vista del dashboard
    } catch (error) {
      errorData.value = error
    }
  }
  
  return {
    handleCreateUser,
    userCredential,
    errorData
  }
}

export default resetPasswordUser