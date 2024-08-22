<template>
  <div class="add-student-form">
    <h1>Add a class</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="class-name">Class Name:</label>
        <input
          type="text"
          id="class-name"
          v-model="classs.name"
          required
        />
      </div>
      <div class="form-group">
        <label for="class-description">Class Description:</label>
        <input
          type="text"
          id="class-description"
          v-model="classs.description"
          required
        />
      </div>
      <button type="submit">Add Class</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { addData } from '../../Services/Requests/firestoreRequests';
import { useUserStore } from '../../stores/userStore';
import router from '../../router';


const userStore = useUserStore();

// Student data object
const classs = ref({
  name: '',
  description: ''
});


const submitForm = async () => {
  const res = await addData("Class", {
    name: classs.value.name,
    userID: userStore.$state.userID,
    description: classs.value.description,
    createdAt: new Date(),
    studentsIds: []
  })
  if (res.status === "Ok") {
    alert('Class added successfully!');
    classs.name = '';
    classs.description = '';
    router.push('/dashboard/home/Students')
  }
  else {
    alert('Failed to add class. Please try again.');
    console.error(res.content)
  }
};
</script>

<style scoped>
.add-student-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 5%;
}

h1 {
  /* text-align: center; */
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

input {
  width: 95.49%;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #0056b3;
}
</style>
