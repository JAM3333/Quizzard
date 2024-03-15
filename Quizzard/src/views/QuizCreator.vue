<script setup>
import SideBar from "../components/Navbar.vue";
import QuestionCard from "../components/QuestionCard.vue";
import OpenAI from "openai";
import { OPENAI_API_KEY } from '../config';
import axios from 'axios';

</script>

<template>
  <v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center">
      <v-card width="80vw" color="secondary" height="85vh" class="d-flex align-center flex-column" id="quizCreate" elevation="12">
        <v-toolbar color="primary" title="Create your Quiz"></v-toolbar>
        <v-card width="80vw" outlined color="transparent" class="mt-5 mb-4">
          <v-toolbar
            class="text-medium-emphasis font-weight-light"
            color="primary"
            title="Upload your files"
          ></v-toolbar>
          
          <v-file-input
            class="mt-4"
            clearable
            label="File input"
            variant="outlined"
            multiple
            show-size
            name="fileo"
            @change="ReadFiles"
            ref="fileUpload"
          ></v-file-input>
        </v-card>
        <v-expansion-panels v-model="panel">
          <v-expansion-panel expand title="Quiz Options" color="primary">
            <v-expansion-panel-text :style="{background: $vuetify.theme.themes.background}">
              <v-card class="pa-4 d-flex align-center">
                <span class="text-medium-emphasis ms-1 font-weight-light">
                  Quiz Difficulty
                </span>

                <v-spacer></v-spacer>

                <v-btn-toggle
                  rounded="4"
                  color="button"
                  v-model="difSelectedButton"
                  group
                  mandatory
                >
                  <v-btn value="easy"> EASY </v-btn>

                  <v-btn value="medium"> MEDIUM </v-btn>

                  <v-btn value="difficult"> DIFFICULT </v-btn>
                </v-btn-toggle>
              </v-card>
              <v-card class="pa-4 d-flex align-center fit-content">
                <span class="text-medium-emphasis ms-1 font-weight-light">
                  Question Count
                </span>

                <v-spacer></v-spacer>

                <v-card class="d-flex mr-4  .justify-space-between flex-column" width="20vw">
                  <v-toolbar
                    class="text-medium-emphasis font-weight-light"
                    color="secondary"
                    title="Multiple Choice"
                  ></v-toolbar>
                  <v-slider
                    v-model="sliderMultipleChoice"
                    :max="sliderMax"
                    :min="sliderMin"
                    :step="1"
                    class="pl-2"
                    hide-details
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="sliderMultipleChoice"
                        hide-details
                        single-line
                        :max="sliderMax"
                        :min="sliderMin"
                        :step="1"
                        density="compact"
                        type="number"
                        style="width: 5vw"
                      ></v-text-field>
                    </template>
                  </v-slider>                  
                </v-card>     
                <v-card class="d-flex mr-4  .justify-space-between flex-column" width="20vw">
                  <v-toolbar
                    class="text-medium-emphasis font-weight-light"
                    color="secondary"
                    title="Text"
                  ></v-toolbar>
                  <v-slider
                    v-model="sliderText"
                    :max="sliderMax"
                    :min="sliderMin"
                    :step="1"
                    class="pl-2"
                    hide-details
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="sliderText"
                        hide-details
                        single-line
                        :max="sliderMax"
                        :min="sliderMin"
                        :step="1"
                        density="compact"
                        type="number"
                        style="width: 5vw"
                      ></v-text-field>
                    </template>
                  </v-slider>                  
                </v-card>           
              </v-card>
              <v-card class="pa-4 d-flex align-center">
                <span class="text-medium-emphasis ms-1 font-weight-light">
                  Answer Rating
                </span>

                <v-spacer></v-spacer>

                <v-btn-toggle
                  rounded="4"
                  color="button"
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

        <v-btn value="submit" v-on:click="GenerateQuiz" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Generate Quiz
        </v-btn>
      </v-card>
      <v-card width="80vw" color="secondary" height="85vh" class="d-none align-center flex-column" id="quizEdit" elevation="12">
        <v-toolbar color="primary" title="Quiz">  
          <v-text-field
            v-model="this.returnedData.QuizName"
            hide-details
            density="compact"
            type="text"
            class="mr-4"
          ></v-text-field>
        </v-toolbar> 
        <v-card width="80vw" height="80vh" style="background-color: rgba(255, 255, 255, 0) !important; border-color: white !important" class="mt-5 mb-4 overflow-y-auto">
          <v-data-iterator :items="returnedData.Questions">
            <template v-slot:default="{ items }">
                  <v-expansion-panels  class="overflow-y-auto" v-for="item in items" :key="item.title" cols="auto">
                    <QuestionCard class="fill-height mt-3"
                      :question="item.raw.Question"
                      :type="item.raw.Type"
                      :answerRating="item.raw.AnswerRating"
                      :answers="item.raw.Answers"
                    ></QuestionCard>
                  </v-expansion-panels>
            </template>
          </v-data-iterator>
        </v-card> 
        <v-btn v-if="mode==0" value="submit" v-on:click="CreateQuiz" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Create Quiz
        </v-btn>
        <v-btn v-else value="submit" v-on:click="EditQuiz" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Edit Quiz
        </v-btn>
      </v-card>
    </v-main>
    <input id="update" v-model="update" type="bool">
  </v-app>
