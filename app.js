const container = document.querySelector('#container');
const baseURL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'
let baseModifier = (number) => (number <= 999 ? `00${number}` .slice(-3): number);

const pokemon_count = 150;


const getPokemon = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    console.log(res.data)
    makePokemonCard(res.data)
};
// official-artwork
getPokemon(4)



const makePokemonCard = (res) => {
    const pokemonCardFront = document.createElement('div');
    pokemonCardFront.classList.add('pokemonCardFront');

    const pokemonCardBack = document.createElement('div');
    pokemonCardBack.classList.add('pokemonCardBack');

    const pokemonName = document.createElement('span');
    pokemonName.classList.add('pokemonName')
    pokemonName.innerText = res.name;

    const pokemonType1 = document.createElement('span');
    pokemonType1.classList.add('pokemonType')
    pokemonType1.innerText = res.types[0].type.name;

    // if pokemon has a second type then append that type
    if(res.types[1]) {
        const pokemonType2 = document.createElement('span');
        pokemonType2.classList.add('pokemonType')
        pokemonType2.innerText = res.types[1].type.name;
        pokemonCardBack.appendChild(pokemonType2);
    }

    const newImg = document.createElement('img');
    newImg.src = `${baseURL}${baseModifier(res.id)}.png`

    pokemonCardBack.appendChild(pokemonType1);
    

    pokemonCardFront.appendChild(pokemonName);
    pokemonCardFront.appendChild(newImg);

    container.appendChild(pokemonCardFront);
    container.appendChild(pokemonCardBack);

    
}

// function makePokemon(i) {
//     const pokemon = document.createElement('div');
//     pokemon.classList.add('pokemon');
//     const label = document.createElement('span');
//     label.innerText = `No. ${i}`;
//     const newImg = document.createElement('img');
//     newImg.src = `${baseURL}${baseModifier([i])}.png`
//     pokemon.appendChild(newImg);
//     pokemon.appendChild(label);
//     container.appendChild(pokemon);
// }

// function allGen() {
//     for(let i = 1; i <= 905; i++) {
//         makePokemon(i);
//     }
// }

// allGen()

// function gen1() {
//     for(let i = 1; i <= 151; i++) {
//         makePokemon(i);
//     }
// }

// // gen1()


// function gen2() {
//     for(let i = 152; i <= 251; i++) {
//         makePokemon(i);
//     }
// }

// // gen2()

// function gen3() {
//     for(let i = 252; i <= 386; i++) {
//         makePokemon(i);
//     }
// }

// gen3()

// function gen4() {
//     for(let i = 387; i <= 493; i++) {
//         makePokemon(i);
//     }
// }

// // gen4()

// function gen5() {
//     for(let i = 494; i <= 649; i++) {
//         makePokemon(i);
//     }
// }

// gen5()