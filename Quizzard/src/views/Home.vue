<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center ga-8 mt-20 flex-column" height="100vh">
      <v-div class="d-flex align-center justify-space-between ga-15">
        <v-card width="35vw" color="secondary" height="40vh" class="d-flex align-center flex-column" elevation="12">
          <v-toolbar color="primary" class="text-h1" title="Recommnedation 1"></v-toolbar>
        </v-card>
        <v-card width="35vw" color="secondary" height="40vh" class="d-flex align-center flex-column" elevation="12">
          <v-toolbar color="primary" title="Recommnedation 2"></v-toolbar>
        </v-card>
    </v-div>
    <v-div class="d-flex align-center justify-center ga-8">
        <v-card width="74vw" color="secondary" height="40vh" class="d-flex align-center flex-column" elevation="12">
          <v-toolbar color="primary" title="Your Library"></v-toolbar>
        </v-card>
    </v-div>
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



