<script setup lang="ts">
  
</script>

<template>
  <div class="header-nav">
    header-nav
  </div>
  <div class="profile-container">
    <div class="container user-info-container">
      <div class="user-picture">
        <picture>
          <source>
          <img src="@/assets/img/location.png">
        </picture>
      </div>
      <div class="user-info">
        <span style="text-align: end; margin-bottom: 15px;">Editar</span>
        <label>Nombre:</label>
        <span class="user-name">Andrea Serrato</span>
        <label>Mi Descripción:</label>
        <p>
          Esta es una descripcion acerca de mi
        </p>
      </div>
    </div>
    <div class="container user-feed-container">
      <p>user</p>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/05-objects/profile.css'
</style>