<template>
  <v-app>
    <v-main>
      <v-snackbar v-model="snackbar" timeout="3000" location="top right" color="grey-darken-3">
        {{ snackbarMessage }}
      </v-snackbar>
      <v-container>
        <v-text-field v-model="newTaskName" label="新しいタスク" @keyup.enter="addTask" />
        <v-btn @click="addTask">登録</v-btn>

        <v-container>
          <v-card v-for="task in tasks" :key="task.id" class="my-5" variant="outlined">
            <v-card-title v-if="editingId !== task.id" :class="{ 'text-decoration-line-through': task.is_done }">
              {{ task.name }}
            </v-card-title>
            <v-card-title v-else>
              <v-text-field v-model="task.name" label="編集" />
            </v-card-title>
            <v-card-actions>
              <v-btn variant="outlined" @click="toggleDone(task)" :disabled="editingId !== null">
                {{ task.is_done ? '戻す' : '完了' }}
              </v-btn>
              <v-btn variant="outlined" @click="editingId = task.id" v-if="editingId !== task.id"
                :disabled="editingId !== null">
                編集
              </v-btn>
              <v-btn variant="outlined" @click="updateTask(task)" v-else>保存</v-btn>
              <v-btn variant="outlined" @click="deleteTask(task)" :disabled="editingId !== null">
                削除
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>

      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface Task {
  id: number;
  name: string;
  is_done: boolean;
  created_at: string;
  updated_at: string;
  message: string;
}

export default defineComponent({
  data(): {
    tasks: Task[]; newTaskName: string; editingId: number | null; snackbar: boolean; snackbarMessage: string;
  } {
    return {
      tasks: [],
      newTaskName: "",
      editingId: null,
      snackbar: false,
      snackbarMessage: "",
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      const res = await axios.get<Task[]>("http://localhost:5000/api/tasks");
      this.tasks = res.data;
    },
    async addTask() {
      if (!this.newTaskName.trim()) return
      try {
        const res = await axios.post<Task>('http://localhost:5000/api/tasks', {
          name: this.newTaskName,
        })
        this.snackbarMessage = res.data.message;
        this.snackbar = true;
        this.fetchTasks();
        this.newTaskName = ''
      } catch (err) {
        console.error(err)
      }
    },
    async toggleDone(task: Task) {
      try {
        const res = await axios.put<Task>(
          `http://localhost:5000/api/tasks/${task.id}`,
          {
            is_done: !task.is_done,
          }
        );
        this.snackbarMessage = res.data.message;
        this.snackbar = true;
        this.fetchTasks();
      } catch (err) {
        console.error(err);
      }
    },
    async deleteTask(task: Task) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/tasks/${task.id}`);
        this.snackbarMessage = res.data.message;
        this.snackbar = true;
        this.fetchTasks();
      } catch (err) {
        console.error(err);
      }
    },
    async updateTask(task: Task) {
      try {
        const res = await axios.put<Task>(`http://localhost:5000/api/tasks/${task.id}`, {
          name: task.name,
        });
        this.snackbarMessage = res.data.message;
        this.snackbar = true;
        this.fetchTasks();
        this.editingId = null;
      } catch (err) {
        console.error(err);
      }
    },
  },
});
</script>
