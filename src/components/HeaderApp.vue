<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faUser, faBars, faList, faHouseUser, faRightFromBracket, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

  const navLinks = [
    {
      to: '/',
      text: 'Dashboard',
      icon: 'fa-house-user'
    },
    {
      to: '/',
      text: 'Cosas por ver o hacer',
      icon: 'fa-list'
    },
    {
      to: '/',
      text: 'Mi Perfil',
      icon: 'fa-user'
    }
  ]

  const isActive = ref(false)

  const { userData, logOut } = useAuthStore()

  const handleLogOut = () => {
    isActive.value = false
    logOut()
  }

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
        @click="isActive = !isActive"
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
      :class="{ 'header__links--active': isActive }"
    >
      <button
        class="header__btn-close-menu"
        @click="isActive = false"
      >
        <font-awesome-icon :icon="['fa', 'circle-xmark']" />
      </button>
      <ul>
        <li
          v-for="link in navLinks"
          :key="`${link}-1`"
        >
          <font-awesome-icon :icon="link.icon" />
          <router-link :to="link.to">
            {{ link.text }}
          </router-link>
        </li>
      </ul>
      <button
        class="header__btn-log-out"
        @click="handleLogOut"
      >
        <font-awesome-icon icon="fa-right-from-bracket" />
        Cerrar sesión
      </button>
    </nav>
    <div class="header__account">
      <span v-if="userData?.userName">
        @{{ userData.userName }}
      </span>
      <img
        v-if="userData?.photo"
        :src="userData?.photo"
      >
    </div>
  </header>
</template>

<style lang="css" scoped>
@import url('@/assets/styles/06-components/header.css');
</style>
