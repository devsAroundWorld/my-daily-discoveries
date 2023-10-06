<script setup lang="ts">
  import type { Vue3Lottie } from 'vue3-lottie'
  import WateringPlant from '@/assets/lottie/watering-plant.json'
  import { ref, onMounted } from 'vue'
  import location from '@/assets/img/location.png'
  import idea from '@/assets/img/idea.png'
  import file from '@/assets/img/file.png'
  
  export interface NavLinkInterface {
    to: string,
    text: string,
    active: boolean
  }
  
  const navLinks = ref<NavLinkInterface[]>([{
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
    description: 'Lleva el registro sobre aquellas actividades, series, peliculas pendientes por realizar o ver.',
    iconSource: file
  }]

  onMounted(()=>{
    window.addEventListener('scroll', handleScroll)  
  })
  
  const handleClickNavLink = (link: NavLinkInterface) => {
    navLinks.value.forEach((navLink)=>{
      navLink.active = false
    })
    link.active = !link.active
  }

  const handleScroll = () => {
    const reveals = document.querySelectorAll('.reveal')

    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight
      const elementTop = reveals[i].getBoundingClientRect().top
      const elementVisible = 120

      //console.log(elementBottom)
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active')
      } else {
        reveals[i].classList.remove('active')
      }

  
    }


  }

</script>

<template>
  <header class="landing-header">
    <div class="landing-logo">
      <img
        src="@/assets/img/LogoMDD.png"
        alt="My Daily Discoveries"
      >
      <h1>My Daily Discoveries</h1>
    </div>
    <nav class="landing-nav">
      <a
        v-for="link in navLinks"
        :key="link.to"
        :href="link.to"
        :class="{'active':link.active}"
        @click="handleClickNavLink(link)"
      >{{ link.text }}</a>
    </nav>
  </header>
  <section 
    id="main"
    class="main-container reveal active"
  >
    <div class="main-text">
      <h2>Conecta con tus emociones</h2>
      <p>Escribe sobre tu día a día y descubre hacia dónde puedes llegar cuando empiezas a conocerte más a ti mismo.</p>
      <FormKit
        type="button"
        label="Registrarme / Iniciar Sesión"
      />
    </div>
    <div class="main-animation">
      <Vue3Lottie
        :animation-data="WateringPlant"
        :pause-on-hover="true"
      />
    </div>
  </section>
  <section
    id="stats"
    class="landing-stats reveal"
  >
    <div class="stats-graph" />
    <div class="stats-text">
      <h3>La Depresión es el trastorno mental más frecuente</h3>
      <p>En América Latina y el Caribe la sufre el 5% de la población adulta, pero seis de cada diez no reciben tratamiento.</p>
    </div>
  </section>
  <section
    id="about"
    class="landing-about reveal"
  >
    <div class="about-text">
      <h3>Acerca de My Daily Discoveries</h3>
      <p>
        Debemos observarnos y conocer a nuestro yo para poder empezar a ser conscientes de las emociones que sentimos.<br><br>
        <span>My Daily Discoveries</span> surge de la propuesta de crear una herramienta de Gestión emocional. Aqui encontraras un espacio
        para ti en el que puedas ser tu mismo.
      </p>
    </div>
    <div class="about-icons">
      <div
        v-for="service in services"
        :key="service.id"
        class="about-icons_container"
      >
        <!--<img :src="dynamicImageSource(service.id)">-->
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
</template>

<style scoped>
@import '@/assets/styles/06-components/landingPage.css';
@import '@/assets/styles/06-components/formkitCustom.css';
</style>