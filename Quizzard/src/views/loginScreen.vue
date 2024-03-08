<template>
<v-app>
    <v-main color="background" class="d-flex align-center justify-center ga-8 mt-20 flex-column" height="100vh">
            <v-card width="34vw" color="secondary" height="400px" class="d-flex align-center flex-column mr-8" elevation="12">
                <v-btn-toggle v-model="toggle_one" mandatory width="34vw">
                    <v-btn @click="pageToLogin()" width="17vw">Login</v-btn>
                    <v-btn @click="pageToSignup()" width="17vw">Sign Up</v-btn>
                </v-btn-toggle> 

                <!-- LOGIN -->
                <form v-if="currentPageIsLogin" ref="form" @submit.prevent="login()" style="margin-top: 60px;">
                  <v-text-field
                  v-if="currentLoginMethodUsername"
                     v-model="username"
                     name="username"
                     label="Username"
                     type="text"
                     placeholder="username"
                     required
                  ></v-text-field>
                  <v-text-field
                  v-if="!currentLoginMethodUsername"
                     v-model="email"
                     name="email"
                     label="eMail"
                     type="email"
                     placeholder="username"
                     required
                  ></v-text-field>
                  <p @click="toggleEmailLogin()" v-if="currentLoginMethodUsername">login with email instead</p>
                  <p @click="toggleEmailLogin()" v-if="!currentLoginMethodUsername">login with username instead</p>

                  <v-text-field
                     v-model="password"
                     name="password"
                     label="Password"
                     type="password"
                     placeholder="password"
                     required
                  ></v-text-field>
                  <v-btn type="submit" class="mt-4" color="primary" value="log in" width="20vw">Login</v-btn>
               </form>

               <!-- SIGNUP -->
               <form v-if="currentPageIsSignup" ref="form" @submit.prevent="signup()" style="margin-top: 35px;">
                  <v-text-field 
                     v-model="email"
                     name="email"
                     label="eMail"
                     type="email"
                     placeholder="email"
                     required
                  ></v-text-field>

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
                  <v-btn type="submit" class="mt-4" color="primary" value="log in" width="20vw" :to="{path: '/home'}">Sign Up</v-btn>
               </form>
            </v-card>
    </v-main>
</v-app>


</template>
 
<style>
   p:hover {
      color: #07B5FF;
      cursor: pointer;
   }
   p {
      margin-top: 0px;
   }                    
</style>
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
       currentLoginMethodUsername: true,

       toggle_one: 0,
       
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
     toggleEmailLogin() {
         this.currentLoginMethodUsername = !this.currentLoginMethodUsername;
     }
   },
 };
 </script>