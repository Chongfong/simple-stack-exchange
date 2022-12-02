const api = {
  hostname: 'https://api.stackexchange.com',
  async getTrending() {
    return fetch(`${this.hostname}/2.3/tags?pagesize=10&order=desc&sort=popular&site=stackoverflow`).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }
    );
  },
};

export default api;
