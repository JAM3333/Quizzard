<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center ga-8" width="auto">
      <v-card width="35vw" height="auto" elevation="12">
        <v-toolbar></v-toolbar>
      </v-card>
      <v-card width="35vw" height="auto" elevation="12">
        <v-toolbar></v-toolbar>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>


import SideBar from '../components/Navbar.vue'

export default {

name: 'App',

components: {
SideBar
},
}

</script>



