<script setup lang="ts">

/* import the fontawesome core */
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faStar} from '@fortawesome/free-regular-svg-icons'

  library.add(faStar)

</script>

<template>
  <main>
    Home View <font-awesome-icon icon="fa-solid fa-star" /><font-awesome-icon icon="fa-regular fa-star" />
  </main>
</template>
