import axios from "axios";
import { createStore, action, thunk, computed } from "easy-peasy";

export default createStore({
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  postTitle: "",
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),
  postBody: "",
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  postEditTitle: "",
  setPostEditTitle: action((state, payload) => {
    state.postEditTitle = payload;
  }),
  postEditBody: "",
  setPostEditBody: action((state, payload) => {
    state.postEditBody = payload;
  }),
  searchPost: "",
  setSearchPost: action((state, payload) => {
    state.searchPost = payload;
  }),
  searchResults: "",
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),
  postCount: computed((state) => state.posts.length),
  getPostById: computed((state) => {
    return (id) => state.posts.find((post) => post.id.toString() === id);
  }),
  storePost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState();
    try {
      const response = await axios.post(
        "http://localhost:5000/articles",
        newPost
      );
      actions.setPosts([...posts, response.data]);
      actions.setPostTitle("");
      actions.setPostBody("");
    } catch (error) {
      console.log(error.message);
    }
  }),
  updatePost: thunk(async (actions, updatedPost, helpers) => {
    const { posts } = helpers.getState();
    const { id } = updatedPost;
    try {
      const response = await axios.put(
        `http://localhost:5000/articles/${id}`,
        updatedPost
      );
      actions.setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      actions.setPostEditTitle("");
      actions.setPostEditBody("");
    } catch (error) {
      console.log(error.message);
    }
  }),
  destroyPost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState();
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      actions.setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  }),
});
