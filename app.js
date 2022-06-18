const container = document.querySelector('#container');
// pokemon image api
const baseURL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'
// base modifier pad image api and the number on card
let baseModifier = (number) => (number <= 999 ? `00${number}` .slice(-3): number);


// pokemon data api
const getPokemon = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    // console.log(res.data.abilities[0].ability)
    console.log(res.data)
    makePokemonCard(res.data)
};

// function allGen() {
//     for(let i = 1; i <= 351; i++) {
//         getPokemon(i);
//     }
// }

// allGen()

getPokemon(3)



const makePokemonCard = (res) => {
    const name = res.name[0].toUpperCase() + res.name.slice(1);
    const type1 = res.types[0].type.name[0].toUpperCase() + res.types[0].type.name.slice(1);
    

    // pokemon card front
    const pokemonCardFront = document.createElement('div');
    pokemonCardFront.classList.add('pokemonCardFront');

    // pokemon card back (experimental)
    const pokemonCardBack = document.createElement('div');
    pokemonCardBack.classList.add('pokemonCardBack');
    

    // pokemon title
    const pokemonName = document.createElement('span');
    pokemonName.classList.add('pokemonName')
    pokemonName.innerText = name;

    // pokemon id/number
    const pokemonId= document.createElement('span');
    pokemonId.classList.add('pokemonId')
    pokemonId.innerText = baseModifier(res.id);

    // pokemon first type info
    
    const pokemonType1 = document.createElement('span');
    pokemonType1.classList.add(`pokemonType${type1}`)
    pokemonType1.innerText = type1;
    pokemonType1.style.background = `var(--${type1})`

  
    

    // pokemon image (using a seperate api)
    const pokemonImg = document.createElement('img');
    pokemonImg.src = `${baseURL}${baseModifier(res.id)}.png`
    pokemonImg.classList.add('pokemonImg')
    pokemonImg.style.background = `-webkit-radial-gradient(center, var(--${type1}) 0%, #ffffff 70%)`;
    
    const dualTypes = ['dragon', 'flying', 'ground']
    // ground and flying type use a 2 color gradient for labels which will conflict with variable "type1"- use this to apply a single type color gradient from root

    if(res.types[0].type.name === 'dragon' ||
        res.types[0].type.name ==='flying' ||
        res.types[0].type.name ==='ground')
    {
        pokemonImg.style.background = 
        `-webkit-radial-gradient(center, var(--${type1}Single) 0%, #ffffff 70%)`;
    }
    
    

    pokemonCardFront.appendChild(pokemonName);
    pokemonCardFront.appendChild(pokemonImg);
    pokemonCardFront.appendChild(pokemonId);
    pokemonCardBack.appendChild(pokemonType1);
    // if pokemon has a second type then append that type
    if(res.types[1]) {
        const type2 = res.types[1].type.name[0].toUpperCase() + res.types[1].type.name.slice(1);
        const pokemonType2 = document.createElement('span');
        pokemonType2.classList.add(`pokemonType${type2}`)
        pokemonType2.style.background = `var(--${type2})`
        pokemonType2.innerText = type2;
        pokemonCardBack.appendChild(pokemonType2);
    }

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