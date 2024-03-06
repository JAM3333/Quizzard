<template>
<v-app>
    <SideBar></SideBar>
    <v-main color="background" class="d-flex align-center justify-center ga-8 mt-20 flex-column" height="100vh">
            <v-card width="34vw" color="secondary" height="40vh" class="d-flex align-center flex-column mr-8" elevation="12">
                <v-btn-toggle v-model="toggle_one" mandatory width="34vw">
                    <v-btn @click="pageToLogin()" width="17vw">Login</v-btn>
                    <v-btn @click="pageToSignup()" width="17vw">Sign Up</v-btn>
                </v-btn-toggle> 
            </v-card>
    </v-main>
</v-app>
    <!--
    <v-app>
       <v-main>
          <v-container fluid fill-height>
             <v-layout align-center justify-center>
                   <v-card class="elevation-12">
                      <v-toolbar dark color="primary">
                         <v-toolbar-title>Login form</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                      <form ref="form" @submit.prevent="login()">
                             <v-text-field
                               v-model="username"
                               name="username"
                               label="Username"
                               type="text"
                               placeholder="username"
                               required
                            ></v-text-field>
                            
                             <v-text-field
                               v-model="password"
                               name="password"
                               label="Password"
                               type="password"
                               placeholder="password"
                               required
                            ></v-text-field>
                            <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                       </form>
                      </v-card-text>
                   </v-card>
             </v-layout>
          </v-container>
       </v-main>
    </v-app>
    -->
 </template>
 
 <script>
 export default {
   name: "Login",
   data() {
     return {
       username: "",
       password: "",
       email: "",
       currentPageIsLogin: true,
       currentPageIsSignup: false,
     };
   },
   methods: {
     login() {
       const { username } = this;
       console.log(username + " logged in")
     },
     signup() {
       const { username } = this;
       console.log(username + " signed up")
     },
     pageToSignup() {
        this.currentPageIsLogin = false;
        this.currentPageIsSignup = true;
     },
     pageToLogin() {
        this.currentPageIsLogin = true;
        this.currentPageIsSignup = false;
     },
   },
 };
 </script>