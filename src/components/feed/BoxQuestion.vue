
<script setup lang="ts">
  import { reactive, onMounted, ref, computed } from 'vue'
  import { useFeedStore } from '@/stores/feed'
  import type { PostAnswerInterface } from '@/models/Post'

  const emit = defineEmits(['submit'])

  const { emotionalQuestions } = useFeedStore()

  const boxQuestionValue = reactive<PostAnswerInterface>({
    questionId: 0,
    answer: '',
    date: '',
  })

  const questionIndex = ref(0)

  const currentQuestion = computed(() => emotionalQuestions[questionIndex.value].question)

  const changeQuestion = () => {
    questionIndex.value = (questionIndex.value + 1) % emotionalQuestions.length
    boxQuestionValue.questionId = emotionalQuestions[questionIndex.value].id
  }

  onMounted(() => {
    changeQuestion()
    setInterval(changeQuestion, 1000000)
  })
</script>

<template>
  <div class="box-question">
    <p>{{ currentQuestion }}</p>
    <FormKit
      id="boxQuestionForm"
      v-slot="{ state: { valid } }"
      type="form"
      :actions="false"
      incomplete-message="Todos los campos son requeridos, completa los campos."
      @submit="emit('submit', boxQuestionValue)"
    >
      <FormKit
        v-model="boxQuestionValue.answer"
        type="textarea"
        name="answer"
        placeholder="Escribe tu respuesta aquí..."
        :help="`${boxQuestionValue.answer ? boxQuestionValue.answer.length : 0} / 156`"
        validation="required|length:0,156"
        :validation-messages="{
          length: 'La respuesta no puede tener más de 156 caracteres.',
        }"
      />
      <FormKit
        type="submit"
        label="Publicar respuesta"
        :disabled="!valid"
      />
    </FormKit>
  </div>
</template>


<style lang="css" scoped>
@import url('@/assets/styles/06-components/boxQuestion.css');
</style>