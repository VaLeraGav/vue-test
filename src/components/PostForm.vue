<template>

  <form @submit.prevent>
    <h4>Создание поста</h4>
    <input
        v-model="post.title"
        class="input"
        type="text"
        placeholder="Название"
    />
    <!--  v-bind:value="post.body"-->
    <!--  @input="post.body = $event.target.value"-->
    <!--  заменяем на  v-model="post.body" -->
    <input
        v-model="post.body"
        class="input"
        type="text"
        placeholder="Описание"
    />
    <button
        class="btn"
        style="align-self: flex-end; margin-top: 15px"
        @click="createPost"
    >
      Создать
    </button>
  </form>

</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      // отдает из ребенка к родителю App
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  },

}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
}

.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}

</style>