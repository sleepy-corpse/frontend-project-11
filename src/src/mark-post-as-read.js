export default (watchedState, selectedPostId) => {
  const targetPost = watchedState.posts.find((currentPost) => currentPost.id === selectedPostId);
  targetPost.visited = true;
};
