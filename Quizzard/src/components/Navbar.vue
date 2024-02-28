<template>
      <v-navigation-drawer
        expand-on-hover
        rail
        style="position: fixed;"
      >
        <v-list density="compact" nav>
          <v-list-item :to="{path: '/home'}"
            prepend-icon="mdi-alpha-q"
            title= "Qizzard"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>
<!-- Website for icons: https://pictogrammers.com/library/mdi/ -->
        <v-list density="compact" class="d-flex justify space-between flex-column" nav>
            <v-list-item prepend-icon="mdi-plus-circle-outline" title="Create Quiz" value="CreateQuiz" :to="{path: '/quizcreator'}"></v-list-item>
          <v-list-item prepend-icon="mdi-magnify" title="Discover" value="discover"></v-list-item>
          <v-list-item prepend-icon="mdi-folder" title="My Quizzes" value="myQuiz"></v-list-item>
          <v-divider></v-divider>
         <!-- <v-icon style="position: absolute; bottom: 10px;">mdi-logout</v-icon> -->
        </v-list>
        <template v-slot:append>
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-account" title="Username" value="Account"></v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
</template>

<script>
 export default {
  name: 'Navbar',
  Username: 'fish',
  };
</script>
