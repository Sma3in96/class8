<template>
  <div class="list">
    <h1>Student List</h1>
    <div class="filters">
      <select v-model="selectedClass" class="class-selector" @change="filterStudent">
        <option value="">Select a class</option>
        <option v-for="option in classOptions" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <router-link to="/dashboard/home/createClass">
        <Mybutton class="button" text="Add new Class" @click="handleclick" type="submit" />
      </router-link>
    </div>
    <table>
      <tr>
        <th id="table_ID">ID</th>
        <th id="table_Name">Name</th>
        <th>Parent Phone</th>
        <th>Birth Date</th>
        <th>days skipped</th>
        <th>Remarks</th>
        <th>Notes</th>
      </tr>
      <tr v-for="student in students" :key="student.id">
        <td :id="'table_ID_' + student.id">{{ student.id }}</td>
        <td :id="'table_Name_' + student.id">{{ student.name }}</td>
        <td>{{ student.parentPhone }}</td>
        <td>{{ student.birthDate }}</td>
        <td>{{ student.daysSkipped }}</td>
        <td>{{ student.remarks }}</td>
        <td>{{ student.grades }}</td>
      </tr>

    </table>
    <router-link to="/dashboard/home/createStudent">
      <Mybutton class="button" text="Add new Student" @click="handleclick" type="submit" />
    </router-link>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { queryFirestore, setData } from '../../Services/Requests/firestoreRequests';
import { useUserStore } from '../../stores/userStore';


const handleclick = () => {
  console.log('Button clicked');
};

const students = ref([
]);

const userStore = useUserStore();
const selectedClass = ref('');
const classOptions = ref([])

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
    const classAttendees = await queryFirestore("Attendance", { where: [["classId", "==", selectedClass.value]] })
    console.log(classAttendees);

    const daysSkip = {};

    classAttendees.forEach(record => {
      record.students.forEach(student => {
        if (student.absent) {
          if (!daysSkip[student.studentId]) {
            daysSkip[student.studentId] = 0;
          }
          daysSkip[student.studentId]++;
        }
      });
    });

    for (let day in daysSkip) {
      await setData("Student", day, { daysSkipped: daysSkip[day]} , true)
    }


    let counter = 1
    students.value = studentData.map(item => ({
      id: counter++,
      name: item.name,
      parentPhone: item.parentPhone,
      birthDate: item.birthDate,
      daysSkipped: daysSkip[item.id] || 0,
      remarks: item.remarks || 'good student',
      grades: item.grades || '',
    }))
    console.log(students.value);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

onMounted(() => {
  fetchClassOptions();
});

</script>

<style scoped>
.list {
  padding: 15px;
}


table {
  width: 90%;
  margin: auto;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th {
  background-color: #5a64c2;
  color: white;
  padding: 12px 15px;
  text-align: left;
}

.table_ID {
  width: 8%;
}

th:nth-child(2) {
  width: 20%;
}

th:nth-child(3) {
  width: 10%;
}

th:nth-child(4) {
  width: 10%;
}

td {
  padding: 12px 15px;
  background-color: #f9f6ff;
  color: #333;
}

tr:nth-child(even) td {
  background-color: #b9a4d4;
}

.filters {
  margin-bottom: 20px;
}

.class-selector,
.group-selector {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}


.class-selector {
  flex: 2;
  margin-right: 20%;
  margin-left: 20%;
}

.button {
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 40px;
  margin-left: 5%;
}
</style>
