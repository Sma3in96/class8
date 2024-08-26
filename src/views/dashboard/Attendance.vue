<template>
  <div class="students-list">
    <h1>Students Attendance</h1>

    <div class="filters">
      <input type="date" v-model="selectedDate" class="date-picker" />
      <select v-model="selectedClass" class="class-selector" @change="filterStudent">
        <option value="">Select a class</option>
        <option v-for="option in classOptions" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <table>
      <tr>
        <th id="table_ID">ID</th>
        <th id="table_Name">Name</th>
        <th id="table_abs">Absent</th>
      </tr>
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>
          <input class="checkbox" type="checkbox" v-model="student.absent" />
        </td>
      </tr>
    </table>

    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <button @click="submitAttendance" class="submit-button">Submit Attendance</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { addData, queryFirestore } from '../../Services/Requests/firestoreRequests';
import { useUserStore } from '../../stores/userStore';

const students = ref([
]);

const userStore = useUserStore();
const selectedClass = ref('');
const classOptions = ref([])
const selectedDate = ref(new Date().toISOString().split('T')[0]);

const fetchClassOptions = async () => {
  try {
    const classOpt = await queryFirestore("Class", { where: [["userID", "==", userStore.$state.userID ]]});
    classOptions.value = classOpt.map(item => ({ value: item.id, text: item.name }));
    console.log(classOptions.value);
  } catch (error) {
    console.error('Error fetching class options:', error);
  }
};

const filterStudent = async () => {
  try {
    const studentData = await queryFirestore("Student", { where: [["classId", "==", selectedClass.value]]});
    let counter = 1
    students.value = studentData.map(item => ({
      id: counter++,
      name: item.name,
      studentId: item.id
    }))
    console.log(students.value);
  } catch (error) {
    console.error('Error fetching students:', error);
  };
}

const submitAttendance = async () => {
  const todayAttendance = {
    date: selectedDate.value,
    classId: selectedClass.value,
    students: students.value.map(student => ({
      studentId: student.studentId,
      absent: student.absent || false
    }))
  }
  console.log(todayAttendance);
  const res = await addData("Attendance", todayAttendance)
  if (res.status == "Ok") {
    alert("Attendance submitted successfully!")

  } else {
    alert("Failed to submit attendance!")
    console.error("Failed to submit attendance:", res.message);
  }
};



onMounted(() => {
  fetchClassOptions();
});





</script>

<style scoped>
.students-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  height: 100hv;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 30px;
}

.date-picker,
.class-selector {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.date-picker {
  flex: 1;
  margin-left: 20%;
}

.class-selector {
  flex: 2;
  margin-right: 40%;
  width: 100%;
}


table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th {
  background-color: #6a74cc;
  color: white;
  padding: 12px 15px;
  text-align: left;
}

.table_ID {
  width: 10%;
}

th:nth-child(2) {
  width: 70%;
}

th:nth-child(3) {
  width: 20%;
}


td {
  padding: 12px 15px;
  background-color: #f9f6ff;
  color: #333;
}

tr:nth-child(even) td {
  background-color: #cbc4d4;
}

.checkbox {
  margin-right: 5px;
  width: 30px;
  height: 30px;
}


.submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
