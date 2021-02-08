const searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", function () {
  const inputValue = document.getElementById("input").value;
  displayMeal(inputValue);
});

const displayMeal = (inputValue) => {
  if (inputValue === "") {
    alert("Please input a name!");
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
      .then((res) => res.json())
      .then((data) => showMealsOnUI(data.meals))
      .catch((error) => {
        alert("Sorry! nothing was found");
        document.getElementById("input").value = "";
      });
  }
};

const showMealsOnUI = (items) => {
  const container = document.getElementById("container");
  container.innerHTML = "";

  items.forEach((meal) => {
    const createDiv = document.createElement("div")
    createDiv.classList.add("meal")
    const html = `
     <img class="mealImg" src="${meal.strMealThumb}">
     <h3 class="mealHeader">${meal.strMeal}</h3>
     `;

    createDiv.innerHTML = html;
    container.appendChild(createDiv);

    createDiv.addEventListener("click", () => {
      const displayIngredients = document.getElementById("displayIngredients");
      const createNewDiv = document.createElement("div");
      
      const ingredientHTML = `
          <img class="mealImg" src="${meal.strMealThumb}">
          <h2 class="mealHeader">${meal.strMeal}</h2>
          <h4>Ingredients</h4>

          <form style="margin-bottom: 50px">
            <li class="liText" type="checkbox" checked>${meal.strMeasure1} ${meal.strIngredient1}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure2} ${meal.strIngredient2}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure3} ${meal.strIngredient3}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure4} ${meal.strIngredient4}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure5} ${meal.strIngredient5}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure6} ${meal.strIngredient6}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure7} ${meal.strIngredient7}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure8} ${meal.strIngredient8}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure9} ${meal.strIngredient9}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure10} ${meal.strIngredient10}</li><br>
            <li class="liText" type="checkbox" checked>${meal.strMeasure11} ${meal.strIngredient11}</li><br>
          </form>
      `;

      createNewDiv.innerHTML = ingredientHTML;
      displayIngredients.appendChild(createNewDiv);

      const ingredientLists = document.querySelectorAll(".liText");
      for (let i = 0; i < ingredientLists.length; i++) {
        const liItem = ingredientLists[i];
        if (liItem.innerText === "") {
          liItem.classList.add("remove");
        }
      }
    });
  });
};
