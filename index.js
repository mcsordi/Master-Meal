const meal = document.getElementById("input-meal");
meal.addEventListener("keyup", () => {
  const value = document.getElementById("input-meal").value;
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  const invalid = document.getElementById("content-meal");
  const container = document.getElementById("container");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.meals === null) {
        container.classList.remove("full-container");
        invalid.innerHTML = `<div><h3>Invalid content</h3></div>`;
        return;
      } else if (data.meals !== null) {
        container.classList.add("full-container");
        invalid.innerHTML = `<div><img src=${data.meals[0].strMealThumb} /> <div class="meal-title">${data.meals[0].strMeal}<div class="country">${data.meals[0].strArea}</div></div>
        </div>`;

        return;
      } else {
        container.classList.remove("full-container");
        return;

        //invalid.innerHTML = `<div><img src=${data.meals[0].strMealThumb} /> <div class="meal-title">${data.meals[0].strMeal}</div></div>`;
      }
    });
});
