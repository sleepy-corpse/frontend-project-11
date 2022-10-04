import axios from 'axios';
import parseRSS from './parse-rss';

const timeoutCallback = (outerState) => {
  if (outerState.feeds.length < 1) {
    setTimeout(timeoutCallback, 5000);
    return;
  }
  const urls = [];
  const promises = outerState.feeds.map((feed) => {
    urls.push(feed.url);
    return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(feed.url)}`);
  });
  Promise.all(promises).then((responses) => {
    responses.forEach((response, index) => {
      const rss = parseRSS(response.data.contents);
      const feedId = outerState.feeds.find((feed) => feed.url === urls[index]).id;
      const newPosts = rss.posts
        .filter((post) => outerState.posts
          .filter((oldPost) => post.link === oldPost.link).length === 0);
      if (newPosts.length > 0) {
        const formattedPosts = newPosts.map((newPost, newPostIndex) => ({
          ...newPost,
          id: outerState.posts.length + newPosts.length - newPostIndex,
          feedId,
        }));
        outerState.posts.unshift(...formattedPosts);
      }
    });
  });
  setTimeout(() => {
    timeoutCallback(outerState);
  }, 5000);
};

export default timeoutCallback;
