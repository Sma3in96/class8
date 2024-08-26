<template>
  <div>
    <div ref="resumeContent" class="student-resume">
      <div class="student-info">
        <h1>{{ student.name }}</h1>
        <p>Class: {{ student.className }}</p>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Exam</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(grade, index) in student.grades" :key="index">
            <td>Exam {{ index + 1 }}</td>
            <td>{{ grade }}</td>
          </tr>
        </tbody>
      </table>
      
      <div class="additional-info">
        <p><strong>Teacher's Note:</strong> {{ student.teacherNote }}</p>
        <p><strong>Days Skipped:</strong> {{ student.daysSkipped }}</p>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  student: {
    type: Object,
    required: true
  }
});


</script>

<style scoped>
.student-resume {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.student-info {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

.additional-info {
  margin-top: 20px;
}
</style>
