<script setup>
  import QuizCreator from "../views/QuizCreator.vue";
</script>

<template>
  <v-expansion-panel
    color="primary"
  >
    <v-expansion-panel-title>
      <v-btn
        class="mr-2"
        icon="mdi-delete"
        color="#933"       
        @click.stop="removeQuestion(index)"
      ></v-btn>
      <v-text-field
        v-model="questionNew"
        hide-details
        @input.stop="updateQuestion(index,questionNew,answerRatingNew)"
        density="compact"
        type="text"
        class="mr-4"
      ></v-text-field>
      <v-card v-if="type==0" class="d-flex mr-3 align-center">
        <v-spacer></v-spacer>
        <v-btn-toggle
          rounded="4"
          color="button"
          v-model="answerRatingNew"
          @click.stop="updateQuestion(index,questionNew,answerRatingNew)"
          group
          mandatory
        >
          <v-btn value:0> Content (AI) </v-btn>
          <v-btn value:1> Exact (Wording) </v-btn>
        </v-btn-toggle>
      </v-card>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div class="d-flex flex-row .justify-space-between" v-for="(item, indexAnswer) in answers" :key="item">
        <v-text-field class="flex-grow-1"
        :label="`Answer ${parseInt(indexAnswer)+1}`"
        v-model="answersNew[parseInt(indexAnswer)]"
        @input.stop="updateQuestion(index,questionNew,answerRatingNew)"
        ></v-text-field> 
        <v-checkbox v-if="type==1" class="flex-grow-0 ml-2" :value=indexAnswer+1 v-model="answerRatingNew" @input="updateAnswerRating"
        ></v-checkbox>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
   
<script>

export default {
  props: {
    updateQuestion: {
      type: Function,
      required: true,
    },
    removeQuestion: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
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
  mounted(){
    this.questionNew = this.question;
    this.answerRatingNew = this.answerRating;
    this.answersNew[0] = this.answers[0];
    this.answersNew[1] = this.answers[1];
    this.answersNew[2] = this.answers[2];
    this.answersNew[3] = this.answers[3];
  },
  data: () => ({
    answerRatingNew:0,
    answersNew: {},
    questionNew: "",
  }),
  methods: {
    updateAnswerRating(){
      if (!this.answerRatingNew){
        this.answerRatingNew = 1
      }
    }
  }
}
</script>