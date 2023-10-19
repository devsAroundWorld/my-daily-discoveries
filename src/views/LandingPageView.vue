<script setup lang="ts">
  import { ref, reactive, onMounted, onUnmounted } from 'vue'
  import { BarChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'
  import HealthStats from '@/mockup-data/health-stats.json'
  import WateringPlant from '@/assets/lottie/watering-plant.json'
  import location from '@/assets/img/location.png'
  import idea from '@/assets/img/idea.png'
  import file from '@/assets/img/file.png'
  import type { Vue3Lottie } from 'vue3-lottie'
  
  Chart.register(...registerables)
  Chart.defaults.color = '#ffff'

  export interface NavLinkInterface {
    to: string,
    text: string,
    active: boolean
  }
  
  const navLinks = reactive<NavLinkInterface[]>([{
    to: '#main',
    text: 'Bienvenido',
    active: true
  },{
    to: '#stats',
    text: 'Estadisticas',
    active: false
  },{
    to: '#about',
    text: 'Acerca de la App',
    active: false
  }])

  const services = [{
    id: 1,
    title: 'Explora sitios',
    description: 'Encuentra nuevas opciones cerca de ti de acuerdo a tus emociones con nuestro mapa interactivo.',
    iconSource: location
  },{
    id: 2,
    title: 'Escribe tus ideas',
    description: 'Todos los dias tendras un punto de partida para llevar tus pensamientos, sentimientos, metas y preocupaciones a tu espacio personal de Journaling.',
    iconSource: idea
  },{
    id: 3,
    title: 'Conoce más sobre ti',
    description: 'Lleva el registro sobre aquellas actividades, series, peliculas que te gustarian realizar o ver.',
    iconSource: file
  }]

  const mainSection = ref<HTMLElement | null>(null)
  const statsSection = ref<HTMLElement | null>(null)
  const aboutSection = ref<HTMLElement | null>(null)

  const mainReveal = reactive({
    isActive: true,
    element: mainSection
  })
  const statsReveal = reactive({
    isActive: false,
    element: statsSection
  })
  const aboutReveal = reactive({
    isActive: false,
    element: aboutSection
  })

  const labels = HealthStats.countries.map((country) => country.name)
  const depressionData = HealthStats.countries.map((country) => country.mental_health_issues.depression)
  const anxietyData = HealthStats.countries.map((country) => country.mental_health_issues.anxiety)
  const suicideRateData = HealthStats.countries.map((country) => country.mental_health_issues.suicide_rate)
  
  const statsOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        ticks: {
          callback: function(value: string) {
            return  value + '%'
          }
        }
      }
    }
  }

  const statsData = {
    labels: labels,
    datasets: [
      {
        label: 'Ansiedad',
        data: anxietyData,
        backgroundColor: ['#8C2FA3'],
      },
      {
        label: 'Depresión',
        data: depressionData,
        backgroundColor: ['#CDC1FF'],
      },
      {
        label: 'Tasa Suicidio',
        data: suicideRateData,
        backgroundColor: ['#B66BC1'],
      }
    ],
  }

  onMounted(()=>{
    window.addEventListener('scroll', () => {
      handleScroll(mainReveal)
      handleScroll(statsReveal)
      handleScroll(aboutReveal)
    })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', () => {})
  })

  const handleClickNavLink = (link: NavLinkInterface) => {
    navLinks.forEach((navLink)=>{
      navLink.active = false
    })
    link.active = !link.active
  }

  const handleScroll = (section: { isActive: boolean, element: HTMLElement | null }) => {
    const windowHeight = window.innerHeight
    const elementTop = section.element?.getBoundingClientRect()?.top
    if (elementTop !== undefined) {
      section.isActive = elementTop < windowHeight - 100
    }
  }
</script>

<template>
  <div>
    <header class="landing-header">
      <div class="landing-logo">
        <img
          src="@/assets/img/LogoMDD.png"
          alt="My Daily Discoveries"
        >
        <h1 class="logo-name">
          My Daily Discoveries
        </h1>
      </div>
      <nav class="landing-nav">
        <a
          v-for="link in navLinks"
          :key="link.to"
          :href="link.to"
          :class="{'active':link.active}"
          @click="handleClickNavLink(link)"
        >
          {{ link.text }}
        </a>
      </nav>
    </header>
    <section 
      id="main"
      ref="mainSection"
      class="main-container reveal"
      :class="{ active: mainReveal.isActive }"
    >
      <div class="main-text">
        <h2
          style="font-size: 40px;"
          class="title"
        >
          Conecta con tus emociones
        </h2>
        <p>Escribe sobre tu día a día y descubre hacia dónde puedes llegar cuando empiezas a conocerte más a ti mismo.</p>
        <router-link 
          v-slot="{ navigate }"
          to="/sign-up"
          custom
        >
          <FormKit
            type="button"
            label="Registrarme"
            role="link"
            @click="navigate"
          />
        </router-link>
        <p
          class="sign-in-text"
          style="font-style: normal;"
        >
          ¿Ya tienes una cuenta?
          <router-link
            class="sign-in-text_link"
            to="/sign-in"
          >
            Inicia sesión aquí
          </router-link>
        </p>
      </div>
      <div class="main-animation">
        <Vue3Lottie
          :animation-data="WateringPlant"
          pause-on-hover
        />
      </div>
    </section>
    <section
      id="stats"
      ref="statsSection"
      class="landing-stats reveal"
      :class="{ active: statsReveal.isActive }"
    >
      <div class="stats-graph">
        <BarChart
          :chart-data="statsData"
          :options="statsOptions"
        />
      </div>
      <div class="stats-text">
        <h3
          style="font-size: 32px;"
          class="title"
        >
          La Ansiedad y Depresión son el trastorno mental más frecuente
        </h3>
        <p>En América Latina la sufre el 5% de la población adulta, pero seis de cada diez no reciben tratamiento.</p>
      </div>
    </section>
    <section
      id="about"
      ref="aboutSection"
      class="landing-about reveal"
      :class="{ active: aboutReveal.isActive }"
    >
      <div class="about-text">
        <h3
          style="font-size: 32px;"
          class="title"
        >
          Acerca de My Daily Discoveries
        </h3>
        <p>
          Debemos observarnos y conocer a nuestro <span>"Yo"</span> para poder empezar a ser conscientes de las emociones que sentimos.<br>
          <span>My Daily Discoveries</span> surge de la propuesta de crear una herramienta de Gestión emocional.<br> Aqui encontraras un espacio
          para ti en el que puedas ser tu mismo.
        </p>
      </div>
      <div class="about-icons">
        <div
          v-for="service in services"
          :key="service.id"
          class="about-icons_container"
        >
          <div style="display: flex; justify-content: center;">
            <img :src="service.iconSource">
          </div>
          <span>{{ service.title }}</span>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </section>
    <footer class="landing-footer">
      <p>Hecho con 💜 por @analem devs</p>
      <p>Bootcamp Frontend Avanzado 2023</p>
    </footer>
  </div>
</template>

<style lang="css" scoped>
@import '@/assets/styles/05-objects/landingPage.css';
</style>