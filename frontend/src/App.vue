<template>
  <v-app>
    <v-main>
      <v-container>
        <v-text-field v-model="newTaskName" label="新しいタスク" @keyup.enter="addTask" />
        <v-btn @click="addTask">登録</v-btn>

        <v-container>
          <v-card v-for="task in tasks" :key="task.id" class="my-5" variant="outlined">
            <v-card-title :class="{ 'text-decoration-line-through': task.is_done }">
              {{ task.name }}
            </v-card-title>

            <v-card-actions>
              <v-btn variant="outlined" @click="toggleDone(task)">
                {{ task.is_done ? '戻す' : '完了' }}
              </v-btn>

              <v-btn variant="outlined">編集</v-btn>
              <v-btn variant="outlined">削除</v-btn>
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
}

export default defineComponent({
  data(): { tasks: Task[]; newTaskName: string } {
    return {
      tasks: [],
      newTaskName: "",
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
        this.tasks.push(res.data)
        this.newTaskName = ''
      } catch (err) {
        console.error('タスク追加失敗:', err)
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
        // サーバーから返ってきた1件分の更新内容を反映
        Object.assign(task, res.data);
      } catch (err) {
        console.error('完了状態の更新失敗:', err);
      }
    }

  },
});
</script>
