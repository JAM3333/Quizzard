<template>
   <v-card width="75vw" color="secondary" height="30vh" class="d-flex align-center flex-column ml-8" elevation="12">   
    <v-expansion-panels>
      <v-expansion-panel
            expand
            title="Custom Instructions"
            color="primary"
          >
            <v-expansion-panel-text>
              <v-textarea label="Your instructions"></v-textarea>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
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