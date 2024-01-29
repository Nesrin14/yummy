let sideNavWidth = $('.sideBar-inner').innerWidth();

$('.fa-times').on('click', function () {
    if ($('#side-bar').css('left') === '0px') {
        $('#side-bar').animate({ left: -sideNavWidth }, 500);
        $('.fa-times').removeClass('fa-times').addClass('fa-bars');
    } else {
        $('#side-bar').animate({ left: '0px' }, 500);
        $('.fa-bars').removeClass('fa-bars').addClass('fa-times');
    }
});

$('a[href^="#"]').on('click', function () {
    if ($('#side-bar').css('left') === '0px') {
        $('#side-bar').animate({ left: -sideNavWidth }, 500);
        $('.fa-times').removeClass('fa-times').addClass('fa-bars');
    } else {
        $('#side-bar').animate({ left: '0px' }, 500);
        $('.fa-bars').removeClass('fa-bars').addClass('fa-times');
    }
});




export async function getMeals() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
    let data = await response.json();
    return data.meals;
}

async function displayMeals() {
    let mealsContainer = $('#mealsContainer');
    let meals = await getMeals();

    for (let i = 0; i < meals.length; i++) {
        let meal = meals[i];

        let mealCard = $('<div class="col-md-3 meal-card position-relative"></div>').data('index', i);
        let mealImage = $('<img class="w-100 rounded-3" alt="' + meal.strMeal + '" src="' + meal.strMealThumb + '">');
        let mealLayer = $('<div class="meal-layer position-absolute d-flex align-items-center"><h2>' + meal.strMeal + '</h2></div>');

        mealCard.append(mealImage);
        mealCard.append(mealLayer); 
        mealsContainer.append(mealCard);
    }
}


export function createMealDetails(meal) {
    let detailsContainer = $('<div class="row"></div>');
    let col4Div = $('<div class="col-md-4"></div>');
    let col8Div = $('<div class="col-md-8"></div>');

    let mealImg = $('<img class="w-100" src="' + meal.strMealThumb + '">');
    let mealName = $('<h1 class="text-white text-center mt-3">' + meal.strMeal + '</h1>');

    let mealInstructions = $('<div><h1 class="text-white">Instructions:</h1><p class="text-light fs-5">' + meal.strInstructions + '</p></div>');
    let mealCategory = $('<div><h1 class="text-white">Category:</h1><p class="text-light fs-5">' + meal.strCategory + '</p></div>');
    let mealArea = $('<div><h1 class="text-white">Area:</h1><p class="text-light fs-5">' + meal.strArea + '</p></div>');
    let mealTags = $('<div><h1 class="text-white">Tags:</h1><p class="text-light fs-5">' + meal.strTags + '</p></div>');

    let youtubeButton = $('<button  class="btn btn-danger youtube-btn m-3 "><a href="' + meal.strYoutube + '" target="_blank">YouTube</a></button>');
    let sourceButton = $('<button  class="btn src-btn btn-success"><a href="' + meal.strSource + '" target="_blank">Source</a></button>');

    let btnContainer = $('<div class="btn-container"></div>');
    btnContainer.append(sourceButton);
    btnContainer.append(youtubeButton);
    
    col4Div.append(mealImg);
    col4Div.append(mealName);

    col8Div.append(mealInstructions);
    col8Div.append(mealCategory);
    col8Div.append(mealArea);
    col8Div.append(mealTags);
    col8Div.append(btnContainer);

    detailsContainer.append(col4Div);
    detailsContainer.append(col8Div);

    return detailsContainer;
}

async function displayMealsDetails() {
    let mealsAll = await getMeals();
    let mealsContainer = $('#mealsContainer');
    let mealDetailsWrapper = $('#mealDetailsWrapper');

    mealsContainer.on('click', '.meal-card', function () {
        let clickedMealCard =$(this);
        let mealDetailsContainer = createMealDetails(mealsAll[clickedMealCard.data('index')]);

  
        mealsContainer.hide();
        mealDetailsWrapper.html('').append(mealDetailsContainer).show();
    });
}

export async function getMealsByCategory(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json();
    return data.meals;
}

export async function getMealDetails(mealId) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealId}`);
    let data = await response.json();
    return data.meals[0];
}

displayMeals();
displayMealsDetails();




















