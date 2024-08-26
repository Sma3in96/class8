<template>
  <body>
    <div class="app">
      <SideBar v-if="noSideBar" />
      <div class="view">
        <router-view />
      </div>
    </div>
  </body>
</template>

<script setup>
import errorMessage from './components/errorMessage.vue';
import SideBar from './components/SideBar.vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const noSideBar = computed( () => route.name === 'notfound' || route.name === 'sign' ? false : true);




</script>

<style scoped>
.app {
  display: flex;
}

.view {
  background-color: rgb(230, 229, 229);
  width: 100%;
}
</style>
