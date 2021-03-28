const poke_container = document.getElementById("poke-container");
// number of pokemon requesting
const pokemon_count = 150;
// key:value pairs of type: color
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

// call getPokemon for every number between 1 and 150. Is asynchronous
const fetchPokemon = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
}
// make api call with pokemon id and return json data
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
}