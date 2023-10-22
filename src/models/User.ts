export interface UserRegisterFieldInterface {
  email: string
  password: string
  username: string
  password_confirm: string
}

export interface UserDataInterface {
  userName: string | null
  email: string | null
  uid: string
  photo: string | null
  phone: string | null
}

export interface UserLoginFieldInterface {
  email: string
  password: string
}
