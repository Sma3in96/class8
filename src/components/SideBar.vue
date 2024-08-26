<template>
  <div :id="!checked ? 'nav-bar' : 'nav-bar2'">
    <div>
    <div :id="!checked ? 'nav-header' : 'nav-header2'">
      <span>  {{ username }}</span>
      <!-- <img :class="checked ? 'avatar' : 'avatar2'" src="../images/avatar.jpeg" alt="avatar"> -->
      <div>
        <box-icon id="menuicon" name="menu" v-show="!checked" @click="navBarSwitch" color="#fff"></box-icon>
        <box-icon name='menu' v-show="checked" @click="navBarSwitch" rotate='0' color="#fff"></box-icon>
      </div>
    </div>
    
    <div :id="!checked ? 'nav-content' : 'nav-content2'">
      <hr/>
      <router-link :to="{ name: 'dashboard' }">
      <div :class="!checked ? 'nav-button' : 'nav-button2'">
        <box-icon color="#fff" type="solid" name="dashboard"></box-icon>&nbsp;&nbsp;
        <span>Dashboard</span>
      </div>
      </router-link>
      <router-link :to="{ name: 'attendance' }">
        <div :class="!checked ? 'nav-button' : 'nav-button2'">
          <box-icon color="#fff" type="solid" name="calendar"></box-icon>&nbsp;&nbsp;
          <span>Attendance</span>
        </div>
      </router-link>
      <router-link :to="{ name: 'grades' }">
        <div :class="!checked ? 'nav-button' : 'nav-button2'">
          <box-icon color="#fff" type="solid" name="medal" animation="thada"></box-icon>&nbsp;&nbsp;
          <span>Grades</span>
        </div>
      </router-link>

      <router-link :to="{ name: 'lessons' }">
        <div :class="!checked ? 'nav-button' : 'nav-button2'">
          <box-icon color="#fff" type="solid" name="book-open" animation="htada"></box-icon>&nbsp;&nbsp;
          <span>Lessons</span>
        </div>
      </router-link>

      <!-- <router-link :to="{ name: 'filestoring' }">
        <div :class="checked ? 'nav-button' : 'nav-button2'">
          <box-icon color="#fff" type="solid" name="file-pdf"></box-icon>&nbsp;&nbsp;
          <span>My Files</span>
        </div>
      </router-link> -->

      <router-link :to="{ name: 'report' }">
        <div :class="!checked ? 'nav-button' : 'nav-button2'">
          <box-icon color="#fff" type="solid" name="report"></box-icon>&nbsp;&nbsp;
          <span>Report</span>
        </div>
      </router-link>

      <hr />
    </div>
  </div>
    <div :class="!checked ? 'nav-button' : 'nav-button2'" @click="handleLogOut">
        <box-icon color="#fff" type="solid" name="exit"></box-icon>&nbsp;&nbsp;
        <a id="logout" href="#">Logout</a>
    </div>
  </div>
</template>


<script setup>

import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import router from '../router'

const checked = ref(true);


const navBarSwitch = function () {
  checked.value = !checked.value;
}

const authStore = useAuthStore();
const userStore = useUserStore();


const username = ref(userStore.$state.Displayname)

const handleLogOut = async function () {
  await authStore.handleLogoutUser();

  if (authStore.$state.error === null) {
    userStore.resetUserInfos();
    router.push('/')
  }
}

</script>


<style scoped>
#nav-bar {
  width: 250px;
  background-color: #1b0d97;
  color: #fff;
  padding: 20px;
  /* position: fixed; */
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  /* height: 100hv; */
  margin-right: 10px;
}

#nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#nav-toggle:active~#nav-bar {
  width: 80px;
}

.nav-button {
  margin: 15px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  /* Temporary background color for visibility */
  padding: 5px;
  /* Optional: Add some padding for better spacing */
}

.nav-button svg {
  padding-top: 10px;
}

a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: sans-serif;
}

.nav-button:hover {
  background-color: #d35e10;
  border-radius: 10px;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}



#nav-bar2 {
  background-color: #1b0d97;
  height: 100vh;
  color: #fff;
  padding: 10px;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* height: 95vh; */
  margin-right: 10px;
}

#nav-header2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

#nav-header2 span,
/* #nav-header2 img, */
#nav-header2 label {
  display: none;
  /* Hide the username, avatar, and label */
}

#nav-content2 .nav-button2 span {
  display: none;
  /* Hide the text next to the icons */
}
.nav-button2 #logout {
  display: none;
  /* Hide the text next to the icons */
}



.nav-button2 {
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Center the icons */
  cursor: pointer;
  color: white;
}

#nav-toggle2 {
  display: block;
  /* Ensure the checkbox is visible */
}

.avatar2 {
  display: none;

}

#nav-content2 span {
  display: none;
  /* Hide all anchor tags */
}


#nav-toggle-burger2 {
  display: inline-block;
  /* Show the burger icon */
}

.nav-button2:hover {
  background-color: #d35e10;
  border-radius: 5px;
}

</style>
