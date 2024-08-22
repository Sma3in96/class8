<template>
  <div class="folder">
    <header class="folder-header">
      <h3>{{ folders[0].name }}</h3>
      <div class="actions">
        <button @click="createFolder" class="btn btn-primary">New Folder</button>
        <input type="file" @change="uploadFile" class="file-input" />
      </div>
    </header>
    <ul class="file-list">
      <li v-for="file in folders[0].files" :key="file.name" class="file-item">
        {{ file.name }}
      </li>
      <li v-for="subfolder in folders[0].subfolders" :key="subfolder.id" class="subfolder-item">
        <FolderComponent :folder="subfolder" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import FolderComponent from './FileStoring.vue'

const folders = [
  {
    id: 1,
    name: 'Root',
    files: [
      { name: 'Introduction to Vue.pdf', type: 'pdf', size: '1MB', lastModified: new Date() },
      { name: 'Setup Guide.pdf', type: 'pdf', size: '500KB', lastModified: new Date() }
    ],
    subfolders: [
      {
        id: 2,
        name: 'Work',
        files: [
          { name: 'Project Plan.pdf', type: 'pdf', size: '2MB', lastModified: new Date() },
          { name: 'Meeting Notes.pdf', type: 'pdf', size: '300KB', lastModified: new Date() }
        ],
        subfolders: [
          {
            id: 3,
            name: 'Reports',
            files: [
              { name: 'Annual Report.pdf', type: 'pdf', size: '3MB', lastModified: new Date() },
              { name: 'Q1 Report.pdf', type: 'pdf', size: '1.5MB', lastModified: new Date() }
            ],
            subfolders: []
          }
        ]
      },
      {
        id: 4,
        name: 'Personal',
        files: [
          { name: 'Vacation Photos.pdf', type: 'pdf', size: '2.5MB', lastModified: new Date() }
        ],
        subfolders: []
      }
    ]
  }
];

const createFolder = () => {
  const folderName = prompt('Enter folder name:');
  if (folderName) {
    // Add folder creation logic here
  }
};

const uploadFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Add file upload logic here
  }
};
</script>

<style scoped>
.folder {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.folder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.folder-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.actions {
  display: flex;
  align-items: center;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 8px;
}

.btn-primary {
  background-color: #007bff;
}

.file-input {
  font-size: 1rem;
}

.file-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.file-item, .subfolder-item {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.file-item:hover, .subfolder-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

.subfolder-item {
  margin-left: 20px;
}
</style>
