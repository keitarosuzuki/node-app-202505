<template>
  <v-app>
    <v-main>
      <v-container>
        <v-text-field />
        <v-btn>登録</v-btn>
        <v-container>
          <v-card class="my-5" variant="outlined">
            <v-card-title>todo</v-card-title>
            <v-card-actions>
              <v-btn variant="outlined">完了</v-btn>
              <v-btn variant="outlined">編集</v-btn>
              <v-btn variant="outlined">削除</v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="my-5" variant="outlined">
            <v-card-title>todo</v-card-title>
            <v-card-actions>
              <v-btn variant="outlined">完了</v-btn>
              <v-btn variant="outlined">編集</v-btn>
              <v-btn variant="outlined">削除</v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="my-5" variant="outlined">
            <v-card-title>todo</v-card-title>
            <v-card-actions>
              <v-btn variant="outlined">完了</v-btn>
              <v-btn variant="outlined">編集</v-btn>
              <v-btn variant="outlined">削除</v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="my-5" variant="outlined">
            <v-card-title>
              <v-text-field label="todo" variant="underlined" />
            </v-card-title>
            <v-card-actions>
              <v-btn variant="outlined">完了</v-btn>
              <v-btn variant="outlined">編集</v-btn>
              <v-btn variant="outlined">削除</v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="my-5" variant="outlined">
            <v-card-title class="text-decoration-line-through">
              todo
            </v-card-title>
            <v-card-actions>
              <v-btn variant="outlined">完了</v-btn>
              <v-btn variant="outlined">編集</v-btn>
              <v-btn variant="outlined">削除</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>
