<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { storeToRefs } from 'pinia'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faUser, faBars, faList, faHouseUser, faRightFromBracket, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

  const navLinks = [
    {
      to: '/user/dashboard',
      text: 'Dashboard',
      icon: 'fa-house-user'
    },
    {
      to: '/user/todo',
      text: 'Cosas por ver o hacer',
      icon: 'fa-list'
    },
    {
      to: '/user/my-profile',
      text: 'Mi Perfil',
      icon: 'fa-user'
    },
  ]

  const isActiveMenu = ref(false)

  const authStore = useAuthStore()
  const { logOut } = authStore
  const { userData } = storeToRefs(authStore)

  library.add(
    faUser,
    faBars,
    faRightFromBracket,
    faList,
    faHouseUser,
    faCircleXmark
  )
</script>

<template>
  <header class="header">
    <div class="header__menu">
      <button
        role="button"
        @click="isActiveMenu = !isActiveMenu"
      >
        <font-awesome-icon :icon="['fa', 'bars']" />
      </button>
      <img
        src="@/assets/img/LogoMDD.png"
        alt="LOGO MY DAILY DISCOVERIES APP"
      >
    </div>
    <nav
      role="menu"
      class="header__links"
      :class="{ 'header__links--active': isActiveMenu }"
    >
      <button
        class="header__btn-close-menu"
        @click="isActiveMenu = false"
      >
        <font-awesome-icon :icon="['fa', 'circle-xmark']" />
      </button>
      <ul>
        <router-link
          v-for="link in navLinks"
          :key="`${link}-1`"
          :to="link.to"
        >
          <li>
            <font-awesome-icon :icon="link.icon" />
            <span>
              {{ link.text }}
            </span>
          </li>
        </router-link>
      </ul>
    </nav>
    <div class="header__account">
      <div
        v-if="userData?.userName"
        class="header__account--info"
      >
        <span>
          Bienvenido: <b>@{{ userData.userName }}</b>!
        </span>
        <button
          class="header__account--logout"
          @click="logOut"
        >
          Cerrar sesion
        </button>
      </div>
      <img
        v-if="userData?.photo"
        :src="userData.photo"
      >
    </div>
  </header>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/06-components/header.css');
</style>
