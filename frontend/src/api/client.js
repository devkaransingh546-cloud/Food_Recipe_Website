// Static mode enabled — no backend required

const api = {
  get: async () => {
    return {
      data: [
        {
          id: "seed-1",
          title: "Paneer Butter Masala",
          image: "https://source.unsplash.com/600x400/?paneer,butter,masala",
          time: "30 min",
          difficulty: "Medium"
        },
        {
          id: "seed-2",
          title: "Chicken Biryani",
          image: "https://source.unsplash.com/600x400/?chicken,biryani",
          time: "45 min",
          difficulty: "Hard"
        },
        {
          id: "seed-3",
          title: "White Sauce Pasta",
          image: "https://source.unsplash.com/600x400/?white,sauce,pasta",
          time: "20 min",
          difficulty: "Easy"
        }
      ]
    };
  }
};

export default api;