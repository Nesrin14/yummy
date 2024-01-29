import { createMealDetails, getMealsByCategory, getMealDetails,getMeals } from "./main.js";

$('#Categories').on('click', function () {
    $('#mealsContainer').addClass('d-none');
    $('#mealDetailsWrapper').addClass('d-none');
    $('#search-section').addClass('d-none');
    $('#contact-us-section').addClass('d-none');
    $('#area-section').addClass('d-none');
    $('#ingredients-section').addClass('d-none');
    $('#categories-section').removeClass('d-none').addClass('d-flex');
});

async function getCategoryMeals() {
    let categories = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let categoryResponse = await categories.json();
    return categoryResponse.categories;
}

async function displayCategories() {
    let categoriesData = await getCategoryMeals();
    let categoriesContainer = $('#categories-section');

    for (let i = 0; i < categoriesData.length; i++) {
        let category = categoriesData[i];

        let categoryCard = $('<div class="col-md-3 category-card position-relative"></div>').data('index', i);

        let categoryImage = $('<img class="w-100 rounded-3">').attr('src', category.strCategoryThumb).attr('alt', category.strCategory);

        let categoryLayer = $('<div class="category-layer position-absolute d-flex flex-column align-items-center"></div>');

        let categoryName = $('<h2></h2>').text(category.strCategory);

        let categoryDescription = $('<p class="px-3"></p>').text(category.strCategoryDescription);

        categoryLayer.append(categoryName);
        categoryLayer.append(categoryDescription);

        categoryCard.append(categoryImage);
        categoryCard.append(categoryLayer);

        categoriesContainer.append(categoryCard);
    }
}

async function displayMealsByCategory(categoryName) {
    let mealsData = await getMealsByCategory(categoryName);
    let mealsContainer = $('#mealsContainer');

    mealsContainer.empty(); 

    for (let i = 0; i < mealsData.length; i++) {
        let meal = mealsData[i];

        let mealCard = $('<div class="col-md-3 meal-card position-relative"></div>').data('index', i);
        let mealImage = $('<img class="w-100 rounded-3" alt="' + meal.strMeal + '" src="' + meal.strMealThumb + '">');
        let mealLayer = $('<div class="meal-layer position-absolute d-flex align-items-center"><h2>' + meal.strMeal + '</h2></div>');

        mealCard.append(mealImage);
        mealCard.append(mealLayer);
        mealsContainer.append(mealCard);
    }

    $('#categories-section').addClass('d-none');
    $('#mealsContainer').removeClass('d-none').addClass('d-flex');
}

async function displayMealsDetails() {
    let mealsAll = await getMeals();
    let mealsContainer = $('#mealsContainer');
    let mealDetailsWrapper = $('#mealDetailsWrapper');

    mealsContainer.on('click', '.meal-card', async function () {
        let clickedMealCard = $(this);
        let mealDetails = await getMealDetails(mealsAll[clickedMealCard.data('index')]);

        let mealDetailsContainer = createMealDetails(mealDetails);

        mealsContainer.hide();
        mealDetailsWrapper.html('').append(mealDetailsContainer).show();
    });
}

async function displaycategoriesDetails() {
    let categoriesContainer = $('#categories-section');

    categoriesContainer.on('click', '.category-card', function () {
        let clickedCatCard = $(this);
        let categoryName = clickedCatCard.find('h2').text();

        displayMealsByCategory(categoryName);
    });
}

displayCategories();
displaycategoriesDetails();
displayMealsDetails();
