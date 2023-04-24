<template>

  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
        v-model.trim="post.title"
        placeholder="Название"
    />
    <my-input
        v-model.trim="post.body"
        placeholder="Описание"
    />
    <my-button
        style="align-self: flex-end; margin-top: 15px"
        @click="createPost"
    >
      Создать
    </my-button>
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

  // watch: {
  //   post: {
  //     handler(newValue) {
  //       console.log(newValue);
  //     },
  //     deep: true
  //   }
  // }

}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
}

</style>