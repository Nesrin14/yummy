$('#Ingredients').on('click', function () {
    $('#mealsContainer').addClass('d-none');
    $('#mealDetailsWrapper').addClass('d-none');
    $('#search-section').addClass('d-none');
    $('#contact-us-section').addClass('d-none');
    $('#area-section').addClass('d-none');
    $('#categories-section').addClass('d-none');
    $('#ingredients-section').removeClass('d-none').addClass('d-flex');
});

async function getIngredients() {
    let ingredients = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let ingredientsResponse = await ingredients.json();
    return ingredientsResponse.meals;
}

async function displayIngredients() {
    let ingredientsData = await getIngredients();
    let ingredientsContainer = $('#ingredients-section');

    for (let i = 0; i < ingredientsData.length; i++) {
        let ingredient = ingredientsData[i];

        let ingredientCard = $('<div class="col-md-3 ingredient-card position-relative"></div>').data('index', i);
        let icon = $('<i class="fas fa-drumstick-bite fs-1 text-center text-white"></i>');
        let ingredientName = $('<h2 class="text-center"></h2>').text(ingredient.strIngredient);

        ingredientCard.append(icon);
        ingredientCard.append(ingredientName);
        ingredientsContainer.append(ingredientCard);
    }
}

async function displayMealsByIngredient(ingredientName) {
    let mealsData = await getMealsByIngredient(ingredientName);
    let mealsContainer = $('#mealsContainer');

    mealsContainer.empty();

    for (let i = 0; i < mealsData.length; i++) {
        let meal = mealsData[i];

        let mealCard = $('<div class="col-md-3 meal-card position-relative"></div>').data('index', i);
        let mealImage = $('<img class="w-100 rounded-3" alt="' + meal.strMeal + '" src="' + meal.strMealThumb + '">');
        let mealLayer = $('<div class="meal-layer position-absolute d-flex flex-column align-items-center"></div>');
        let mealName = $('<h2 class="text-center"></h2>').text(meal.strMeal);
        let description = $('<p class="text-white text-center"></p>').text(meal.strDescription);

        mealCard.append(mealImage);
        mealLayer.append(mealName);
        mealLayer.append(description);
        mealCard.append(mealLayer);
        mealsContainer.append(mealCard);
    }

    $('#ingredients-section').addClass('d-none');
    $('#mealsContainer').removeClass('d-none').addClass('d-flex');
}

async function displayIngredientsDetails() {
    let ingredientsContainer = $('#ingredients-section');

    ingredientsContainer.on('click', '.ingredient-card', function () {
        let clickedIngredientCard = $(this);
        let ingredientName = clickedIngredientCard.find('h2').text();

        displayMealsByIngredient(ingredientName);
    });
}

displayIngredients();
displayIngredientsDetails();
