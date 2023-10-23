export interface UserProfileDataInterface {
  userDescription: string | null
  favoriteActivities: number[] | null
}
export interface UserAnimationLvl {
  level: number
  minRequiredPosts: number
  maxRequiredPosts: number
  animationReward: unknown
}
