<script setup lang="ts">
  import BoxQuestion from '@/components/feed/BoxQuestion.vue'
  import PostAnswer from '@/components/feed/PostAnswer.vue'
</script>

<template>
  <div class="my-profile">
    <div>Perfil de usuario</div>
    <div class="my-profile__feed">
      <h2 class="my-profile__feed-title">
        Mi Feed personal
      </h2>
      <BoxQuestion />
      <PostAnswer />
      <PostAnswer />
      <PostAnswer />
      <PostAnswer />
      <PostAnswer />
      <PostAnswer />
      <PostAnswer />
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/05-objects/myProfileLayout.css');
</style>