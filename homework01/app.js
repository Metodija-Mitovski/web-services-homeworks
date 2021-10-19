const fs = require("fs");

const dataRoot = "./data";
const outputRoot = "./outputData";

const readData = (fileName) => {
  return new Promise((success, fail) => {
    fs.readFile(`${dataRoot}/${fileName}`, (err, data) => {
      if (err) return fail(err);
      return success(data);
    });
  });
};

const writeData = (fileName, data) => {
  return new Promise((success, fail) => {
    fs.writeFile(`${outputRoot}/${fileName}`, data, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};

/// top 10 countries with highest elevation

const highestElevationCountries = async () => {
  try {
    const data = await readData("country-by-elevation.json");
    const parsedData = JSON.parse(data);
    // clear countries with elevation null
    const countries = parsedData.filter(
      (country) => country.elevation !== null
    );
    const sortCountries = countries.sort((a, b) => {
      return b.elevation - a.elevation;
    });

    const countriesString = JSON.stringify(sortCountries.slice(0, 10));

    await writeData("countries_by_elevation.json", countriesString);
  } catch (error) {
    console.log(error);
  }
};
// highestElevationCountries();

// countries whose capital ends with e

const capitalsWhoEndsIn_e = async () => {
  try {
    const data = await readData("country-by-capital-city.json");
    const parsedData = JSON.parse(data);

    const filteredCountries = parsedData.filter(
      (country) =>
        country.city !== null && country.city[country.city.length - 1] === "e"
    );

    let output = JSON.stringify(filteredCountries);

    await writeData("capitals_ending_in_e.json", output);
  } catch (error) {
    console.log(error);
  }
};
// capitalsWhoEndsIn_e();

// country independence between year1, year2

const countryIndependenceYear = async (year1, year2) => {
  try {
    const data = await readData("country-by-independence-date.json");
    const parsedData = JSON.parse(data);
    let countryByYear = parsedData.filter(
      (country) =>
        country.independence >= year1 && country.independence <= year2
    );

    if (countryByYear.length > 0) {
      const output = JSON.stringify(countryByYear);
      await writeData("country_independence_by_year.json", output);
    } else {
      console.log("no countries found");
    }
  } catch (error) {
    console.log(error);
  }
};

// countryIndependenceYear(1980, 2000);

// countries with life expectancy bellow global average lifeexpectancy

const countriesBellowAvgLifeExpectancy = async () => {
  try {
    const data = await readData("country-by-life-expectancy.json");
    const parsedData = JSON.parse(data);

    let countries = parsedData.filter((country) => country.expectancy !== null);

    let avgLifeExpectancy = countries.reduce((acc, curr) => {
      return acc + curr.expectancy / countries.length;
    }, 0);

    const output = countries.filter(
      (country) => country.expectancy < avgLifeExpectancy.toFixed(1)
    );

    const outputString = JSON.stringify(output);

    await writeData("countries_bellow_avg_life_expectancy.json", outputString);
  } catch (error) {
    console.log(error);
  }
};

// countriesBellowAvgLifeExpectancy();

// countries on eastern hemisphere with population of 2000000 or above

const easternHemisphereCountries = async () => {
  let eastCountries = [];

  try {
    const countriesByCoordinates = await readData(
      "country-by-geo-coordinates.json"
    );

    const countriesByPopulation = await readData("country-by-population.json");

    const parsedCountriesByCoord = JSON.parse(countriesByCoordinates);
    const parsedCountriesBypopulation = JSON.parse(countriesByPopulation);

    parsedCountriesByCoord.forEach((data) => {
      if (data.west > 0) {
        eastCountries.push(data.country);
      }
    });

    const output = parsedCountriesBypopulation.filter((data) => {
      if (eastCountries.includes(data.country) && data.population > 2_000_000) {
        return data;
      }
    });

    const outputString = JSON.stringify(output);

    await writeData(
      "eastern_hemisphere_countries_with_population_above_2000000.json",
      outputString
    );
  } catch (error) {
    console.log(error);
  }
};

// easternHemisphereCountries();

// countries with euro currency

const countriesWithEuroCurrency = async () => {
  const data = await readData("country-by-currency-name.json");
  const parsedData = JSON.parse(data);

  const output = parsedData.filter(
    (country) =>
      country.currency_name !== null &&
      country.currency_name.toLowerCase() === "euro"
  );

  const outputString = JSON.stringify(output);

  await writeData("countries_with_euro_currency.json", outputString);

  try {
  } catch (error) {
    console.log(error);
  }
};

// countriesWithEuroCurrency();

///// europe countries domains

const europeCountryDomains = async () => {
  const europeCountries = [];

  try {
    const domainsData = await readData("country-by-domain-tld.json");
    const parsedDomainsData = JSON.parse(domainsData);
    const countriesByContinent = await readData("country-by-continent.json");
    const parsedCountriesByContinent = JSON.parse(countriesByContinent);

    parsedCountriesByContinent.forEach((data) => {
      if (data.continent.toLowerCase() === "europe") {
        europeCountries.push(data.country);
      }
    });

    const output = parsedDomainsData.filter(
      (data) => data.tld !== null && europeCountries.includes(data.country)
    );

    let outputString = JSON.stringify(output);
    writeData("europe_countries_domains.json", outputString);
  } catch (error) {
    console.log(error);
  }
};
// europeCountryDomains();

// coldeset and wormest countries by average temperature
const coldestWarmestCountry = async () => {
  try {
    const countries = await readData(
      "country-by-yearly-average-temperature.json"
    );

    const parsedData = JSON.parse(countries);

    // clear null values
    const dataWithoutNull = parsedData.filter((d) => d.temperature !== null);

    const sortedData = dataWithoutNull.sort(
      (a, b) => b.temperature - a.temperature
    );

    const warmestCountry = sortedData[0];
    const coldestCountry = sortedData[sortedData.length - 1];

    const output = JSON.stringify({
      warmestCountry,
      coldestCountry,
    });

    await writeData("coldest_warmest_country.json", output);
  } catch (error) {
    console.log(error);
  }
};
// coldestWarmestCountry();

/// largest countries by continents
const largestCountriesByContinents = async () => {
  try {
    const countries = await readData("country-by-continent.json");
    const parsedCountries = JSON.parse(countries);

    const countriesByPopulation = await readData("country-by-population.json");
    const parsedPopulationData = JSON.parse(countriesByPopulation);

    let continents = {};

    parsedCountries.forEach((country) => {
      const { continent } = country;

      if (continents.continent === undefined) {
        continents[continent] = {
          largestCountry: "",
          population: null,
        };
      }
    });

    // add comparison continent to populationData
    parsedPopulationData.forEach((data) => {
      for (let i = 0; i < parsedCountries.length; i++) {
        if (data.country === parsedCountries[i].country) {
          data.continent = parsedCountries[i].continent;
        }
      }
    });

    //check for largest cities
    for (let key in continents) {
      parsedPopulationData.forEach((item) => {
        if (
          key == item.continent &&
          item.population > continents[key].population
        ) {
          continents[key].largestCountry = item.country;
          continents[key].population = item.population;
        }
      });
    }

    const output = JSON.stringify(continents);

    await writeData("largest_countries_by_continents.json", output);
  } catch (error) {
    console.log(error);
  }
};

// largestCountriesByContinents();

// countries in North America with christianity religion

const northAmericaChristianityCountries = async () => {
  try {
    const countries = await readData("country-by-continent.json");
    const parsedCountries = JSON.parse(countries);

    const countriesByReligion = await readData("country-by-religion.json");
    const parsedReligionCountries = JSON.parse(countriesByReligion);

    const christianityCountryNames = [];

    // get christianity country names
    parsedReligionCountries.forEach((data) => {
      if (data.religion.toLowerCase() === "christianity") {
        christianityCountryNames.push(data.country);
      }
    });

    let output = parsedCountries.filter((c) => {
      return (
        c.continent === "North America" &&
        christianityCountryNames.includes(c.country)
      );
    });

    let outputString = JSON.stringify(output);

    writeData("NAmerica_countries_christianity_religion.json", outputString);
  } catch (error) {
    console.log(error);
  }
};

// northAmericaChristianityCountries();

/// sum of countries by religion
const religionCountriesSum = async () => {
  try {
    const data = await readData("country-by-religion.json");
    const parsedData = JSON.parse(data);

    const religions = {};

    parsedData.forEach((country) => {
      if (!(country.religion in religions)) {
        religions[country.religion] = 0;
      } else {
        religions[country.religion] = religions[country.religion] + 1;
      }
    });

    const output = JSON.stringify(religions);

    await writeData("sum_of_countries_by_religion.json", output);
  } catch (error) {
    console.log(error);
  }
};

// religionCountriesSum();

// population in countries where spoken language is only
//english;

const englishLangPopulation = async () => {
  try {
    const countriesByLanguage = await readData("country-by-languages.json");
    const parsedLangCountries = JSON.parse(countriesByLanguage);

    const countriesByPopulation = await readData("country-by-population.json");
    const parsedPopulationCountries = JSON.parse(countriesByPopulation);

    const output = [];

    parsedLangCountries.forEach((data) => {
      parsedPopulationCountries.forEach((popData) => {
        if (
          popData.country === data.country &&
          data.languages.length === 1 &&
          data.languages[0].toLowerCase() === "english"
        ) {
          output.push({
            country: data.country,
            language: "English",
            population: popData.population,
          });
        }
      });
    });

    const outputString = JSON.stringify(output);

    await writeData(
      "countries_population_with_enligsh_only.json",
      outputString
    );
  } catch (error) {
    console.log(error);
  }
};

// englishLangPopulation();

//// countries in Western Europe with population density more than 100

const westernEuropeDensity = async () => {
  try {
    const countriesByRegion = await readData("country-by-region-in-world.json");
    const parsedRegionCountries = JSON.parse(countriesByRegion);

    const westernEuropeCountries = parsedRegionCountries.filter(
      (c) =>
        c.location !== null && c.location.toLowerCase() === "western europe"
    );

    const countriesByDensity = await readData(
      "country-by-population-density.json"
    );
    const parsedCountriesByDensity = JSON.parse(countriesByDensity);

    // add density to western Europe countries
    westernEuropeCountries.map((c) => {
      parsedCountriesByDensity.forEach((data) => {
        if (data.country === c.country) {
          c.density = data.density;
        }
      });

      return c;
    });

    const output = westernEuropeCountries.filter(
      (country) => country.density > 100
    );

    const outputString = JSON.stringify(output);

    await writeData("western_europe_density_more_than_100.json", outputString);
  } catch (error) {
    console.log(error);
  }
};

// westernEuropeDensity();
