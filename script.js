let countriesContainer = document.getElementById("countries");
let searchedCountry = document.getElementById("country");
let countriesInRegion = document.getElementById("region");

let countriesData;
let countryContainer;
const fetchCountries = async () => {
  try {
    const response = await fetch("data.json");
    countriesData = await response.json();
    localStorage.setItem("allCountries", JSON.stringify(countriesData));

    displayCountries(countriesData);
  } catch (error) {
    console.log(error);
  }
};

const displayCountries = (data) => {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    countryContainer = document.createElement("div");
    countryContainer.classList.add("country__container");
    let countryFlag = document.createElement("img");
    countryFlag.src = country.flags.svg;
    let countryName = document.createElement("h2");
    countryName.textContent = country.name;
    let countryPopulation = document.createElement("p");
    countryPopulation.textContent = `population: ${country.population}`;
    let countryRegion = document.createElement("p");
    countryRegion.textContent = `Region: ${country.region}`;
    let countryCapital = document.createElement("p");
    countryCapital.textContent = `Capital: ${country.capital}`;

    countryContainer.append(
      countryFlag,
      countryName,
      countryPopulation,
      countryRegion,
      countryCapital
    );
    countryContainer.addEventListener("click", () => {
      localStorage.setItem("selectedCountry", JSON.stringify(country));
      window.location.href = "country.html";
    });

    countriesContainer.appendChild(countryContainer);
  });
};
fetchCountries();

searchedCountry.addEventListener("input", () => {
  if (!countriesData.length) return;
  let searchTerm = searchedCountry.value.toLowerCase();
  let filteredcountries = countriesData.filter((country) =>
    country.name.toLowerCase().includes(searchTerm)
  );

  displayCountries(filteredcountries);
});

countriesInRegion.addEventListener("change", () => {
  let searchedRegion = countriesInRegion.value.toLowerCase();
  let filteredcountries = countriesData.filter((country) =>
    country.region.toLowerCase().includes(searchedRegion)
  );
  console.log(filteredcountries);

  displayCountries(filteredcountries);
});
