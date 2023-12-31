// This is an IIFE (Immediately Invoked Function Expression) that contains an array of pokemon objects.
// The Pokemon are fetched from an API and added to the pokemonList array.
// The Function adds the pokemon of the list to the DOM.
// The Function also adds a click event listener to each pokemon button that logs the pokemon object to the console.
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon == "object" && "name" in pokemon) {
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
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function addEventListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
