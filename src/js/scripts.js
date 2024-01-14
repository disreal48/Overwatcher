// This is an IIFE (Immediately Invoked Function Expression) that contains an array of pokemon objects.
// The Pokemon are fetched from an API and added to the pokemonList array.
// The Function adds the pokemon of the list to the DOM.
// The Function also adds a click event listener to each pokemon button.
// The click event listener calls the showDetails function.
// The showDetails function loads the details of the pokemon from the API and shows them in a modal.
// The modal can be closed by clicking the close button or outside of the modal or by pressing the escape key.
// The modal is created with Bootstrap.
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Function to load the pokemon from the API
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

  // Function to load the details of a pokemon from the API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function to add a pokemon to the pokemonList array
  function add(pokemon) {
    if (typeof pokemon == "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log(
        'Please add a Pokemon object with the keys "name"(str), "height"(int) and "types"(array of str).'
      );
    }
  }

  // Function to get all pokemon from the pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Function to find a pokemon in the pokemonList array
  function findPokemon(pokemonName) {
    return pokemonList.filter((pokemon) => pokemon.name === pokemonName);
  }

  // Function to add a pokemon to the DOM
  function addListItem(pokemon) {
    let pokemonList = document.getElementById("pokemonList");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "btn-block");
    button.classList.add("text-capitalize");
    button.classList.add("text-center");
    button.classList.add("text-monospace");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal-container");
    button.setAttribute("type", "button");
    button.setAttribute("id", pokemon.name);
    button.setAttribute(
      "aria-label",
      "Button to show the details of " + pokemon.name
    );
    button.setAttribute("aria-describedby", "modal-container");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    addEventListener(button, pokemon);
  }

  // Function to add a click event listener to a pokemon button
  function addEventListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // Function to show a modal
  function showModal(name, height, image) {
    let modalBody = document.getElementsByClassName("modal-body")[0];
    let modalTitle = document.getElementsByClassName("modal-title")[0];

    modalBody.innerHTML = "";
    modalTitle.innerHTML = "";

    let nameElement = document.createElement("h1");
    nameElement.classList.add("text-capitalize");
    nameElement.classList.add("text-center");
    nameElement.classList.add("text-primary");
    nameElement.classList.add("text-monospace");
    nameElement.setAttribute("id", "modal-title");
    nameElement.setAttribute("aria-label", "Name of the Pokemon");
    nameElement.innerText = name;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + height + "m";
    heightElement.classList.add("text-capitalize");
    heightElement.classList.add("text-center");
    heightElement.classList.add("text-primary");
    heightElement.classList.add("text-monospace");
    heightElement.setAttribute("id", "modal-body");
    heightElement.setAttribute("aria-label", "Height of the Pokemon");

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", image);
    imageElement.setAttribute("alt", "Image of " + name);
    imageElement.classList.add("img-fluid");
    imageElement.classList.add("mx-auto");
    imageElement.classList.add("d-block");
    imageElement.setAttribute("id", "modal-image");
    imageElement.setAttribute("aria-label", "Image of the Pokemon");

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);

    $(".modal").on("hidden.bs.modal", function () {
      $("#modal-image").html("");
    });
  }

  // Function to show the details of a pokemon in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
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
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
