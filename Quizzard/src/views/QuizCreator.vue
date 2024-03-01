<script setup>
import SideBar from "../components/Navbar.vue";
import QuestionCard from "../components/QuestionCard.vue";
import OpenAI from "openai";
import { OPENAI_API_KEY } from '../config';
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

        <v-btn value="submit" v-on:click="CreateQuiz" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Generate Quiz
        </v-btn>
      </v-card>
      <v-card width="80vw" color="secondary" height="85vh" class="d-none align-center flex-column" id="quizEdit" elevation="12">
        <v-toolbar color="primary" title="Quiz">  
          <v-text-field
            v-model="quizName"
            hide-details
            density="compact"
            type="text"
            class="mr-4"
          ></v-text-field>
        </v-toolbar> 
        <v-card width="80vw" height="80vh" style="background-color: rgba(255, 255, 255, 0) !important; border-color: white !important" class="mt-5 mb-4 overflow-y-auto">
          <v-data-iterator :items="returnedData.Questions">
            <template v-slot:default="{ items }">
                  <v-expansion-panels v-for="item in items" :key="item.title" cols="auto">
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
        <v-btn value="submit" class="mt-4 mb-4 text-h3" height="auto" color="button">
          Generate Quiz
        </v-btn>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    fileData: [],
    customInstructions: "",
    difSelectedButton: "medium",
    answerSelectedButton: "content",
    sliderMultipleChoice: 2,
    sliderText: 8,
    sliderMin: 0,
    sliderMax: 16,
    panel: [0],
    quizName: "",
    returnedData: {
      "QuizName": "Kulinarische Fähigkeiten Herausforderung",
      "QuizDifficulty": 0, // Einfach=0; Mittel=1; Schwierig=2
      "AnswerRating": 0, // KI=0; Formulierung=1
      "QuizImage": "koch-thema-bild.png",
      "Questions": [
        {
          "Question": "Welches dieser Mittel ist ein Treibmittel beim Backen?",
          "Type": 1, // Mehrfachauswahl = 1
          "AnswerRating": 3, // Richtige Antwort ist "Backsoda" + 1
          "Answers": {
            "1": "Salz",
            "2": "Zucker",
            "3": "Backsoda",
            "4": "Wasser"
          }
        },
        {
          "Question": "Wie heißt die Kochtechnik, bei der Lebensmittel kurz in kochendes Wasser getaucht und dann in kaltes Wasser gelegt werden?",
          "Type": 1, // Mehrfachauswahl = 1
          "AnswerRating": 3, // Richtige Antwort ist "Blanchieren" + 1
          "Answers": {
            "1": "Braten",
            "2": "Blanchieren",
            "3": "Dämpfen",
            "4": "Schmoren"
          }
        },
        {
          "Question": "Was ist die Hauptzutat in einem traditionellen italienischen Pesto?",
          "Type": 1, // Mehrfachauswahl = 1
          "AnswerRating": 2, // Richtige Antwort ist "Basilikum" + 1
          "Answers": {
            "1": "Basilikum",
            "2": "Petersilie",
            "3": "Koriander",
            "4": "Minze"
          }
        },
        {
          "Question": "Was bedeutet 'al dente' beim Kochen von Pasta?",
          "Type": 1, // Mehrfachauswahl = 1
          "AnswerRating": 3, // Richtige Antwort ist "Bissfest" + 1
          "Answers": {
            "1": "Vollständig gekocht",
            "2": "Bissfest",
            "3": "Überkocht",
            "4": "Ungekocht"
          }
        },
        {
          "Question": "Welches dieser Fette gilt als das gesündeste zum Kochen?",
          "Type": 1, // Mehrfachauswahl = 1
          "AnswerRating": 2, // Richtige Antwort ist "Olivenöl" + 1
          "Answers": {
            "1": "Butter",
            "2": "Olivenöl",
            "3": "Schmalz",
            "4": "Pflanzenfett"
          }
        },
        {
          "Question": "Beschreibe den Prozess des Karamellisierens von Zwiebeln.",
          "Type": 0, // Text = 0
          "AnswerRating": 0,
          "Answers": {"1": "Langsames Kochen von Zwiebeln, bis sie tiefbraun und gesüßt sind"}
        },
        {
          "Question": "Wie heißt die Methode, Fleisch langsam in eigenem Fett zu garen?",
          "Type": 0, // Text = 0
          "AnswerRating": 0,
          "Answers": {"1": "Confit"}
        },
        {
          "Question": "Nenne eine traditionelle Methode zur Konservierung von Zitronen.",
          "Type": 0, // Text = 0
          "AnswerRating": 0,
          "Answers": {"1": "Salzen und Fermentieren im Glas"}
        }
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
          messages: [{ role: "system", content: "Guten Tag" }],
          model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0]);
      }

      main();
    },
    CreateQuiz(){
      document.getElementById('quizCreate').classList.remove("d-flex");
      document.getElementById('quizCreate').classList.add("d-none");
      document.getElementById('quizEdit').classList.remove("d-none");
      document.getElementById('quizEdit').classList.add("d-flex");
      this.quizName = this.returnedData.QuizName;       
      this.APICall();  

    },
    EditQuiz(){

    },
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