import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/plugins/firebase.config'
import { getDocs, doc, addDoc, collection, deleteDoc, query, orderBy } from 'firebase/firestore'
import { toast } from 'vue3-toastify'
import { reset } from '@formkit/vue'
import type { PostAnswerInterface } from '@/models/Post'

export const useFeedStore = defineStore('feed', () => {
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

  const posts = ref<PostAnswerInterface[]>([])
  const loadingPost = ref(false)

  const sendPost = async (uid: string, payload: PostAnswerInterface) => {
    const userDocRef = doc(db, 'user-feed', uid)
  
    try {
      const postCollectionRef = collection(userDocRef, 'feed')
      const docPromise = addDoc(postCollectionRef, payload)
      await toast.promise(docPromise, {
        pending: 'Publicando post',
        success: 'Post publicado con éxito',
      }, {
        theme: 'colored'
      })
      reset('boxQuestionForm')
      await getAllPosts(uid)
    } catch (e) {
      toast.error('No se pudo publicar el post', { theme: 'colored' })
    }
  }

  const getAllPosts = async (uid: string) => {
    loadingPost.value = true
    posts.value = []
    const docRef = doc(db, 'user-feed', uid)
    const postCollectionRef = collection(docRef, 'feed')
    const postQuery = query(postCollectionRef,orderBy('date', 'desc'))
    try {
      const querySnapshot = await getDocs(postQuery)
      querySnapshot.forEach((doc) => {
        const payload = {
          ...doc.data(),
          postId: doc.id
        }
        posts.value = [...posts.value, payload as PostAnswerInterface]
      })
      loadingPost.value = false
    } catch (error) {
      loadingPost.value = false
      toast.error('Problemas al traer los posts', { theme: 'colored' })
    }
  }

  const deltePost = async (uid: string, postId: string) => {
    try {
      const userDocRef = doc(db, 'user-feed', uid)
      const postDocRef = doc(userDocRef, 'feed', postId)
      const deletePromise = deleteDoc(postDocRef)
      await toast.promise(deletePromise, {
        pending: 'Eliminando post',
        success: 'Post eliminado con éxito',
      }, {
        theme: 'colored'
      })
      await getAllPosts(uid)
    } catch (error) {
      toast.error('No se pudo eliminar el post', { theme: 'colored' })
    }
  }

  const getQuestion = (questionId: number) => emotionalQuestions.find((question) => question.id === questionId)?.question

  return {
    // State
    emotionalQuestions,
    posts,
    loadingPost,
    // Getters

    // Actions
    getAllPosts,
    sendPost,
    deltePost,
    getQuestion
  }
})