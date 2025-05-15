# TodoList - サーバー連携

ド　シンプルなTodoリスト。以上<br>
ローカルで動けばヨシ

## スタック

### フロントエンド

* Vue.js
* Vuetify
* axios

### バックエンド

* Node.js
  * expressとやら
* PostgreSQL

## パッとスケジュール

### 5/7~9
* 見た目のみ
  * [x] フォーム
  * [x] ボタン（新規登録）
  * [x] リスト
    * [x] 文字表示部分（打消し線）
      * [x] 編集時はTextfield
    * [x] ボタン
      * [x] 完了
      * [x] 編集
      * [x] 削除

### 5/11~23

#### データベース構成: node_app_202505_db
#### テーブル：`tasks`

| カラム名      | 型           | 説明                    |
|---------------|--------------|-------------------------|
| id            | SERIAL       | 主キー（自動採番）     |
| name          | TEXT         | タスク名（編集可能）   |
| is_done       | BOOLEAN      | 完了フラグ              |
| created_at    | TIMESTAMP    | 作成日時（自動）       |
| updated_at    | TIMESTAMP    | 更新日時（自動）       |

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  is_done BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
#### API設計（Express）

| メソッド | エンドポイント     | 機能                         |
|----------|--------------------|------------------------------|
| GET      | /api/tasks         | 全タスクを取得               |
| POST     | /api/tasks         | 新しいタスクを追加           |
| PUT      | /api/tasks/:id     | 指定したIDのタスクを更新     |
| DELETE   | /api/tasks/:id     | 指定したIDのタスクを削除     |

### ~5/30
* 微調整(?)
