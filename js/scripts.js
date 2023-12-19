// This is an IIFE (Immediately Invoked Function Expression) that contains an array of pokemon objects.
// Each pokemon object has a name, height, and types property.
// You can add, list and find pokemon using the pokemonRepository returned object.
let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
    { name: "Squirtle", height: 0.5, types: ["water"] },
    { name: "Pikachu", height: 0.4, types: ["electric"] },
    { name: "Eevee", height: 0.3, types: ["normal"] },
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

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
  };
})();

// This is a function that takes a list and iterates over each item in pokemonList.
// It writes the name and height of each pokemon to the browser window.
//It also adds classNames to the divs that are created in order to style them.
// For pokemon greater than or equal to 0.7 in height, it adds the text "Wow, that's big!".
const pokemonPrinter = (pokemonList) => {
  pokemonList.forEach(function (pokemon) {
    let cards = document.getElementById("cards");
    let newDiv = document.createElement("div");
    let cardContent = "";

    newDiv.classList.add("card");

    if (pokemon.height >= 0.7) {
      cardContent = document.createTextNode(
        `${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!`
      );
    } else {
      cardContent = document.createTextNode(
        `${pokemon.name} (height: ${pokemon.height})`
      );
    }

    newDiv.appendChild(cardContent);
    document.getElementById("cards").appendChild(newDiv);
  });
};

pokemonPrinter(pokemonRepository.getAll());
