// This is an IIFE (Immediately Invoked Function Expression) that contains an array of pokemon objects.
// Each pokemon object has a name, height, and types property.
// You can add, list and find pokemon using the pokemonRepository returned object.
// The Function also adds the pokemon of the list to the DOM.
// The Function also adds a click event listener to each pokemon button that logs the pokemon object to the console.
let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Squirtle", height: 0.5, types: ["water"] },
    { name: "Pikachu", height: 0.4, types: ["electric"] },
    { name: "Eevee", height: 0.3, types: ["normal"] },
    { name: "Mew", height: 0.4, types: ["psychic"] },
    { name: "Mewtwo", height: 2, types: ["psychic"] },
    { name: "Gengar", height: 1.5, types: ["ghost", "poison"] },
    { name: "Gyarados", height: 6.5, types: ["water", "flying"] },
    { name: "Golem", height: 1.4, types: ["rock", "ground"] },
    { name: "Machamp", height: 1.6, types: ["fighting"] },
    { name: "Moltres", height: 2, types: ["fire", "flying"] },
    { name: "Zapdos", height: 1.6, types: ["electric", "flying"] },
    { name: "Articuno", height: 1.7, types: ["ice", "flying"] },
    { name: "Dragonite", height: 2.2, types: ["dragon", "flying"] },
    { name: "Garchomp", height: 1.9, types: ["dragon", "ground"] },
    { name: "Greninja", height: 1.5, types: ["water", "dark"] },
    { name: "Charizard", height: 1.7, types: ["fire", "flying"] },
    { name: "Venusaur", height: 2, types: ["grass", "poison"] },
    { name: "Blastoise", height: 1.6, types: ["water"] },
    { name: "Lapras", height: 2.5, types: ["water", "ice"] },
    { name: "Snorlax", height: 2.1, types: ["normal"] },
    { name: "Gardevoir", height: 1.6, types: ["psychic", "fairy"] },
    { name: "Lucario", height: 1.2, types: ["fighting", "steel"] },
    { name: "Gallade", height: 1.6, types: ["psychic", "fighting"] },
  ];

  function add(pokemon) {
    if (
      typeof pokemon == "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log(
        'Please add a Pokemon object with the keys "name"(str), "height"(int) and "types"(array of str).'
      );
    }
  }

  function getAll() {
    return pokemonList;
  }

  function findPokemon(pokemonName) {
    return pokemonList.filter((pokemon) => pokemon.name === pokemonName);
  }

  function addListItem(pokemon) {
    let pokemonList = document.getElementById("pokemonList");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemonButton");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    addEventListener(button, pokemon);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addEventListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
  };
})();

// This is a function that takes a list and iterates over each item in pokemonList.
// It writes the name and height of each pokemon to the browser window.
//It also adds classNames to the divs that are created in order to style them.
// For pokemon greater than or equal to 0.7 in height, it adds the text "Wow, that's big!".

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
