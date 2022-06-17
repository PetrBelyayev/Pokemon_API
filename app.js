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
getPokemon(1)



const makePokemonCard = (res) => {
    const name = res.name[0].toUpperCase() + res.name.slice(1);
    const type1 = res.types[0].type.name[0].toUpperCase() + res.types[0].type.name.slice(1);
    const type2 = res.types[1].type.name[0].toUpperCase() + res.types[1].type.name.slice(1);



    const pokemonCardFront = document.createElement('div');
    pokemonCardFront.classList.add('pokemonCardFront');

    const pokemonCardBack = document.createElement('div');
    pokemonCardBack.classList.add('pokemonCardBack');
    
    const pokemonName = document.createElement('span');
    pokemonName.classList.add('pokemonName')
    pokemonName.innerText = name;

    const pokemonType1 = document.createElement('span');
    pokemonType1.classList.add(`pokemonType${type1}`)
    console.log(pokemonType1.classList)
    
    pokemonType1.innerText = type1;

    

    // if pokemon has a second type then append that type
    if(res.types[1]) {
        const pokemonType2 = document.createElement('span');
        pokemonType2.classList.add(`pokemonType${type2}`)
        pokemonType2.innerText = type2;
        pokemonCardBack.appendChild(pokemonType2);
    }

    // applies selector class name based on type
    // if (pokemonType1.innerText === "grass") {
    //     console.log("Green")
    //     pokemonType1.classList.add('pokemonTypeGrass')
    // }

    // function checkType (type) {
    //    return pokemonType1.classList.add(`pokemonType${type}`)
    // }
    // checkType(res.types[0].type.name)

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