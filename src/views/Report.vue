<template>
  <div class="students-list">
    <h1>Students Attendance</h1>

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
        <th id="table_abs"></th>
      </tr>
      <tr v-for="student in students" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>
          <Mybutton text="generate report" @click="handlegenerate(student.id)"></Mybutton>
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
import { ref, onMounted, nextTick } from 'vue';
import { queryFirestore } from '../Services/Requests/firestoreRequests';
import { useUserStore } from '../stores/userStore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



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
      grades: item.grades,
      daysSkipped: item.daysSkipped
    }))
  } catch (error) {
    console.error('Error fetching students:', error);
  };
}

onMounted(() => {
  fetchClassOptions();
});



const handlegenerate = (id) => {
  const student = students.value.find(item => item.id == id);
  student.className =  classOptions.value.find(item => item.value == selectedClass.value).text
  student.teacherRemarks = "good job, need imporvement"
  console.log(student);
  

  // const student = {
  //   id: 1,
  //   name: 'John Doe',
  //   className: 'Math',
  //   teacherRemarks: 'Good job!',
  //   daysSkipped: 2,
  //   grades: [
  //     { exam: 'Midterm Exam', grade: 'A' },
  //     { exam: 'Final Exam', grade: 'B' }
  //   ]
  // };

  const pdf = new jsPDF();


  const title = 'Student Report';
  const subtitle = "date: " + new Date().toLocaleDateString();
  const textMargin = 10;
  const titleFontSize = 20;
  const subtitleFontSize = 12;
  const textY = 20;
  const textLineHeight = 10;


  pdf.setFontSize(titleFontSize);
  pdf.setFont('helvetica', 'bold');
  const pageWidth = pdf.internal.pageSize.width;
  const titleWidth = pdf.getTextWidth(title);
  pdf.text(title, (pageWidth - titleWidth) / 2, textY);


  pdf.setLineWidth(0.5);
  pdf.line((pageWidth - titleWidth) / 2, textY + 1, (pageWidth + titleWidth) / 2, textY + 1);

  pdf.setFontSize(subtitleFontSize);
  pdf.setFont('helvetica', 'normal');
  pdf.text(subtitle, (pageWidth - pdf.getTextWidth(subtitle)) / 2, textY + 10);


  pdf.setFontSize(12);
  const textStartY = textY + 30;
  const textStyleBoldItalic = { fontSize: 12, fontStyle: 'bolditalic' };


  pdf.setFont('helvetica', 'bolditalic');
  pdf.text('Name:', textMargin, textStartY);
  pdf.setFont('helvetica', 'normal');
  pdf.text(student.name, textMargin + pdf.getTextWidth('Name: ') + 2, textStartY);


  pdf.setFont('helvetica', 'bolditalic');
  pdf.text('Class Name:', textMargin, textStartY + textLineHeight);
  pdf.setFont('helvetica', 'normal');
  pdf.text(student.className, textMargin + pdf.getTextWidth('Class Name: ') + 2, textStartY + textLineHeight);


  pdf.setFont('helvetica', 'bolditalic');
  pdf.text('Teacher Remarks:', textMargin, textStartY + 2 * textLineHeight);
  pdf.setFont('helvetica', 'normal');
  pdf.text(student.teacherRemarks, textMargin + pdf.getTextWidth('Teacher Remarks: ') + 2, textStartY + 2 * textLineHeight);


  pdf.setFont('helvetica', 'bolditalic');
  pdf.text('Days Skipped:', textMargin, textStartY + 3 * textLineHeight);
  pdf.setFont('helvetica', 'normal');
  pdf.text(student.daysSkipped.toString(), textMargin + pdf.getTextWidth('Days Skipped: ') + 2, textStartY + 3 * textLineHeight);

  const tableY = textStartY + 80;

  const examWidth = 120;
  const gradeWidth = 30;
  const tableHeaders = ['Exam', 'Grade'];

  pdf.autoTable({
    startY: tableY,
    head: [tableHeaders],
    body: student.grades.map((grade, index) => [`Exam ${index + 1}`, grade]),
    theme: 'grid',
    headStyles: {
      fillColor: [33, 150, 243], // Header background color (blue)
      textColor: 255, // Header text color (white)
      fontSize: 12,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 12,
      textColor: 0 // Body text color (black)
    },
    styles: {
      cellPadding: 5,
      halign: 'left',
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: examWidth },
      1: { cellWidth: gradeWidth }
    },
    margin: { left: 10, right: 10 }
  });


  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Parent Signature:', pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 20, { align: 'right' });

  pdf.save(`${student.name}'s Report.pdf`);
};



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
