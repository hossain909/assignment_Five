const inputVal = document.getElementById("inputVal");
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  const inputText = inputVal.value;
  displayMeal(inputText);
});

const displayMeal = (inputMeal) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
    .then((res) => res.json())
    .then((data) => showMeals(data.meals))
    .catch(error => {
      alert("Sorry! nothing was found")
      document.getElementById("inputVal").value = "";
    })
};

const showMeals = (meals) => {
  const container = document.getElementById("container");
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");
    const mealInfo = `
           <img class="mealImg" src="${meal.strMealThumb}">
            <h3 class="mealHeader">${meal.strMeal}</h3>
           `;
    mealDiv.innerHTML = mealInfo;
    container.appendChild(mealDiv);
    mealDiv.addEventListener("click", () => {
      const displayIngredients = document.getElementById("displayIngredients");
      const createNewDiv = document.createElement("div");
      const ingredientHTML = `
            <img class="mealImg" src="${meal.strMealThumb}">
            <h2 class="mealHeader">${meal.strMeal}</h2>
            <h4>Ingredients</h4>
            <form style="margin-bottom: 50px">
              <input type="checkbox" checked> ${meal.strIngredient1}</input><br>
              <input type="checkbox" checked> ${meal.strIngredient2}</input><br>
              <input type="checkbox" checked> ${meal.strIngredient3}</input><br>
              <input type="checkbox" checked> ${meal.strIngredient4}</input><br>
              <input type="checkbox" checked> ${meal.strIngredient5}</input><br>
              <input type="checkbox" checked> ${meal.strIngredient6}</input>
            <form>
            `;
      createNewDiv.innerHTML = ingredientHTML;
      displayIngredients.appendChild(createNewDiv);
    });
  });
};
