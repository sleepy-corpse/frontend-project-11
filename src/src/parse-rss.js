export default (RSSraw) => {
  const parser = new DOMParser();
  try {
    const rss = parser.parseFromString(RSSraw, 'text/xml');

    const feed = {
      title: rss.querySelector('title').textContent,
      description: rss.querySelector('description').textContent,
    };
    const items = rss.querySelectorAll('item');
    const posts = Array.from(items).map((item) => ({
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
      visited: false,
    }));
    return { feed, posts };
  } catch (error) {
    throw new Error('parsing');
  }
};
