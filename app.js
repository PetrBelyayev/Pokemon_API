import { allWeakness } from "./weakness.js";

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
    
    const pokemonEvolution = res2.data.evolution_chain.url

    const res3 = await axios.get(`${pokemonEvolution}`);
    makePokemonCard(res.data, res2.data, res3.data)
    // first poke
    // console.log(res3.data.chain.species.name)
    // second poke
    // console.log(res3.data.chain.evolves_to[0].species.name)
    // third poke
    // console.log(res3.data.chain.evolves_to[0].evolves_to[0].species.name)
    
    
    
  
    
};




const fetchPokemons = async () => {
    for(let i = 150; i <= 151; i++) {
        await getPokemon(i);
    }
}
fetchPokemons()
// getPokemon(1)
// getPokemon(113)
// getPokemon(151)


const makePokemonCard = (res, res2, res3) => {
    

    

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
    // pokemon image
    const pokemonImg = document.createElement('img');
    pokemonImg.src = `${baseURL}${baseModifier(res.id)}.png`
    pokemonImg.classList.add('pokemonImg')
    pokemonImg.style.background = `-webkit-radial-gradient(center, var(--${type1}) 0%, #ffffff 70%)`;
    // ground, flying, dragon type use a 2 color gradient for labels which will conflict with variable "type1"- use this to apply a single type color gradient from root
    if(res.types[0].type.name === 'dragon' ||
    res.types[0].type.name ==='flying' ||
    res.types[0].type.name ==='ground')
    {
        pokemonImg.style.background = 
        `-webkit-radial-gradient(center, var(--${type1}Single) 0%, #ffffff 70%)`;
    }
    // pokemon height with conversion
    let decimeterToFeet = (res.height/3.048)
    let pokemonTotalHeight = Math.floor(decimeterToFeet) + "'" + Math.round((12 * (decimeterToFeet - Math.floor(decimeterToFeet)))) +'"';

    const pokemonCategory = res2.genera[7].genus.replace('Pokémon', '');

    // pokemon weakness
    allWeakness
    const weakTypeContainer = document.createElement('div');
    weakTypeContainer.classList.add('weakTypeContainer');
    let hasWeakType = allWeakness[type1]

    hasWeakType.forEach(function (hasWeakType) {
        
        let weakTypeLabel = document.createElement('span')
        weakTypeLabel.innerHTML = hasWeakType
        weakTypeLabel.classList.add(`pokemonType${hasWeakType}`)
        weakTypeLabel.style.background = `var(--${hasWeakType})`
        weakTypeContainer.append(weakTypeLabel)

    })

    const evoContainer = document.createElement('div');
    evoContainer.classList.add('evoContainer')

    let evoData = res3.chain;
    let evoChain = []

    do {
        let numberOfEvolutions = evoData['evolves_to'].length;
        
        evoChain.push(evoData.species.url.slice(42, -1));
        if(numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
                evoChain.push(evoData.evolves_to[i].species.url.slice(42, -1));
            }
          }
          
        evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    let maxEvo = evoChain.filter(n => n <= 151);

    for (let i = 0; i < maxEvo.length; i++) {
        if (maxEvo.includes(`${res.id}`) & maxEvo.length > 3) {
            maxEvo.shift(`${res.id}`)
        }
        
        if (maxEvo.length > 1) {
            let evoImage = document.createElement('img');
            evoImage.src = `${baseURL}${baseModifier(maxEvo[i])}.png`;
            evoImage.classList.add('evoImage');
            evoImage.style.border = `1px solid var(--${type1}`
            evoContainer.append(evoImage)
            } else {
                const noEvo = document.createElement('span')
                noEvo.innerText = "This pokemon does not evolve"
                evoContainer.append(noEvo)
            }
        
    }
    

    const category = document.createElement('span');
    const height = document.createElement('span');
    const weight = document.createElement('span');
    const abilities = document.createElement('span');
    const weakness = document.createElement('span');
    const evolution = document.createElement('span');

    category.classList.add('discriptor');
    height.classList.add('discriptor');

    category.innerText = `Category: ${pokemonCategory}`;
    height.innerText = `Height: ${pokemonTotalHeight}`;
    weight.innerText = 'Weight: 15lbs';
    abilities.innerText = 'Abilities: Overgrow';
    weakness.innerText = 'Weakness';
    evolution.innerText = 'Evolution';

    const discriptorContainer1 = document.createElement('div');
    const discriptorContainer2 = document.createElement('div');
    discriptorContainer1.classList.add('discriptorContainer');
    discriptorContainer2.classList.add('discriptorContainer');


    discriptorContainer1.append(category, height)
    discriptorContainer2.append(abilities, weight)

    // appended front components go here
    pokemonCardFront.append(pokemonId);
    pokemonCardFront.append(pokemonImg);
    pokemonCardFront.append(pokemonName);
    pokemonCardFront.append(pokemonType1);
    pokemonCardFront.append(pokemonType2);
    // appended back components go here
    pokemonCardBack.append(discriptorContainer1);
    pokemonCardBack.append(discriptorContainer2);
    pokemonCardBack.append(weakness);
    pokemonCardBack.append(weakTypeContainer);
    pokemonCardBack.append(evoContainer)
    // appended cards
    card.append(pokemonCardFront);
    card.append(pokemonCardBack);
    cardContainer.append(card);
    container.append(cardContainer);
    // event handler 
    card.addEventListener('click', flipCard)
    window.addEventListener('scroll', () => {
        card.classList.remove('flipCard')
    })
    function flipCard() {
        card.classList.toggle('flipCard')
    }
}