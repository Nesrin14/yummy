$('#search').on('click', function () {
    $('#contact-us-section').addClass('d-none');
    $('#categories-section').addClass('d-none');
    $('#area-section').addClass('d-none');
    $('#ingredients-section').addClass('d-none');$('#mealsContainer').removeClass('d-none');
    $('#search-section').removeClass('d-none').addClass('d-block');
    

});
$(document).ready(function () {
    let searchTimeout;

    $('#mealInput').on('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(displayMealByName, 300); 
    });

    async function displayMealByName() {
        let mealInput = document.getElementById('mealInput').value.toLowerCase();
        let mealsContainer = $('#mealsContainer');

        mealsContainer.empty();

        if (mealInput.trim() === '') {
            return; 
        }

        mealsContainer.html('<p>Loading...</p>'); 

        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`);
        let response = await meals.json();

        if (!response.meals) {
            mealsContainer.html('<p>No matching meals found.</p>');
        } else {
            for (let i = 0; i < response.meals.length; i++) {
                let meal = response.meals[i];

                let mealCard = $('<div class="col-md-3 meal-card position-relative"></div>').data('index', i);
                let mealImage = $('<img class="w-100 rounded-3" alt="' + meal.strMeal + '" src="' + meal.strMealThumb + '">');
                let mealLayer = $('<div class="meal-layer position-absolute d-flex align-items-center"><h2>' + meal.strMeal + '</h2></div>');

                mealCard.append(mealImage);
                mealCard.append(mealLayer);
                mealsContainer.append(mealCard);
            }
        }
    }
});