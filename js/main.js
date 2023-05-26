const pokemonList = document.getElementById("pokemon-list");
const headerButtons = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => showPokemon(data))
}

function showPokemon(poke) {

    let pokemonTypes = poke.types.map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`); //.map generates an array
    pokemonTypes = pokemonTypes.join(''); // join elements from an array to one string

    let pokeId = poke.id.toString();
    if(pokeId.length === 1) {
        pokeId ="00" + pokeId;
    } else if(pokeId.length === 2) {
        pokeId ="0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    
    <p class="pokemon-id-back">${pokeId}</p>
    <div class="pokemon-image">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="Pikachu">
    </div>
    <div class="pokemon-info">
        <div class="name-container">
            <p class="pokemon-id">${pokeId}</p>
            <h2 class="pokemon-name">${poke.name}</h2>
        </div>
        <div class="pokemon-types">
            ${pokemonTypes}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${poke.height}</p>
            <p class="stat">${poke.weight}</p>
        </div>
    </div>
    
    `;

    pokemonList.append(div); 

}

//we want show a pokemon category depends of what we click:
headerButtons.forEach(button => button.addEventListener("click", (event) => {
    const idButton = event.currentTarget.id; //currenTarget brings from html what we want 
    
    pokemonList.innerHTML = "";

    //There are 151 pokemons
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json()) //format to Json
            .then(data => {
                if(idButton === "see-all") {
                    showPokemon(data);
                } else {
                    const pokemonTypes = data.types.map(type => type.type.name);
                    if (pokemonTypes.some(type => type.includes(idButton))) //search types inside each one array, and see if they are the same than id that the user press (ex: if types "electric", shows only the electric pokemons)
                    {
                        showPokemon(data);
                    }
                }
            }) //show data from json
    }
}));