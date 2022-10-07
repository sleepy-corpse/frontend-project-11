export default (RSSraw) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(RSSraw, 'text/xml');
  const parseError = dom.querySelector('parsererror');
  if (parseError) {
    throw new Error('parsing');
  }
  const feed = {
    title: dom.querySelector('title').textContent,
    description: dom.querySelector('description').textContent,
  };
  const items = dom.querySelectorAll('item');
  const posts = Array.from(items).map((item) => ({
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
  }));
  return { feed, posts };
};
