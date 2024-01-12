<script setup>
import SideBar from "../components/Navbar.vue";
import vuetify from "../plugins/vuetify.js";
</script>

<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center" height="50vh">
      <v-card width="80vw" elevation="12">
    <v-toolbar color="primary" title="Create your Quiz"></v-toolbar>
    <v-toolbar class="text-medium-emphasis mt-2 font-weight-light" color="secondary" title="Upload your files"></v-toolbar>
    <v-file-input class="mt-4" clearable label="File input" variant="outlined" multiple show-size @change="ReadFiles" ref="fileUpload"></v-file-input>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel expand title="Quiz Options" color="secondary">
        <v-expansion-panel-text>
          <v-card class="pa-4 d-flex align-center">        

          <span class="text-medium-emphasis ms-1 font-weight-light">
            Quiz Difficulty
          </span>

          <v-spacer></v-spacer>



        <v-btn-toggle
          rounded="4"
          color="deep-purple-accent-3"
          v-model="difSelectedButton"
          group
          mandatory
        >
          <v-btn value="easy"> EASY </v-btn>

          <v-btn value="medium"> MEDIUM </v-btn>

          <v-btn value="difficult"> DIFFICULT </v-btn>
        </v-btn-toggle>

          </v-card>
          <v-card class="pa-4 d-flex align-center">        

          <span class="text-medium-emphasis ms-1 font-weight-light">
            Question Count
          </span>

          <v-spacer></v-spacer>



          <v-btn-toggle
          rounded="4"
          color="deep-purple-accent-3"
          group
          mandatory
          >
          <v-btn value="easy"> EASY </v-btn>

          <v-btn value="medium"> MEDIUM </v-btn>

          </v-btn-toggle>

          </v-card>
          <v-card class="pa-4 d-flex align-center">        

          <span class="text-medium-emphasis ms-1 font-weight-light">
            Answer Rating
          </span>

          <v-spacer></v-spacer>



          <v-btn-toggle
          rounded="4"
          color="deep-purple-accent-3"
          v-model="answerSelectedButton"
          group
          mandatory
          >
          <v-btn value="content"> Content (AI) </v-btn>

          <v-btn value="exact"> Exact (Wording) </v-btn>
          </v-btn-toggle>

          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel expand title="Custom Instructions" color="secondary">
        <v-expansion-panel-text>
          <v-textarea
            label="Your instructions"
          ></v-textarea>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
    </v-main>
  </v-app>
 
</template>


<script>
export default {
  data: () => ({
    fileData: [],
    customInstructions: "",
    difSelectedButton: 'medium',
    answerSelectedButton: 'content',
    panel: [0]
  }),
  methods: {
    ReadFiles(){
      const uploadedFiles = this.$refs.fileUpload.files;
      if (uploadedFiles.length > 0){
        console.log(uploadedFiles[0])
        this.fileData = [];
        for (let i = 0; i < uploadedFiles.length;i++){
          var filetype = 
          console.log(uploadedFiles[i].name);
          var reader = new FileReader();
          reader.readAsText(uploadedFiles[i]);
          reader.onload = () => {
            this.fileData.push([uploadedFiles[i].name,reader.result]);
          }
        }
        console.log(this.fileData)
      }
    },
  } 
};
</script>



