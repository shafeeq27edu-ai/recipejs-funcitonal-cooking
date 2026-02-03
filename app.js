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

// ============================================
// STATE MANAGEMENT
// ============================================
// Track current filter and sort settings
let currentFilter = 'all';
let currentSort = 'none';

// ============================================
// DOM REFERENCES
// ============================================
const recipeContainer = document.querySelector('#recipe-container');  // From Part 1

// NEW: Select all filter and sort buttons
const filterButtons = document.querySelectorAll('.filter-btn');
const sortButtons = document.querySelectorAll('.sort-btn');

// ============================================
// PURE FILTER FUNCTIONS
// ============================================
// These functions don't modify the original array
// They return a NEW filtered array

// Filter recipes by difficulty level
const filterByDifficulty = (recipes, difficulty) => {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
};

// Filter recipes by maximum cooking time
const filterByTime = (recipes, maxTime) => {
    return recipes.filter(recipe => recipe.time <= maxTime);
};

// Apply the current filter
const applyFilter = (recipes, filterType) => {
    switch(filterType) {
        case 'easy':
            return filterByDifficulty(recipes, 'easy');
        case 'medium':
            return filterByDifficulty(recipes, 'medium');
        case 'hard':
            return filterByDifficulty(recipes, 'hard');
        case 'quick':
            return filterByTime(recipes, 30);
        case 'all':
        default:
            return recipes;  // Return all recipes (no filter)
    }
};

// ============================================
// PURE SORT FUNCTIONS
// ============================================
// sort() mutates the original array, so we create a copy first

// Sort recipes by name (A-Z)
const sortByName = (recipes) => {
    // Create a copy with spread operator, then sort
    return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
};

// Sort recipes by cooking time (fastest first)
const sortByTime = (recipes) => {
    // Create a copy with spread operator, then sort
    return [...recipes].sort((a, b) => a.time - b.time);
};

// Apply the current sort
const applySort = (recipes, sortType) => {
    switch(sortType) {
        case 'name':
            return sortByName(recipes);
        case 'time':
            return sortByTime(recipes);
        case 'none':
        default:
            return recipes;  // Return as-is (no sorting)
    }
};

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

// ============================================
// MAIN UPDATE FUNCTION
// ============================================
// This function combines filter + sort + render

const updateDisplay = () => {
    // Step 1: Start with all recipes
    let recipesToDisplay = recipes;
    
    // Step 2: Apply current filter
    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    
    // Step 3: Apply current sort
    recipesToDisplay = applySort(recipesToDisplay, currentSort);
    
    // Step 4: Render the filtered and sorted recipes
    renderRecipes(recipesToDisplay);
    
    // Step 5: Log for debugging
    console.log(`Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`);
};

// ============================================
// UI HELPER FUNCTIONS
// ============================================

// Update which button looks "active"
const updateActiveButtons = () => {
    // Update filter buttons
    filterButtons.forEach(btn => {
        const filterType = btn.dataset.filter;
        if (filterType === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update sort buttons
    sortButtons.forEach(btn => {
        const sortType = btn.dataset.sort;
        if (sortType === currentSort) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

// ============================================
// EVENT HANDLERS
// ============================================

// Handle filter button clicks
const handleFilterClick = (event) => {
    const filterType = event.target.dataset.filter;
    
    // Update state
    currentFilter = filterType;
    
    // Update UI
    updateActiveButtons();
    updateDisplay();
};

// Handle sort button clicks
const handleSortClick = (event) => {
    const sortType = event.target.dataset.sort;
    
    // Update state
    currentSort = sortType;
    
    // Update UI
    updateActiveButtons();
    updateDisplay();
};

// ============================================
// EVENT LISTENER SETUP
// ============================================

const setupEventListeners = () => {
    // Attach click handlers to all filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Attach click handlers to all sort buttons
    sortButtons.forEach(btn => {
        btn.addEventListener('click', handleSortClick);
    });
    
    console.log('Event listeners attached!');
};

// ============================================
// INITIALIZATION
// ============================================

// Set up event listeners on page load
setupEventListeners();

// Initial render with default filter/sort
updateDisplay();
