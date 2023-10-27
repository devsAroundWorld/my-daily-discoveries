
<script setup lang="ts">
  import { reactive, onMounted, ref, computed, onBeforeUnmount} from 'vue'
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
  const secondsRemaining = ref(600)
  const intervalId = ref(0)

  const currentQuestion = computed(() => emotionalQuestions[questionIndex.value].question)

  const formattedRemainingTime = computed(() => {
    const minutes = Math.floor(secondsRemaining.value / 60)
    const seconds = secondsRemaining.value % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  })

  const changeQuestion = () => {
    questionIndex.value = (questionIndex.value + 1) % emotionalQuestions.length
    boxQuestionValue.questionId = emotionalQuestions[questionIndex.value].id
    secondsRemaining.value = 600
  }

  const decrementSecondsRemaining = () => {
    secondsRemaining.value -= 1
    localStorage.setItem('secondsRemainingState', JSON.stringify(secondsRemaining.value))
  }

  const setSecondsRemaining = () => {
    const storedState = localStorage.getItem('secondsRemainingState')
    if (storedState) {
      secondsRemaining.value = JSON.parse(storedState)
    }
    
    intervalId.value = setInterval(() => {
      decrementSecondsRemaining()
      if (secondsRemaining.value === 0) {
        changeQuestion()
      }
    }, 1000)
  }

  onMounted(() => {
    changeQuestion()

    setSecondsRemaining()
  })

  onBeforeUnmount(() => {
    clearInterval(intervalId.value)
  })
</script>

<template>
  <div class="box-question">
    <p>{{ currentQuestion }}</p>
    <p class="box-question__remaining-tiem">
      Faltan {{ formattedRemainingTime }} minutos para el próximo cambio de pregunta.
    </p>
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
        help="La respuesta debe de tener un minimum de 50 caracteres."
        validation="required|length:0,156"
        :validation-messages="{
          length: 'La respuesta no puede tener más de 156 caracteres.',
        }"
      />
      <div class="box-question__counter-words">
        Contador de palabras: {{ `${boxQuestionValue.answer ? boxQuestionValue.answer?.length : 0} / 156` }}
      </div>
      <FormKit
        type="submit"
        label="Publicar respuesta"
        :disabled="!(boxQuestionValue.answer?.length >= 50 && valid)"
      />
    </FormKit>
  </div>
</template>


<style lang="css" scoped>
@import url('@/assets/styles/06-components/boxQuestion.css');
</style>