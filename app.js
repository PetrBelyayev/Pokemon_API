const container = document.querySelector('#container');
// pokemon image api
const baseURL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'
// base modifier pad image api and the number on card
let baseModifier = (number) => (number <= 999 ? `00${number}` .slice(-3): number);
// pokemon api
const getPokemon = async (id) => {
    const pokemonDataUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const res = await axios.get(pokemonDataUrl);
    const res2 = await axios.get(pokemonSpeciesUrl);
    
    makePokemonCard(res.data, res2.data)
    // console.log(res2.data.id)
};
const fetchPokemons = async () => {
    for(let i = 1; i <= 5; i++) {
        await getPokemon(i);
    }
}

fetchPokemons()
// getPokemon(80)

const makePokemonCard = (res, res2) => {
    // pokemon card front and back
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');
    const card = document.createElement('div');
    card.classList.add('card');
    const pokemonCardFront = document.createElement('div');
    pokemonCardFront.classList.add('pokemonCardFront');
    const pokemonCardBack = document.createElement('div');
    pokemonCardBack.classList.add('pokemonCardBack');
    // pokemon name
    const name = res.name[0].toUpperCase() + res.name.slice(1);
    const pokemonName = document.createElement('span');
    pokemonName.classList.add('pokemonName')
    pokemonName.innerText = name;
    // pokemon id
    const pokemonId= document.createElement('span');
    pokemonId.classList.add('pokemonId')
    pokemonId.innerText = `#${baseModifier(res.id)}`;
    // pokemon types
    const type1 = res.types[0].type.name[0].toUpperCase() + res.types[0].type.name.slice(1);
    const pokemonType1 = document.createElement('span');
    const typeContainer = document.createElement('div');
    typeContainer.classList.add('typeContainer');
    pokemonType1.classList.add(`pokemonType${type1}`);
    pokemonType1.innerText = type1;
    pokemonType1.style.background = `var(--${type1})`;
    // if pokemon has a second type then append that type
    const pokemonType2 = document.createElement('span');
    if(res.types[1]) {
    const type2 = res.types[1].type.name[0].toUpperCase() + res.types[1].type.name.slice(1);
    pokemonType2.classList.add(`pokemonType${type2}`)
    pokemonType2.style.background = `var(--${type2})`
    pokemonType2.innerText = type2;
    }
    typeContainer.appendChild(pokemonType1);
    typeContainer.appendChild(pokemonType2);
    // pokemon image (using a seperate api)
    const pokemonImg = document.createElement('img');
    // ground, flying, dragon type use a 2 color gradient for labels which will conflict with variable "type1"- use this to apply a single type color gradient from root
    if(res.types[0].type.name === 'dragon' ||
    res.types[0].type.name ==='flying' ||
    res.types[0].type.name ==='ground')
    {
        pokemonImg.style.background = 
        `-webkit-radial-gradient(center, var(--${type1}Single) 0%, #ffffff 70%)`;
    }
    pokemonImg.src = `${baseURL}${baseModifier(res.id)}.png`
    pokemonImg.classList.add('pokemonImg')
    pokemonImg.style.background = `-webkit-radial-gradient(center, var(--${type1}) 0%, #ffffff 70%)`;
    // pokemon height with conversion
    let decimeterToFeet = res.height/3.048
    let pokemonTotalHeight = Math.floor(decimeterToFeet) + "'" + Math.round((12 * (decimeterToFeet - Math.floor(decimeterToFeet)))) +'"';
    const pokemonHeight = document.createElement('span');
    pokemonHeight.classList.add('pokemonHeight');
    pokemonHeight.innerText = pokemonTotalHeight;
    // pokemon species category
    const pokemonCategory = document.createElement('span');
    pokemonCategory.classList.add('pokemonCategory');
    pokemonCategory.innerText = res2.genera[7].genus.replace('Pokémon', '');
 // appended components go here
    
    pokemonCardFront.appendChild(pokemonId);
    pokemonCardFront.appendChild(pokemonImg);
    pokemonCardFront.appendChild(pokemonName);
    pokemonCardFront.appendChild(typeContainer)
    pokemonCardBack.appendChild(pokemonHeight);
    pokemonCardBack.appendChild(pokemonCategory);
    card.appendChild(pokemonCardFront);
    card.appendChild(pokemonCardBack);
    cardContainer.appendChild(card);
    container.appendChild(cardContainer);



    card.addEventListener('click', flipCard);
    function flipCard() {
        card.classList.toggle('flipCard');
    }
 
}


