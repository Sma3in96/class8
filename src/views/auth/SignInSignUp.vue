<template>
  <div class="app">
    <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" id="container">
      <div class="form-container sign-up-container">
        <form @submit.prevent>
          <h1>Create Account</h1>
          <input v-model="registerName" type="text" placeholder="Name" required />
          <input v-model="registerEmail" type="email" placeholder="Email" required />
          <input v-model="registerPassword" type="password" placeholder="Password" required />
          <errorMessage v-if="error" :message="error" />
          <button @click="handleRegister" >Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent>
          <h1>Sign in</h1>
          <input v-model="userEmail" type="email" placeholder="Email" required />
          <input v-model="userPassword" type="password" placeholder="Password" required />
          <errorMessage v-if="error" :message="error" />
          <button @click="handlelogin">Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Hello, Friend!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" @click="togglePanel">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Welcome !</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" @click="togglePanel">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { useUserStore } from '../../stores/userStore';
import router from '../../router';

const isRightPanelActive = ref(false);
function togglePanel() {
  isRightPanelActive.value = !isRightPanelActive.value;
  error.value = ""
}


const authStore = useAuthStore();
const userStore = useUserStore();
const userEmail = ref('');
const userPassword = ref('');
const error = ref('');

async function handlelogin () {
  await authStore.handleSignIn(userEmail.value, userPassword.value); 
  if (authStore.$state.error  ) {
    error.value = "Invalid Email or Password";
    router.push('/');
    return;
  } else {
    await userStore.setUserInfos(authStore.$state.user.uid)
    error.value = '';
    isRightPanelActive.value = false;
    router.push("/dashboard/home")
  }
}

const registerName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');

async function handleRegister () {
  await authStore.handleSignUp(registerEmail.value, registerPassword.value, registerName.value);
  if (authStore.$state.error ) {
    error.value = authStore.$state.error;
    return;
  } else {
    error.value = '';
    userEmail.value = registerEmail.value
    isRightPanelActive.value = !isRightPanelActive.value;
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

body, .app {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #2819b1;
  background-color: #2819b1;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: #FFFFFF;
  border-color: #FFFFFF;
  color: #2819b1;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
              0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #2819b1;
  /* background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
  background: linear-gradient(to right, #FF4B2B, #FF416C); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.right-panel-active .overlay-right {
  transform: translateX(20%);
}

</style>
