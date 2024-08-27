<template>
  <div class="container">
  <div class="parent">
  <div class="child">
    <router-link to="/dashboard/home/Students">
      Students List
    </router-link>
  </div>
  <div class="child">
    <router-link to="/dashboard/home/createStudent">
      Add New Student
    </router-link>
  </div>
  <div class="child">
  <router-link to="/dashboard/Grades">
      Grades
    </router-link>
  </div>
  <div class="child">
  <router-link to="/dashboard/Lessons">
      My calendar
    </router-link>
  </div>

  </div>
</div>

</template>

<script>
</script>

<style  scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px; /* Add spacing between grid items */
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px; /* Add rounded corners */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.child {
  background-color: #fff;
  text-align: center;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer; /* Change cursor to indicate clickable */
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}

</style>
