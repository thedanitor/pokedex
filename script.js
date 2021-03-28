const poke_container = document.getElementById("poke-container");
const nextBtn = document.getElementById("nextBtn");
const genName = document.querySelector(".gen-name");

let generationIndex = 1;

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



// number of pokemon requesting
const pokemon_count = 151;
// key:value pairs of type: color
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
// create array of all types (keys) from colors array
const main_types = Object.keys(colors);

// call getPokemon for every number between 1 and 150. Is asynchronous
const fetchPokemon = async () => {
  for (let i = generations[generationIndex].start; i <= generations[generationIndex].end; i++) {
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
  // use type as index in colors array to get color value
  const color = colors[type];
  // set background color of div to color, which is according to type
  pokemonEl.style.backgroundColor = color;


  const pokemonInnerHTML = `
    <div class="img-container">
          <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
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
    genName.innerHTML = `${generations[generationIndex].name} Generation`
}

getGenName();
fetchPokemon();

// listen for click on button 
nextBtn.addEventListener("click", () => {
    // clear container div, increase generation index by 1, change Generation name, fetch pokemon for that gen
    poke_container.innerHTML = "";
    generationIndex++;
    getGenName();
    fetchPokemon();
})
