const seedRecipes = [
  {
    _id: "seed-1",
    title: "Paneer Butter Masala",
    category: "Dinner",
    cookingTime: 30,
    difficulty: "Medium",
    image: "/images/paneer-butter-masala.jpg",
    description: "Rich, creamy North Indian curry with paneer cubes in buttery tomato gravy.",
    ingredients: ["200g paneer cubes", "2 tomatoes", "1 onion", "2 tbsp butter", "1/2 cup cream", "spices & salt"],
    instructions: [
      "Saute onions and tomatoes.",
      "Blend into smooth gravy.",
      "Cook with butter and spices.",
      "Add paneer cubes.",
      "Add cream and simmer."
    ]
  },
  {
    _id: "seed-2",
    title: "Chicken Biryani",
    category: "Lunch",
    cookingTime: 60,
    difficulty: "Hard",
    image: "/images/chicken-biryani.png",
    description: "Fragrant layered basmati rice and spiced chicken cooked on dum.",
    ingredients: ["500g chicken", "2 cups basmati rice", "onions & tomatoes", "biryani spices", "yogurt", "mint leaves"],
    instructions: [
      "Marinate chicken.",
      "Cook rice separately.",
      "Prepare masala gravy.",
      "Layer rice & chicken.",
      "Cook on dum for 20 minutes."
    ]
  },
  {
    _id: "seed-3",
    title: "White Sauce Pasta",
    category: "Snack",
    cookingTime: 20,
    difficulty: "Easy",
    image: "/images/white-sauce-pasta.jpg",
    description: "Creamy white sauce pasta with garlic, cheese and herbs.",
    ingredients: ["1 cup pasta", "2 tbsp butter", "milk", "cheese", "garlic", "oregano"],
    instructions: ["Boil pasta.", "Prepare white sauce.", "Mix pasta with sauce.", "Add cheese & herbs.", "Serve hot."]
  },
  {
    _id: "seed-4",
    title: "Fluffy Pancakes",
    category: "Breakfast",
    cookingTime: 15,
    difficulty: "Easy",
    image: "/images/fluffy-pancakes.jpg",
    description: "Soft fluffy pancakes served with syrup.",
    ingredients: ["1 cup flour", "1 egg", "milk", "sugar", "baking powder", "butter"],
    instructions: [
      "Mix dry ingredients.",
      "Add milk & egg.",
      "Cook batter on pan.",
      "Flip when bubbles form.",
      "Serve with syrup."
    ]
  },
  {
    _id: "seed-5",
    title: "Margherita Pizza",
    category: "Dinner",
    cookingTime: 25,
    difficulty: "Medium",
    image: "/images/margherita-pizza.jpg",
    description: "Classic Italian pizza with tomato sauce, mozzarella and basil.",
    ingredients: ["pizza base", "mozzarella cheese", "tomato sauce", "fresh basil", "olive oil"],
    instructions: [
      "Spread sauce on pizza base.",
      "Add cheese and basil.",
      "Bake at high temperature.",
      "Drizzle olive oil.",
      "Serve hot."
    ]
  },
  {
    _id: "seed-6",
    title: "Veggie Salad Bowl",
    category: "Healthy",
    cookingTime: 10,
    difficulty: "Easy",
    image: "/images/veggie-salad-bowl.jpg",
    description: "Fresh crunchy vegetables with lemon-olive oil dressing.",
    ingredients: ["lettuce", "cucumber", "tomatoes", "olive oil", "lemon juice", "salt & pepper"],
    instructions: ["Chop vegetables.", "Add lemon juice & olive oil.", "Mix well.", "Season and serve fresh."]
  },
  {
    _id: "seed-7",
    title: "Veg Burger",
    category: "Snack",
    cookingTime: 20,
    difficulty: "Easy",
    image: "/images/veg-burger.jpg",
    description: "Loaded vegetarian burger with patty, lettuce, tomato and cheese.",
    ingredients: ["burger buns", "veg patty", "lettuce", "tomato slices", "mayonnaise", "cheese slice"],
    instructions: ["Toast burger buns.", "Cook veg patty.", "Assemble with veggies & sauce.", "Serve warm."]
  },
  {
    _id: "seed-8",
    title: "Hakka Noodles",
    category: "Dinner",
    cookingTime: 25,
    difficulty: "Easy",
    image: "/images/hakka-noodles.jpg",
    description: "Indo-Chinese stir-fried noodles with crunchy vegetables.",
    ingredients: ["noodles", "capsicum", "carrot", "soy sauce", "garlic", "spring onions"],
    instructions: ["Boil noodles.", "Stir fry vegetables.", "Add noodles and sauces.", "Mix well and serve."]
  },
  {
    _id: "seed-9",
    title: "Chocolate Brownie",
    category: "Dessert",
    cookingTime: 35,
    difficulty: "Medium",
    image: "/images/chocolate-brownie.jpg",
    description: "Fudgy dark chocolate brownies with a crackly top.",
    ingredients: ["dark chocolate", "butter", "sugar", "flour", "eggs", "cocoa powder"],
    instructions: [
      "Melt chocolate and butter.",
      "Mix sugar and eggs.",
      "Combine with flour.",
      "Bake for 25 minutes.",
      "Cool and cut into squares."
    ]
  },
  {
    _id: "seed-10",
    title: "Mango Smoothie",
    category: "Drink",
    cookingTime: 5,
    difficulty: "Easy",
    image: "/images/mango-smoothie.jpg",
    description: "Refreshing summer smoothie made with ripe mango and milk.",
    ingredients: ["ripe mango", "milk", "honey", "ice cubes"],
    instructions: ["Add all ingredients to blender.", "Blend until smooth.", "Serve chilled."]
  }
];

export default seedRecipes;
