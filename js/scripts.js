// This is an IIFE (Immediately Invoked Function Expression) that contains an array of pokemon objects.
// The Pokemon are fetched from an API and added to the pokemonList array.
// The Function adds the pokemon of the list to the DOM.
// The Function also adds a click event listener to each pokemon button.
// The click event listener calls the showDetails function.
// The showDetails function loads the details of the pokemon from the API and shows them in a modal.
// The modal can be closed by clicking the close button or outside of the modal or by pressing the escape key.
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
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemonButton");
    button.setAttribute("id", pokemon.name);
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
    let modalContainer = document.querySelector("#modal-container");

    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = name;

    let contentElement = document.createElement("p");
    contentElement.innerText = "Height: " + height + "m ";

    let imageElement = document.createElement("img");
    imageElement.src = image;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  // Function to show the details of a pokemon in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  // Function to hide a modal
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  // Function to hide a modal when the escape key is pressed
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

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
