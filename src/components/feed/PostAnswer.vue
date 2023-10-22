<script setup lang="ts">
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

  library.add(faTrashAlt)

  const props = withDefaults(defineProps<{
    question: string
    answer: string
  }>(), {
    question: '',
    answer: '',
  })

  const emit = defineEmits(['deletePost'])

  const handleDeletePost = () => {
    emit('deletePost')
  }
</script>

<template>
  <div class="post">
    <div class="post__actions">
      <button
        class="post__delete-action"
        @click="handleDeletePost"
      >
        <font-awesome-icon :icon="['fa', 'trash-alt']" />
      </button>
    </div>
    <p class="post__question">
      {{ props.question }}
    </p>
    <div class="post__answer">
      {{ props.answer }}
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/06-components/postAnswer.css');
</style>
