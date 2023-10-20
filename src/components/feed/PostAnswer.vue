<script setup lang="ts">
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

  library.add(faTrashAlt)

  const emit = defineEmits(['deletePost'])

  const handleDeletePost = () => {
    console.log('delete post')
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
      ¿Cuándo fue la última vez que te sentiste profundamente agradecido por algo o alguien?
    </p>
    <div class="post__answer">
      Respuesta colocada en el box question, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/06-components/postAnswer.css');
</style>
