// IIFE (Imediately Invoked Function Expresssions)

(async function () {
  // connect to json file
  const response = await fetch("../json/recipes.json");
  const recipes = await response.json();
  //console.log(recipes);

  const inpElem = document.getElementById("searchInput");
  const btnElem = document.getElementById("searchBtn");
  const listElem = document.getElementById("recipe-list");
  const detailsElem = document.getElementById("recipeDetailsContainer");

  function loadRecipeDetails(recipe) {
    // console.log(recipe);
    detailsElem.innerHTML = `
          <h2>${recipe.title}</h2>
          <h3>Ingredients:</h3>
          <ul>${recipe.ingredients.map(function (ingredient) {
      return "<li>" + ingredient + "</li>";
    }).join("")}</ul>
          <h3>Instruction:</h3>
          <p>${recipe.instructions}</p>
    `;
  }

  function displaySearchResult(results) {
    listElem.innerHTML = "";
    results.forEach(function (recipe) {
      // console.log(recipe);
      const createList = document.createElement("li");
      const listItem = `
          <h2 class="title">${recipe.title}</h2>
          <div class="description">${recipe.description}</div>
      `;
      createList.innerHTML = listItem;
      createList.addEventListener("click", function () {
        loadRecipeDetails(recipe);
      });
      listElem.appendChild(createList);
    });
  }

  function search() {
    const query = inpElem.value.toLowerCase();
    const results = recipes.filter(function (recipe) {
      return (recipe.title.toLowerCase().includes(query) || recipe.ingredients.join(" ").toLowerCase().includes(query));
    });
    // console.log(results);
    displaySearchResult(results);
  }
  btnElem.addEventListener("click", search);

})();