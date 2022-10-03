export default (RSSraw) => {
  const parser = new DOMParser();
  const rss = parser.parseFromString(RSSraw, 'text/xml');
  const feed = {
    title: rss.querySelector('title').textContent,
    description: rss.querySelector('description').textContent,
  }
  const items = rss.querySelectorAll('item');
  const posts = Array.from(items).map((item) => {
   return {
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
   } 
  });
  return { feed, posts };
}