<script setup lang="ts">
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import BoxQuestion from '@/components/feed/BoxQuestion.vue'
  import PostAnswer from '@/components/feed/PostAnswer.vue'
  import ProfileInfo from '@/components/profile/ProfileInfo.vue'
  import { useFeedStore } from '@/stores/feed'
  import { useAuthStore } from '@/stores/auth'
  import type { PostAnswerInterface } from '@/models/Post'

  const feedStore = useFeedStore()
  const { getAllPosts, getQuestion, sendPost, deltePost } = feedStore

  const authStore = useAuthStore()
  const { userData } = storeToRefs(authStore)

  const handleSubmit = (boxQuestionValue: PostAnswerInterface) => {
    sendPost(userData.value!.uid, boxQuestionValue)
  }

  getAllPosts(userData.value!.uid)

  const hasPosts = computed(() => feedStore.posts.length > 0)
</script>

<template>
  <div class="my-profile">
    <div><ProfileInfo /></div>
    <div class="my-profile__feed">
      <BoxQuestion @submit="handleSubmit" />
      <div
        v-if="feedStore.loadingPost"
        class="my-profile__feed-loading"
      >
        Cargando posts...
      </div>
      <PostAnswer
        v-for="(post, index) in feedStore.posts"
        :key="post?.postId ?? index"
        :question="getQuestion(post.questionId)"
        :answer="post.answer"
        @delete-post="deltePost(userData?.uid ?? '', post?.postId ?? '')"
      />
      <div
        v-if="!hasPosts && !feedStore.loadingPost"
        class="my-profile__feed-fallback"
      >
        No tienes respuestas en tu feed
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/05-objects/myProfileLayout.css');
</style>