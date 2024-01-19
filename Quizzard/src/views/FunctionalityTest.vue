<script setup>
import SideBar from "../components/Navbar.vue";
import vuetify from "../plugins/vuetify.js";
</script>

<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center">
      <v-card width="80vw" height="auto" elevation="12">
        <v-toolbar color="primary" title="Create your Quiz"></v-toolbar>
        <v-toolbar
          class="text-medium-emphasis mt-2 font-weight-light"
          color="secondary"
          title="Create Account"
        ></v-toolbar>
        <v-form action="../components/db.php" mehod="post">
          <v-text-field
            label="Username"
            v-model="inputName"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="inputEmail"
            hide-details="auto"
            type="email"
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="inputPassword"
            hide-details="auto"
            type="password"
          ></v-text-field>
          <v-btn value="submit" @click="SendForm" class="mt-4 mb-4 text-h3" height="auto" color="button" >
          Create Account
        </v-btn>
        </v-form>
       
      
        <v-btn value="submit" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Return account by name
        </v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    fileData: [],
    customInstructions: "",
    difSelectedButton: "medium",
    answerSelectedButton: "content",
    panel: [0],
    inputName:"",
    inputEmail:"",
    inputPassword:"",
  }),
  methods: {
    ReadFiles() {
      const uploadedFiles = this.$refs.fileUpload.files;
      if (uploadedFiles.length > 0) {
        console.log(uploadedFiles[0]);
        this.fileData = [];
        for (let i = 0; i < uploadedFiles.length; i++) {
          var filetype = console.log(uploadedFiles[i].name);
          var reader = new FileReader();
          reader.readAsText(uploadedFiles[i]);
          reader.onload = () => {
            this.fileData.push([uploadedFiles[i].name, reader.result]);
          };
        }
        console.log(this.fileData);
      }
    },
    CreateQuiz(){

    },
    EditQuiz(){

    },
    SendForm(){

axios.get('http://localhost:3000')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
    }
  },
};
</script>
