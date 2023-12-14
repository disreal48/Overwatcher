const pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Charmander", height: 0.6, types: ["fire"] },
  { name: "Squirtle", height: 0.5, types: ["water"] },
  { name: "Pikachu", height: 0.4, types: ["electric"] },
  { name: "Eevee", height: 0.3, types: ["normal"] },
];

let cards = document.getElementById("cards");

// This is a function that takes a list and iterates over each item in pokemonList.
// It writes the name and height of each pokemon to the browser window.
//It also adds classNames to the divs that are created in order to style them.
// For pokemon greater than or equal to 0.7 in height, it adds the text "Wow, that's big!".

const pokemonPrinter = (pokemonList) => {
  for (let i = 0; i < pokemonList.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");
    let cardContent = "";

    if (pokemonList[i].height >= 0.7) {
      cardContent = document.createTextNode(
        `${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!`
      );
    } else {
      cardContent = document.createTextNode(
        `${pokemonList[i].name} (height: ${pokemonList[i].height})`
      );
    }

    newDiv.appendChild(cardContent);
    document.getElementById("cards").appendChild(newDiv);
  }
};

pokemonPrinter(pokemonList);