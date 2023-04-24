<template>

  <div class="app">

<!--    @create - подписались на событие create -->
<!--    this.$emit('create', this.post) в PostForm -->
    <post-form
        @create="createPost"
    />

    <post-list
        :posts="posts"
        @remove="removePost"
    />

  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'Vue.js', body: 'Описание поста',},
        {id: 2, title: 'PHP', body: 'Описание поста',},
        {id: 3, title: 'JS', body: 'Описание поста',}
      ],
    }
  },
  methods: {

    createPost(post) {
      this.posts.push(post);
    },

    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
  }
}
</script>

<style>
@import '/public/style.css';
</style>