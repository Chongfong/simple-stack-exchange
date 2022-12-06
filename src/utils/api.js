const api = {
  hostname: 'https://api.stackexchange.com',
  async getTrending() {
    return fetch(`${this.hostname}/2.3/tags?order=desc&sort=popular&site=stackoverflow`).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });
  },
  async getQuestions(page, tag) {
    if (!page || !tag) return;
    return fetch(
      `${this.hostname}/2.3/questions?page=${page}&pagesize=20&order=desc&sort=activity&tagged=${String(
        encodeURIComponent(tag)
      )}&site=stackoverflow`
    ).then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 500) {
        throw new Error('Network response was not ok.');
      }
    });
  },
};

export default api;