</template>

<script>
import axios from "axios";

const apiUrl = "http://10.115.2.40:3004";

export default {
  
  mounted(){
    this.Initialize();
  },
  data: () => ({
    mode: 0, //0=create; 1 = edit
    update: false,
    quizID: -1,
    fileData: [],
    customInstructions: "",
    difSelectedButton: "medium",
    answerSelectedButton: "content",
    sliderMultipleChoice: 2,
    sliderText: 8,
    sliderMin: 0,
    sliderMax: 16,
    panel: [0],
    returnedData: 
      {"QuizName": "Your Quiz Name",
      "QuizDifficulty": 0, // easy=0; medium=1; difficult=2
      "AnswerRating": 0, // KI=0; Formulierung=1
      "QuizImage": "image.png",
      "Questions": [
      {
          "Question": "Frage 1?",
          "Type": 1, // Mehrfachauswahl = 1
          "AnswerRating": 3, // Richtige Antwort ist Answer 3
          "Answers": {
            "1": "Salz",
            "2": "Zucker",
            "3": "Backsoda",
            "4": "Wasser"
          }
        },
        {
          "Question": "Frage 2?",
          "Type": 0, // Textantwort = 0
          "AnswerRating": 0,
          "Answers": {
            "1": "Viel Wasser"
          }
        },
      ]
    }
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
    APICall(){
      const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
      
      async function main() {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: `Generate a quiz from the attached file and the following instructions: ${this.customInstructions}. Create ${this.sliderText} Text-Questions and ${sliderMultipleChoice} Multiple-choice-questions with a difficulty of ${this.difSelectedButton} using the following json format (Example):   {"QuizName": "Name",
      "QuizDifficulty": 0, // easy=0; medium=1; difficult=2
      "AnswerRating": 0, // KI=0; Formulierung=1
      "QuizImage": "image.png",
      "Questions": [
        {
          "Question": "Frage 1?",
          "Type": 1, // Mehrfachauswahl = 1
          "AnswerRating": 3, // Richtige Antwort ist Answer 3
          "Answers": {
            "1": "Salz",
            "2": "Zucker",
            "3": "Backsoda",
            "4": "Wasser"
          }
        },
        {
          "Question": "Frage 2?",
          "Type": 0, // Textantwort = 0
          "AnswerRating": 0,
          "Answers": {
            "1": "Viel Wasser"
          }
        },
      ]
    }`  }],
          model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0]);
      }

      main();
    },
    uploadFile() {
    const formData = new FormData();
    let fileUploadLength = this.$refs.fileUpload.files.length;

    for(let i=0;i<fileUploadLength;i++)
    {
      formData.append('file', this.$refs.fileUpload.files[i]);
    }

    axios.post('http://10.115.2.38:3002/api/Upload', formData)
      .then(response => {
        console.log(response.data);
    })
      .catch(error => {
        console.error('Error uploading file:', error);
    });
    },
    GenerateQuiz(){
      this.SwitchPage();
      this.quizName = this.returnedData.QuizName;       
      //this.uploadFile();
      // this.APICall();  
      console.log(this.fileData);
      console.log(this.returnedData);
    },
    async CreateQuiz(){
      if (this.mode==0){
        var insertData = await this.ApiGet(`insert into Quizzes (UserIDFK,QuizName,QuizDifficulty,AnswerRating,QuizImage) VALUES (1,'${this.returnedData.QuizName}',${this.returnedData.QuizDifficulty},${this.returnedData.AnswerRating},'https://th.bing.com/th/id/R.385e7dbec0e6c313cfd6dc3b6fff1c95?rik=Ps5ZHpTWtX4y3A&pid=ImgRaw&r=0');`)
        for (let i=0;i<this.returnedData.Questions.length;i++){
          await this.ApiGet(`insert into Questions (QuizIDFK,Question,QuestionType,AnswerRating,Answers) VALUES (${insertData.insertId},'${this.returnedData.Questions[i].Question}',${this.returnedData.Questions[i].Type},${this.returnedData.Questions[i].AnswerRating},'${this.returnedData.Questions[i].Answers}');`)
        } 
      } 
    },
    async EditQuiz(){

    },
    SwitchPage(){
      document.getElementById('quizCreate').classList.remove("d-flex");
      document.getElementById('quizCreate').classList.add("d-none");
      document.getElementById('quizEdit').classList.remove("d-none");
      document.getElementById('quizEdit').classList.add("d-flex");
      this.quizName = this.returnedData.QuizName;          
    },
    EditQuiz(){

    },
    async Initialize(){
      if(this.$route.params.quizID){
        this.mode = 1;
        this.quizID = this.$route.params.quizID;
        this.SwitchPage();
        var sqlData = await this.ApiGet(`select * from Quizzes where QuizID=`+this.quizID);
        if (sqlData[0].UserIDFK == 1){
          sqlData = sqlData[0]
          this.quizName = sqlData.QuizName;
          this.returnedData.QuizName = sqlData.QuizName;
          console.log(sqlData.QuizName);
          console.log(this.returnedData.QuizName)
          this.returnedData.QuizDifficulty = sqlData.QuizDifficulty;
          this.returnedData.AnswerRating = sqlData.AnswerRating;
          this.returnedData.QuizImage = sqlData.QuizImage;
          sqlData = await this.ApiGet( `select * from Questions where QuizIDFK=`+this.quizID);
          for (let i=0;i<sqlData.length;i++){
            let obj =  {  "Question": sqlData[i].Question,
                          "Type": sqlData[i].QuestionType,
                          "AnswerRating":  sqlData[i].AnswerRating,
                          "Answers": JSON.parse(sqlData[i].Answers)};
            this.returnedData.Questions[i] = obj;
          }
     
        }
          
        console.log(this.returnedData)
        this.update = true;
        this.update = false;
      } else {
        this.mode=0;
      };
    },
    async ApiGet(query){
      let sqlData = {}
      await axios.get(`${apiUrl}/sql?format=json`,{params: {sqlQuery:query}}).then((response) => {    
        console.log("answer from server::",response.data);
        sqlData = response.data
      })
      .catch((error) => {
        console.log("error recieved");
        console.error("Error with the GET request:", error)
      })
      return sqlData
    }
  },
};
</script>
<style scoped>
.questionContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute; 
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>