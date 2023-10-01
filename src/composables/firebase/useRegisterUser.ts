import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export interface UserType {
  email: string
  password: string
  username: string
  password_confirm: string
}

const useRegisterUser = () => {
  const auth = getAuth()
  const userCredential = ref({})
  const errorData = ref()

  const handleCreateUser = async (user: UserType) => {
    try {
      const { email, password } = user
      userCredential.value = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential.value)
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

export default useRegisterUser
