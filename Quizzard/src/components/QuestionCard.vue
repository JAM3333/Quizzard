<template>
   <v-card width="75vw" color="secondary" height="30vh" class="d-flex align-center flex-column ml-8" elevation="12">   
    <v-toolbar
      class="text-medium-emphasis font-weight-light"
      color="secondary"
      :title="question"
    ></v-toolbar>  
  </v-card>
  </template>
   
<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    answerRating: {
      type: Number,
      required: true,
    },
    answers: {
      type: Object,
      required: false,
    },
  },
}
</script>