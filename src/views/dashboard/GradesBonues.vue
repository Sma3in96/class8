<template>
  <div class="students-list">
    <h1>Students Grades</h1>

    <div class="filters">
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
        <th id="table_grade_1">
          <span>Exam 1</span> &nbsp;
        </th>
        <th id="table_grade_1">
          <span>Exam 2</span>
        </th>
        <th id="table_grade_2">
          <span>Exam 3</span>
        </th>
        <th id="table_grade_3">
          <span>Exam 4</span>
        </th>
        <th id="table_grade_4">Average</th>
        <th>
        </th>
      </tr>
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>
          <div class="grade_input">
            <input class="input_1" type="number"  v-model="student.grades[0]" step="0.01" :disabled="!student.editgrade" />
          </div>
        </td>
        <td>
          <div class="grade_input">
            <input :disabled="!student.editgrade" class="input_1" type="number" step="0.01" v-model="student.grades[1]" />
          </div>
        </td>
        <td>
          <div class="grade_input">
            <input :disabled="!student.editgrade" class="input_1"  type="number" step="0.01" v-model="student.grades[2]" />
          </div>
        </td>
        <td>
          <div class="grade_input">
            <input :disabled="!student.editgrade" class="input_1" type="number" step="0.01" v-model="student.grades[3]" />
          </div>
        </td>
        <td></td>
        <td>
          <box-icon @click="student.editgrade = true" name="edit" type="solid"
            v-show="!student.editgrade" ></box-icon>
          <box-icon @click="student.editgrade = false " name="save" type="solid"
            v-show="student.editgrade" ></box-icon>
        </td>
      </tr>
    </table>

    <!-- <errorMessage message="Wrong" /> -->
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <button @click="submitAttendance" class="submit-button">Submit</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { addData, queryFirestore, setData } from '../../Services/Requests/firestoreRequests';
import { useUserStore } from '../../stores/userStore';

const students = ref([
]);

const userStore = useUserStore();
const selectedClass = ref('');
const classOptions = ref([])
const selectedDate = ref(new Date().toISOString().split('T')[0]);



const fetchClassOptions = async () => {
  try {
    const classOpt = await queryFirestore("Class", { where: [["userID", "==", userStore.$state.userID]] });
    classOptions.value = classOpt.map(item => ({ value: item.id, text: item.name }));
    console.log(classOptions.value);
  } catch (error) {
    console.error('Error fetching class options:', error);
  }
};

const filterStudent = async () => {
  try {
    const studentData = await queryFirestore("Student", { where: [["classId", "==", selectedClass.value]] });
    let counter = 1
    students.value = studentData.map(item => ({
      id: counter++,
      name: item.name,
      studentId: item.id,
      grades: item.grades !== [] ? item.grades : [0, 0, 0, 0 ],
      editgrade: false
    }))
    console.log(students.value);
  } catch (error) {
    console.error('Error fetching students:', error);
  };
}

const submitAttendance = async () => {
  console.log(students.value);
  
  try {
    const updatePromises = students.value.map(item =>
      setData('Student', item.studentId, { grades: item.grades }, true)
    );
    
    await Promise.all(updatePromises);
    // prompt.("the grades are updated ")
  } catch (error) {
    console.error('Error updating students:', error);
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

.class-selector {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}


.class-selector {
  flex: 2;
  margin-right: 70%;
  width: 80%;
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

.grade_input {
  display: flex;
  align-items: center;
}

.grade_input {
    text-align: right; /* Aligns the input to the right within its container */
}

.input_1 {
    width: 100px; /* Set a fixed width or adjust as needed */
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px; /* Adjust font size if needed */
}

/* Optional: Style for the input when disabled */
.input_1:disabled {
    background-color: #f9f9f9;
    color: #999;
    cursor: not-allowed;
}

</style>
