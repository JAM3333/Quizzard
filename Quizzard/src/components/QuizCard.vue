<script setup>
  import AxiosGet from "../JavaScript/AxiosGet.js";
</script>

<template>
  <v-card
    width="15vw"
    color="secondary"
    height="30vh"
    class="d-flex align-center flex-column ml-8"
    elevation="12"
  >
    <v-img width="15vw" cover :src="image"></v-img>
    <v-toolbar color="primary" class="text-h1" :title="name">
      <v-btn icon="mdi-play"></v-btn>
      <v-menu location="end">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-horizontal" v-bind="props"></v-btn>
        </template>
        <v-list class="ml-1">
          <v-list-item>
            <v-btn icon="mdi-wrench" color="#07B5FF" @click="creator"></v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              icon="mdi-delete"
              v-bind="popup"
              color="#933"
              @click="popup = true"
            ></v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog v-model="popup" max-width="fit-content">
          <v-card title="Delete Quiz">
            <v-card-text>
              Do you really want to delete "{{ name }}"?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-card class="mr-3" color="buttonThird">
                <v-btn
                  :disabled="loading"
                  :loading="loading"
                  @click="
                    deleteQuiz
                  "
                  >DELETE</v-btn
                >
              </v-card>
              <v-card color="button">
                <v-btn @click="this.popup = false">CANCEL</v-btn>
              </v-card>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {

  props: {
    initFunction: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    popup: false,
  }),
  methods: {
    creator() {
      this.$router.push({ name: "QuizCreatorId", params: { quizID: this.id } });
    },
    async deleteQuiz() {
      this.loading = true;
      await AxiosGet(`delete from Questions where QuizIDFK=${this.id} and UserIDFK=1;`);
      await AxiosGet(`delete from Quizzes where QuizID=${this.id} and UserIDFK=1;`);
      this.initFunction();
      this.popup = false;
      this.loading = false;
    },
  },
};
</script>
