const poke_container = document.getElementById("poke-container");
const nextBtn = document.getElementById("nextBtn");
const genName = document.querySelector(".gen-name");
const navItems = document.querySelectorAll(".gen-nav ul li");

let generationIndex = 1;
// array of generation information
const generations = {
  1: {
    start: 1,
    end: 151,
    name: "First",
  },
  2: {
    start: 152,
    end: 251,
    name: "Second",
  },
  3: {
    start: 252,
    end: 386,
    name: "Third",
  },
  4: {
    start: 387,
    end: 493,
    name: "Fourth",
  },
  5: {
    start: 494,
    end: 649,
    name: "Fifth",
  },
  6: {
    start: 650,
    end: 721,
    name: "Sixth",
  },
  7: {
    start: 722,
    end: 809,
    name: "Seventh",
  },
  8: {
    start: 810,
    end: 898,
    name: "Eighth",
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
  createPokemonCard(data);
};
// create card with data from api call
const createPokemonCard = pokemon => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  // capitalize first letter of name and add rest of name using slice
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  // convert id to string. Add 0 to beginning until is 3 characters long
  const id = pokemon.id.toString().padStart(3, "0");
  // get type name from types object
  const poke_types = pokemon.types.map(type => type.type.name);
  // check to see if type exists and matches main_type
  const type = main_types.find(type => poke_types.indexOf(type) > -1);
  // use type as index in colors object to get color value as first property
  const color = colors[type][0];
  // set background color of div to color, which is according to type
  pokemonEl.style.backgroundColor = color;
  // use type as index in colors object to get icon value as second property
  const iconType = colors[type][1];
  // if iconType is colorless, the URL has .png instead of webp
  if (iconType === "colorless") {
    iconURL = `"./images/${iconType}.png"`;
  } else {
    iconURL = `"./images/${iconType}.webp"`;
  }

  const pokemonInnerHTML = `
  <div class="heading">
    <div class="icon">
      <img src=${iconURL} alt="grass" />
    </div>
    <h3 class="name">${name}</h3>
  </div>
  <div class="img-container">
    <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}">
  </div>
  <div class="info">
    <small class="stats"<span>Height: ${pokemon.height}, Weight: ${pokemon.weight}</span></small>
    <br>
    <span class="number">#${id}</span>
    <br>
    <small class="type">Type: <span>${type}</span></small>
  </div>
  <div class="shiny-img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png" alt="${name}">
  </div>
    `;

  pokemonEl.innerHTML = pokemonInnerHTML;
  poke_container.appendChild(pokemonEl);
};

const getGenName = () => {
  genName.innerHTML = `${generations[generationIndex].name} Generation`;
};

getGenName();
fetchPokemon();

navItems.forEach((item, idx) => {
  item.addEventListener("click", () => {
    poke_container.innerHTML = "";
    clearActiveClass();
    generationIndex = idx + 1;
    item.classList.add("active");
    getGenName();
    fetchPokemon();
  });
});

const clearActiveClass = () => {
  navItems.forEach(item => {
    item.classList.remove("active");
  });
};

// listen for click on button
nextBtn.addEventListener("click", () => {
  // clear container div, increase generation index by 1, change Generation name, fetch pokemon for that gen
  poke_container.innerHTML = "";
  generationIndex++;
  getGenName();
  fetchPokemon();
});
