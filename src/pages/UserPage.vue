<template>

  <div>
    <h2>Страница с постами</h2>

    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    />

    <div class="add__btns">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOption"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>

    <div v-intersection="loadMorePosts" class="observer">

    </div>
    <div class="page__wrapper">
    </div>

  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import MyDialog from "@/components/ui/MyDialog";
import MyButton from "@/components/ui/MyButton";
import MySelect from "@/components/ui/MySelect";
import MyInput from "@/components/ui/MyInput";
import axios from "axios";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOption: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По названию'}
      ]
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
    },

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;

      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isPostsLoading = false;
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1;
        // this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];

      } catch (e) {
        alert('Ошибка')
      }
    }

  },

  mounted() {
    this.fetchPosts();
    // let options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    //
    // let callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts();
    //   }
    // }
    //
    // let observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },

  // всегда возвращает какое-то вычисление, возвращаться единожды
  computed: {
    sortedPosts() {
      return [...this.posts.sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
      ];
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery));
    }
  },

  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  }
}
</script>

<style>

.add__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}

</style>