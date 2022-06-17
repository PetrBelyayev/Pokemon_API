const container = document.querySelector('#container');

const pokemon_count = 150;




const getPokemon = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    console.log(res.data.sprites.other)
    makePokemonCard(res.data)
};
// official-artwork
getPokemon(1)



const makePokemonCard = (res) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon');
    const label = document.createElement('span');
    label.innerText = res.name;
    const newImg = document.createElement('img');
    // newImg.src = `${baseURL}${baseModifier([i])}.png`
    pokemonCard.appendChild(newImg);
    pokemonCard.appendChild(label);
    container.appendChild(pokemonCard);
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