<template>
  <v-expansion-panel
        :title="question"
        color="primary"
      >
      <v-expansion-panel-text v-for="(item, index) in this.answers" :key="item">
        <v-text-field
          :label="`Answer ${index}`"
          :model-value="item"
          @input="handleInput"
        ></v-text-field>
        </v-expansion-panel-text>
    </v-expansion-panel>
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
  data: () => ({
    answersData: "this.answers",
  }),
  methods: {
    handleInput (e) {
      console.log(this.answers)
    }
  }
}
</script>