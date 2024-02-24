<template>
    <v-card width="15vw" color="secondary" height="30vh" class="d-flex align-center flex-column ml-8" elevation="12">
      <v-img
        width="15vw"
        cover
        :src="image"
      ></v-img>
   
      <v-toolbar color="primary" class="text-h1" :title="name"> 
        <v-btn icon="mdi-play"></v-btn>
        <v-btn icon="mdi-wrench"></v-btn>
      </v-toolbar>
    </v-card>
</template>


<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
}

</script>
