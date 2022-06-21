const container = document.querySelector('#container');
// pokemon image api
const baseURL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'
// base modifier pad image api and the number on card
let baseModifier = (number) => (number <= 999 ? `00${number}` .slice(-3): number);

// pokemon api
const getPokemon = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    
    makePokemonCard(res.data, res2.data)
    // console.log(res.data)

};

const fetchPokemons = async () => {
    for(let i = 1; i <= 898; i++) {
        await getPokemon(i);
    }
}

fetchPokemons()
// getPokemon(80)

const makePokemonCard = (res, res2) => {

    // adds uppercase to labels
    const name = res.name[0].toUpperCase() + res.name.slice(1);
    const type1 = res.types[0].type.name[0].toUpperCase() + res.types[0].type.name.slice(1);

    // converts decimeters to feet
    let decimeterToFeet = res.height/3.048
    
    // converts feet in decimal to feet and inches
    let pokemonTotalHeight = Math.floor(decimeterToFeet) + "'" + Math.round((12 * (decimeterToFeet - Math.floor(decimeterToFeet)))) +'"';

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

    // pokemon height after conversion
    const pokemonHeight = document.createElement('span');
    pokemonHeight.classList.add('pokemonHeight');
    pokemonHeight.innerText = pokemonTotalHeight;

    // pokemon species category
    const pokemonCategory = document.createElement('span');
    pokemonCategory.classList.add('pokemonCategory');
    pokemonCategory.innerText = res2.genera[7].genus.replace('Pokémon', '');
    
    // ground and flying type use a 2 color gradient for labels which will conflict with variable "type1"- use this to apply a single type color gradient from root
    if(res.types[0].type.name === 'dragon' ||
        res.types[0].type.name ==='flying' ||
        res.types[0].type.name ==='ground')
    {
        pokemonImg.style.background = 
        `-webkit-radial-gradient(center, var(--${type1}Single) 0%, #ffffff 70%)`;
    }
    
    // appended components go here
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

    pokemonCardBack.appendChild(pokemonHeight);

    container.appendChild(pokemonCardFront);
    container.appendChild(pokemonCardBack);
    pokemonCardBack.appendChild(pokemonCategory);


   

}
