<template>
  <div class="add-student-form">
    <h1>Add Student to Class</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="student-name">Student Name:</label>
        <input
          type="text"
          id="student-name"
          v-model="student.name"
          required
        />
      </div>

      <div class="form-group">
        <label for="student-birth-date">Birth Date:</label>
        <input
          type="date"
          id="student-birth-date"
          v-model="student.birthDate"
          required
        />
      </div>

      <div class="form-group">
        <label for="student-adress">Adress:</label>
        <input
          type="text"
          id="student-adress"
          v-model="student.adress"
          required
        />
      </div>

      <div class="form-group">
        <label for="student-phone">Parents phone:</label>
        <input
          type="text"
          id="student-phone"
          v-model="student.parentPhone"
          required
        />
      </div>

      <div class="form-group">
        <label for="class">Class:</label>
        <select id="class" v-model="student.classId" required>
          <option disabled value="">Please select a class</option>
          <option v-for="classItem in classOptions" :key="classItem.value" :value="classItem.value">
            {{ classItem.text }}
          </option>
        </select>
      </div>


      <div class="buttons">
        <a href="#">
          <button type="submit">Add New Student</button>
        </a>
        <router-link to="/dashboard/home/Students">
          <button > Back to the students list </button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { addData, queryFirestore } from '../../Services/Requests/firestoreRequests';
import { useUserStore } from '../../stores/userStore';

const student = ref({
  name: '',
  birthDate: '',
  adress: '',
  parentPhone: '+212',
  classId: '',
  groupId: ''
});




const submitForm = async () => {
  if (student.value.name && student.value.classId) {
    const res = await addData("Student", {
      name: student.value.name,
      birthDate: student.value.birthDate,
      adress: student.value.adress,
      parentPhone: student.value.parentPhone,
      classId: student.value.classId,
      createdAt: new Date(),
      daysSkipped: 0,
      remarks: '',
      grades: []
    })

    if (res.status === "Ok") {
      alert('Student added successfully');
      student.value = {
        name: '',
        birthDate: '',
        adress: '',
        parentPhone: '+212',
        classId: '',
        groupId: ''
      }
    } else {
      alert('Failed to add student, please try again.');
      console.error('Error adding student:', res.error);
    }
  } else {
    alert('Please fill in all fields.');
  }
};

const userStore = useUserStore()
const classOptions = ref([])

const fetchClassOptions = async () => {
  try {
    const classOpt = await queryFirestore("Class", { where: [["userID", "==", userStore.$state.userID ]]});
    classOptions.value = classOpt.map(item => ({ value: item.id, text: item.name }));
    console.log(classOptions.value);
  } catch (error) {
    console.error('Error fetching class options:', error);
  }
};

onMounted(() => {
  fetchClassOptions();
});
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

.buttons {
  display: flex;
  justify-content: space-around;
}
</style>
