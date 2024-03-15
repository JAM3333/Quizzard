<template>
  <v-expansion-panel
        :title="question"
        color="primary"
      >
      <v-expansion-panel-text>
        <v-card v-if="answerRating<=1" class="pa-4 d-flex align-center">
                <span class="text-medium-emphasis ms-1 font-weight-light">
                  Answer Rating
                </span>

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
      </v-expansion-panel-text>
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
    answerRatingNew:"0",
    answersData: "this.answers",
    answerSelectedButton: "content",
  }),
  methods: {
    handleInput (e) {
      console.log(this.answers)
    }
  }
}
</script>