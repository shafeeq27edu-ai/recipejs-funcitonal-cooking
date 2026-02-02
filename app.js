// Recipe Data Array
const recipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        time: 20,
        difficulty: "easy",
        description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 50,
        difficulty: "medium",
        description: "Chunks of roasted marinated chicken in a spiced curry sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "A steak coated with pâté and duxelles, wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh tomato, cucumber, onion, feta cheese, and olives seasoned with salt and oregano.",
        category: "salad"
    },
    {
        id: 5,
        title: "Vegetable Stir-Fry",
        time: 25,
        difficulty: "easy",
        description: "Quick and healthy mix of fresh vegetables tossed in a savory soy-ginger sauce.",
        category: "vegetarian"
    },
    {
        id: 6,
        title: "Mushroom Risotto",
        time: 45,
        difficulty: "medium",
        description: "Creamy rice dish cooked with broth and mixed mushrooms.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Macarons",
        time: 90,
        difficulty: "hard",
        description: "Delicate meringue-based cookies with a ganache or buttercream filling.",
        category: "dessert"
    },
    {
        id: 8,
        title: "Grilled Salmon",
        time: 30,
        difficulty: "medium",
        description: "Fresh salmon fillet grilled to perfection with lemon and herbs.",
        category: "seafood"
    }
];

// DOM Selection
const recipeContainer = document.querySelector('#recipe-container');

// Create Recipe Card Function
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>
        </div>
    `;
};

// Render Recipes Function
const renderRecipes = (recipesToRender) => {
    const html = recipesToRender.map(recipe => createRecipeCard(recipe)).join('');
    recipeContainer.innerHTML = html;
};

// Initialize the App
renderRecipes(recipes);
