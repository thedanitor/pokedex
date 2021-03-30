const poke_container = document.getElementById("poke-container");
const navItems = document.querySelectorAll(".gen-nav button");

let generationIndex = 1;
// array of generation information
const generations = {
  1: {
    start: 1,
    end: 151,
  },
  2: {
    start: 152,
    end: 251,
  },
  3: {
    start: 252,
    end: 386,
  },
  4: {
    start: 387,
    end: 493,
  },
  5: {
    start: 494,
    end: 649,
  },
  6: {
    start: 650,
    end: 721,
  },
  7: {
    start: 722,
    end: 809,
  },
  8: {
    start: 810,
    end: 898,
  },
};

// key:value pairs of type: color
const colors = {
  fire: ["#F08030", "fire"],
  grass: ["#78C850", "grass"],
  electric: ["#FAE078", "lightning"],
  water: ["#6890F0", "water"],
  ground: ["#E0C068", "fighting"],
  rock: ["#B8A038", "fighting"],
  fairy: ["#EE99AC", "psychic"],
  poison: ["#A040A0", "grass"],
  bug: ["#A8B820", "grass"],
  dragon: ["#7038F8", "colorless"],
  psychic: ["#F85888", "psychic"],
  flying: ["#A890F0", "colorless"],
  fighting: ["#C03028", "fighting"],
  normal: ["#A8A878", "colorless"],
  dark: ["#705848", "psychic"],
  ghost: ["#705898", "psychic"],
  ice: ["#98D8D8", "water"],
  steel: ["#B8B8D0", "colorless"],
};

// create array of all types (keys) from colors array
const main_types = Object.keys(colors);

// remove active class from all nav items
const clearActiveClass = () => {
  navItems.forEach(item => {
    item.classList.remove("active");
  });
};

// iterate through nav items
navItems.forEach((item, idx) => {
  // listen for click on nav item
  item.addEventListener("click", () => {
    // clear container div, clear active class on nav item, set generation index to nav item index(+1), change Generation name, fetch pokemon for that gen

    poke_container.innerHTML = "";
    clearActiveClass();
    generationIndex = idx + 1;
    item.classList.add("active");
    fetchPokemon();
  });
});

// call getPokemon for every number between 1 and 150. Is asynchronous
const fetchPokemon = async () => {
  for (
    let i = generations[generationIndex].start;
    i <= generations[generationIndex].end;
    i++
  ) {
    await getPokemon(i);
  }
};

// make api call with pokemon id, return json data, and call createPokemonCard with that data
const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  await createPokemonCard(data);
};

// checks if image url actually exists
const getImage = async id => {
  const url = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  const res = await fetch(url);
  return res.status;
};

// create card with data from api call
const createPokemonCard = async pokemon => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  // capitalize first letter of name and add rest of name using slice, then remove anything after "-"
  const name = (pokemon.name[0].toUpperCase() + pokemon.name.slice(1)).split(
    "-"
  )[0];
  // convert id to string. Add 0 to beginning until is 3 characters long
  const id = pokemon.id.toString().padStart(3, "0");
  // define height (in decimeters)
  let height = pokemon.height;
  // if height is less than 10 dm (1m), then convert to cm. Otherwise convert to m
  height < 10
    ? (height = `${height * 10} cm`)
    : (height = `${(height * 0.1).toFixed(1)} m`);
  // define weight (in hectograms)
  let weight = pokemon.weight;
  // if wight is less than 100 hg (1 kg), then convert to g. Otherwise convert to kg
  weight < 10
    ? (weight = `${weight * 100} g`)
    : (weight = `${(weight * 0.1).toFixed(0)} kg`);
  // get type name from types object
  const poke_types = pokemon.types.map(type => type.type.name);
  // check to see if type exists and matches main_type
  const type = main_types.find(type => poke_types.indexOf(type) > -1);
  // capitalize first letter of type and add rest of type using slice
  const typeName = type[0].toUpperCase() + type.slice(1);
  // use type as index in colors object to get color value as first property
  const color = colors[type][0];
  // set background color of div to color, which is according to type
  pokemonEl.style.backgroundColor = color;
  // use type as index in colors object to get icon value as second property
  const iconType = colors[type][1];
  // if iconType is colorless, the URL has .png instead of webp
  if (iconType === "colorless") {
    let iconURL = `"./images/${iconType}.png"`;
  } else {
    iconURL = `"./images/${iconType}.webp"`;
  }

  const imgSrc = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
  const regIcon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const shinyIcon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`;
  let mainImg;
  // if imgSrc exists, then use it as main image, otherwise use the shinyIcon as main image
  // NEED await since returns a promise
  if ((await getImage(pokemon.id)) === 200) {
    mainImg = imgSrc;
  } else {
    mainImg = regIcon;
  }

  const pokemonInnerHTML = `
  <div class="heading">
    <h3 class="name">${name}</h3>
    <div class="icon">
      <img src=${iconURL} alt="grass" />
    </div>
  </div>
  <div class="img-container">
    <img id=${pokemon.id} class="pokemon-img" src=${mainImg} alt="${name}">
  </div>
  <div class="info">
    <small class="stats"<span>Height: ${height}, Weight: ${weight}</span></small>
    <br>
    <span class="number">#${id}</span>
    <br>
    <small class="type"><span>${typeName}</span> type Pok&#x000E9;mon</small>
  </div>
  <div class="shiny-img-container">
    <a href="https://bulbapedia.bulbagarden.net/wiki/${name}_(Pok%C3%A9mon)" target="_blank" rel="noreferrer">
      <img src=${shinyIcon} alt="${name}">
    </a>
  </div>
    `;

  pokemonEl.innerHTML = await pokemonInnerHTML;
  poke_container.appendChild(pokemonEl);
};

// fetch on page load
fetchPokemon();
