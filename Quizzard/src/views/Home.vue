<script setup>
  import QuizCard from "../components/QuizCard.vue";
</script>

<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center ga-8 mt-20 flex-column" height="100vh">
      <v-div class="d-flex align-center justify-space-between">
        <v-card width="34vw" color="secondary" height="40vh" class="d-flex align-center flex-column mr-8" elevation="12">
          <v-toolbar color="primary" class="text-h1" title="Recommendation 1"></v-toolbar>
        </v-card>
        <v-card width="34vw" color="secondary" height="40vh" class="d-flex align-center flex-column" elevation="12">
          <v-toolbar color="primary" title="Recommendation 2"></v-toolbar>
        </v-card>
    </v-div>
    <v-div class="d-flex align-center justify-center ga-8">
        <v-card width="70vw" color="secondary" height="fit-content" elevation="12">
          <v-data-iterator :items="quizData" :items-per-page="4" :search="search" >
            <template v-slot:header>
              <v-toolbar color="primary" title="Your Library" >
                <v-text-field
                  v-model="search"
                  clearable
                  density="comfortable"
                  hide-details
                  placeholder="Search"
                  prepend-inner-icon="mdi-magnify"
                  style="max-width: 300px"
                  variant="solo"
                  class="pr-2"
                ></v-text-field>
              </v-toolbar>
            </template>

            <template v-slot:default="{ items }">
              <v-container class="pa-2" fluid>
                <v-row dense>
                  <v-col v-for="item in items" :key="item.title" cols="auto">
                    <QuizCard class="fill-height"
                      :name="item.raw.QuizName"
                      :image="item.raw.QuizImage"
                      :id="item.raw.QuizID"
                    ></QuizCard>
                  </v-col>
                </v-row>
              </v-container>
            </template>
              
            <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
              <div class="d-flex align-center justify-center pa-4">
                <v-btn
                  :disabled="page === 1"
                  icon="mdi-arrow-left"
                  density="comfortable"
                  variant="tonal"
                  rounded
                  @click="prevPage"
                ></v-btn>

                <div class="mx-2 text-caption">
                  Page {{ page }} of {{ pageCount }}
                </div>

                <v-btn
                  :disabled="page >= pageCount"
                  icon="mdi-arrow-right"
                  density="comfortable"
                  variant="tonal"
                  rounded
                  @click="nextPage"
                ></v-btn>
              </div>
            </template>
        </v-data-iterator>
      </v-card>
    </v-div>
    </v-main>
    
  </v-app>
</template>
<script>
import SideBar from '../components/Navbar.vue'
import axios from "axios";

const apiUrl = "http://10.115.2.40:3004";

export default {
  name: 'App',
  mounted(){
    this.Initialize();
  },
  data: () => ({
    search: '',
    quizData: [], 
    userid: 1,
  }),
  methods: {
    async Initialize(){
      axios.get(`${apiUrl}/getQuizzes?format=json`,{params: {userid: 1}}).then((response) => {     //{sqlQuery: `select QuizName,QuizImage from Quizzes where UserIDFK=1`}
        this.quizData = response.data;
        console.log("answer from server::",this.quizData);
      })
      .catch((error) => {
        console.log("error recieved");
        console.error("Error with the GET request:", error)
      })
    },

  }
};


</script>



