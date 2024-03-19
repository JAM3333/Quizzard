<template>
  <v-expansion-panel
    color="primary"
  >
    <v-expansion-panel-title>
      <v-text-field
        :model-value="question"
        @input="handleInput"
        hide-details
        density="compact"
        type="text"
        class="mr-4"
      ></v-text-field>
      <v-card v-if="answerRating<=1" class="d-flex mr-3 align-center">
        <v-spacer></v-spacer>
        <v-btn-toggle
          rounded="4"
          color="button"
          v-model="answerRatingNew"
          group
          mandatory
        >
          <v-btn value="0"> Content (AI) </v-btn>
          <v-btn value="1"> Exact (Wording) </v-btn>
        </v-btn-toggle>
      </v-card>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-text-field v-for="(item, index) in this.answers" :key="item"
        :label="`Answer ${index+1}`"
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
    answerRatingNew:"0",
    answersData: "this.answers",
    answerSelectedButton: "content",
    questionNew: "",
  }),
  methods: {
    handleInput (e) {
      console.log(this.answers)
      console.log(e)
    },
    removeQuiz() {

    }
  }
}
</script>