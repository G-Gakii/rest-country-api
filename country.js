let countryDetail = document.getElementById("country-details");
window.addEventListener("DOMContentLoaded", () => {
  let country = JSON.parse(localStorage.getItem("selectedCountry"));
  countryDetail.innerHTML = "";
  countryDetail.classList.add("container__countryDetail");
  let firstContainer = document.createElement("div");
  let countryFlag = document.createElement("img");
  countryFlag.src = country.flags.svg;
  let countryName = document.createElement("h2");
  countryName.textContent = country.name;
  let countryPopulation = document.createElement("p");
  countryPopulation.innerHTML = `<b>Population:</b> ${country.population}`;
  let countryRegion = document.createElement("p");
  countryRegion.innerHTML = `<b>Region:</b> ${country.region}`;
  let countryCapital = document.createElement("p");
  countryCapital.innerHTML = `<b>Capital:</b> ${country.capital}`;
  let countrynativeName = document.createElement("p");
  countrynativeName.innerHTML = `<b>NativeName:</b> ${country.nativeName}`;
  let countrysubregion = document.createElement("p");
  countrysubregion.innerHTML = `<b>Sub Region:</b> ${country.subregion}`;

  firstContainer.append(
    countrynativeName,
    countryPopulation,
    countryRegion,
    countrysubregion,
    countryCapital
  );
  let secondContainer = document.createElement("div");
  let countryTopleveldomain = document.createElement("p");
  countryTopleveldomain.innerHTML = `<b>Top level Domain:</b> ${country.topLevelDomain}`;
  let countrycurrency = document.createElement("p");
  countrycurrency.innerHTML = `<b>Currency:</b> ${country.currencies[0].name}`;
  let languages = document.createElement("p");
  languages.innerHTML = `<b>languages: </b>`;
  country.languages.forEach((language) => {
    let span = document.createElement("span");
    span.textContent = language.name;
    languages.appendChild(span);
  });

  let borders = document.createElement("p");
  borders.classList.add("borders");
  borders.innerHTML = `<b>borders:</b>`;
  if (Array.isArray(country.borders) && country.borders.length > 0) {
    country.borders.forEach((border) => {
      let button = document.createElement("button");
      button.textContent = border;

      button.addEventListener("click", () => {
        const countriesData = JSON.parse(localStorage.getItem("allCountries"));
        let borderCountry = countriesData.find((c) => c.alpha3Code === border);
        if (borderCountry) {
          localStorage.setItem(
            "selectedCountry",
            JSON.stringify(borderCountry)
          );
          window.location.href = "country.html"; // Redirect to detail page
        } else {
          alert("Country data not found!");
        }
      });
      borders.appendChild(button);
    });
  } else {
    borders.textContent = "Borders: None";
  }

  secondContainer.append(countryTopleveldomain, countrycurrency, languages);
  let detailcontainer = document.createElement("div");
  detailcontainer.append(firstContainer, secondContainer);
  detailcontainer.classList.add("country__details");
  let mainContainer = document.createElement("section");
  mainContainer.append(countryName, detailcontainer, borders);

  countryDetail.append(countryFlag, mainContainer);
});
