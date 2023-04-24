<template>

  <div class="app">
    <h2>Страница с постами</h2>

    <my-button
        @click="showDialog"
        style="margin: 15px 0;"
    >
      Создать пост
    </my-button>

    <my-dialog v-model:show="dialogVisible">
      <!--    @create - подписались на событие create -->
      <!--    this.$emit('create', this.post) в PostForm -->
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        :posts="posts"
        @remove="removePost"
    />

  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import MyDialog from "@/components/ui/MyDialog";
import MyButton from "@/components/ui/MyButton";

export default {
  components: {
    MyButton,
    MyDialog,
    PostForm, PostList
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'Vue.js', body: 'Описание поста',},
        {id: 2, title: 'PHP', body: 'Описание поста',},
        {id: 3, title: 'JS', body: 'Описание поста',}
      ],
      dialogVisible: false
    }
  },
  methods: {

    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    }
  }
}
</script>

<style>
@import '/public/style.css';
</style>