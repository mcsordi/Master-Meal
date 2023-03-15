const inputValue = document.getElementById("input-meal");

inputValue.addEventListener("keyup", () => {
  const value = document.getElementById("input-meal").value.trim();
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  let result = document.getElementById("result");
  let container = document.getElementById("container");
  let list = document.getElementById("list");
  let showButton = document.getElementById("div-button");
  const getApi = () => {
    fetch(url).then((response) =>
      response
        .json()
        .then((data) => {
          let i = 0;
          let ingredients = [];
          let myMeal = data.meals[i];
          let count = 1;
          for (let i in myMeal) {
            let ingredient = "";
            let measure = "";
            if (i.startsWith("strIngredient") && myMeal[i]) {
              ingredient = myMeal[i];
              measure = myMeal[`strMeasure` + count];
              count += 1;
              ingredients.push(`${measure} ${ingredient}`);
            }
          }
          if (data.meals == null) {
            container.classList.remove("full-container");

            showButton.innerHTML = ``;
          } else if (value.length == 0) {
          } else {
            container.classList.add("full-container");
            result.innerHTML = `<div class="info-meals"><img class="image-meal" src=${data.meals[i].strMealThumb} >
          <div class="meal-title"><h2>${data.meals[i].strMeal}</h2>
          <p class="country">${data.meals[i].strArea}</p></div></div>`;
            list.innerHTML = `<div class="lists"><div>• ${ingredients.join(
              "</div><div> • "
            )}</div></div>`;

            showButton.innerHTML = `<button>View Recipe</button>`;
          }
          let parent = document.createElement("ul");
          let viewButton = document.querySelector("button");

          const backgroundRecipe = document.getElementById("background-recipe");
          const divRecipe = document.getElementById("div-recipe");
          viewButton.addEventListener("click", () => {
            backgroundRecipe.style.display = "flex";
            divRecipe.innerHTML = `<div class="img-close"><img id="close-img" class="img-close" src="./src/image/x.svg"/><div id="recipe" class="info-recipe"><p>${data.meals[i].strInstructions}</p></div></div>`;
            document
              .getElementById("close-img")
              .addEventListener("click", () => {
                backgroundRecipe.style.display = "none";
              });
          });
        })

        .catch(() => {
          container.classList.remove("full-container");
          if (value.length == 0) {
            result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
            list.innerHTML = ``;
            showButton.innerHTML = ``;
          } else {
            result.innerHTML = `<h3>Input error</h3>`;
            list.innerHTML = ``;
            showButton.innerHTML = ``;
          }
        })
    );
  };

  getApi();
});

const recipe = document.getElementById("background-recipe");
recipe.style.display = "none";
