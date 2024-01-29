$('#Area').on('click', function () {
    $('#mealsContainer').addClass('d-none');
    $('#mealDetailsWrapper').addClass('d-none');
    $('#search-section').addClass('d-none');
    $('#contact-us-section').addClass('d-none');
    $('#categories-section').addClass('d-none');
    $('#ingredients-section').addClass('d-none');
    $('#area-section').removeClass('d-none').addClass('d-flex');
});
async function getMealArea(){
    let areaData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let areaResponse = await areaData.json();
    return areaResponse.meals;
}

async function displayAreas() {
    let areaDiv = document.getElementById('area-section');
    let areaAll = await getMealArea();

    for (let i = 0; i < areaAll.length; i++) {
        let area = areaAll[i];
        let areaCard = document.createElement('div');
        areaCard.className = 'col-md-3 area-card position-relative mx-auto text-center';
        areaCard.dataset.index = i;

        let areaName = document.createElement('h2');
        areaName.textContent = area.strArea;
        areaName.className = 'text-white p-2';

        let icon = $('<i class="fas fa-house fs-1 text-white"></i>');
        $(areaCard).append(icon);
        $(areaCard).append(areaName);
        $(areaDiv).append(areaCard);
    }
}

async function getAreaMeals(areaMeal){
   let areaMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaMeal}`)
   let response = await areaMeals.json()
   return response.meals;
}

async function displayAreaMeals(areaMeal){
  
    let mealAreaAll = await getAreaMeals(areaMeal);

    for (let i = 0; i < mealAreaAll.length; i++) {
        let area = mealAreaAll[i];
        let areaCard = document.createElement('div');
        areaCard.className = 'col-md-3 area-card position-relative mx-auto text-center';
        areaCard.dataset.index = i;

        let areaName = document.createElement('h2');
        areaName.textContent = area.strArea;
        areaName.className = 'text-white p-2';

        let icon = $('<i class="fas fa-house fs-1 text-white"></i>');
        $(areaCard).append(icon);
        $(areaCard).append(areaName);
        $(areaDiv).append(areaCard);
    }
}


displayAreas();
