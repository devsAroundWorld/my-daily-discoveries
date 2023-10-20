
<script setup lang="ts">
  import { reactive, onMounted, ref, computed } from 'vue'

  const emotionalQuestions = [
    {
      id: 1,
      question: '¿Cuándo fue la última vez que te sentiste profundamente agradecido por algo o alguien?',
    },
    {
      id: 2,
      question: '¿Qué experiencia te ha hecho sentir más orgulloso de ti mismo en tu vida?',
    },
    {
      id: 3,
      question: '¿Puedes compartir una ocasión en la que te sentiste abrumado por el miedo? ¿Cómo lo enfrentaste?',
    },
    {
      id: 4,
      question: '¿Cuál es un recuerdo que te provoque nostalgia? ¿Por qué es significativo para ti?',
    },
    {
      id: 5,
      question: '¿Has experimentado una pérdida importante en tu vida? ¿Cómo te has sentido y cómo has lidiado con esa pérdida?',
    },
  ]

  const boxQuestionValue = reactive({
    questionId: 0,
    answer: '',
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