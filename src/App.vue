<template>

  <div class="app">
    <form @submit.prevent>
      <h4>Создание поста</h4>
      <input
          v-bind:value="title"
          @input="title = $event.target.value"
          class="input"
          type="text"
          placeholder="Название"
      />
      <input
          v-bind:value="body"
          @input="body = $event.target.value"
          class="input"
          type="text"
          placeholder="Описание"
      />
      <button
          class="btn"
          @click="createPost"
      >
        Создать
      </button>
    </form>

    <div v-if="posts.length > 0">
      <h3>Список постов</h3>
      <div class="post" v-for="post in posts">
        <div>
          <div>{{ post.id }}</div>
          <div><strong>Название:</strong> {{ post.title }}</div>
          <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="post__btns">
          <button
              class="btn"
              @click="removePost(post)"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
    <h2 v-else style="color: red">
      Список постов пуст
    </h2>

  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {id: 1, title: 'Vue.js', body: 'Описание поста',},
        {id: 2, title: 'PHP', body: 'Описание поста',},
        {id: 3, title: 'JS', body: 'Описание поста',}
      ],
      title: '',
      body: ''
    }
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      }
      this.posts.push(newPost);
      this.title = '';
      this.body = '';
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
  }
}
</script>

<!--стили используются только к этому компоненту-->
<!--<style scoped>-->
<style>
@import '/public/style.css';

form {
  display: flex;
  flex-direction: column;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}

.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 10px;
}

.post__btns {
  display: flex;
}

</style>