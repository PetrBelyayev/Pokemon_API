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
    console.log(res)
};

const fetchPokemons = async () => {
    for(let i = 1; i <= 905; i++) {
        await getPokemon(i);

    }
}
fetchPokemons()
// getPokemon(70)
// getPokemon(23)
// getPokemon(151)
// getPokemon(133)

function nameModifier (word) {
    return word[0].toUpperCase() + word.slice(1).replace(/([-])\w/, '')
}

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
    const name = nameModifier(res.name);
    const pokemonName = document.createElement('span');
    pokemonName.classList.add('pokemonName')
    pokemonName.innerText = name;
    // pokemon id  
    const pokemonId= document.createElement('span');
    pokemonId.classList.add('pokemonId')
    pokemonId.innerText = `#${baseModifier(res.id)}`;
    // pokemon types
    const type1 = nameModifier(res.types[0].type.name);
    const pokemonType1 = document.createElement('span');
    pokemonType1.classList.add(`pokemonType${type1}`);
    pokemonType1.innerText = type1;
    pokemonType1.style.background = `var(--${type1})`;
    // if pokemon has a second type then append that type
    const pokemonType2 = document.createElement('span');

    
    if(res.types[1]) {
    const type2 = nameModifier(res.types[1].type.name);
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
    // pokemon height conversion
    function convertToFeet(res) {
        let feet = Math.floor(Math.round(12 * res.height/3.048)/12);
        let inches = Math.round(12 * res.height/3.048)%12;
        return feet + `' ` + inches + `"`;
    }
    
    // res.data shorthand
    const pokemonCategory = nameModifier(res2.genera[7].genus.replace('Pokémon', ''));
    const pokemonAbilities = nameModifier(res.abilities[0].ability.name);
    const pokemonWeight = (res.weight/4.536).toFixed(1);
    const pokemonHeight = convertToFeet(res);

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

    const evoImagesContainer = document.createElement('div');
    evoImagesContainer.classList.add('evoImagesContainer')
    const evoNamesContainer = document.createElement('div');
    evoNamesContainer.classList.add('evoNamesContainer')

    let evoData = res3.chain;
    let evoChain = []
    let evoName = []

    do {
        let numberOfEvolutions = evoData['evolves_to'].length;
        evoChain.push(evoData.species.url.slice(42, -1), evoData.species.name);
        evoName.push(nameModifier(evoData.species.name));
        if(numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
                evoChain.push(evoData.evolves_to[i].species.url.slice(42, -1));
                evoName.push(nameModifier(evoData.evolves_to[i].species.name));
            }
          }
        evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    let maxEvo = evoChain.filter(n => n <= 905);
// checks if evolution chain has more than 3 (gen1 eevee has 4), remove the current selected pokemon from the chain to make room for the remaining 3 pokemone in the chain(aesthetic)
    for (let i = 0; i < maxEvo.length; i++) {
        if (maxEvo.includes(`${res.id}`) & maxEvo.length > 3) {
            maxEvo.shift(`${res.id}`)
            evoChain[i]
        }
        
        if (maxEvo.length > 1) {
            let evoImage = document.createElement('img');
            evoImage.src = `${baseURL}${baseModifier(maxEvo[i])}.png`;
            evoImage.classList.add('evoImage');
            let evoNames = document.createElement('span');
            evoNames.classList.add('evoNames')
            evoNames.innerText = `${evoName[i]}`;
            evoImagesContainer.appendChild(evoImage)
            evoNamesContainer.appendChild(evoNames)
            } 
            else {
                const noEvo = document.createElement('span')
                noEvo.classList.add('noEvo')
                noEvo.innerText = "This pokemon does not evolve in gen 1"
                evoNamesContainer.append(noEvo)
            }
    }

    // arrow
    const arrowContainer = document.createElement('div');
    arrowContainer.classList.add('arrowContainer');
    const singleArrowContainer = document.createElement('div');
    singleArrowContainer.classList.add('singleArrowContainer');

    for (let i = 1; i < maxEvo.length; i++) {
        if (maxEvo.length === 3) {
        const arrow = document.createElement('span');
        arrow.classList.add('arrow')
        arrow.innerHTML = "&#9656"
        arrowContainer.append(arrow)
        } else {
            const arrow = document.createElement('span');
            arrow.innerHTML = "&#9658"
            singleArrowContainer.append(arrow)
        }
    }
    

    const category = document.createElement('span');
    const height = document.createElement('span');
    const weight = document.createElement('span');
    const abilities = document.createElement('span');
    const weakness = document.createElement('span');
    const evolution = document.createElement('span');

    category.classList.add('discriptor');
    abilities.classList.add('discriptor');
    height.classList.add('discriptor');
    weight.classList.add('discriptor');
    weakness.classList.add('discriptorWeakness');
    evolution.classList.add('discriptorEvolution');

    category.innerHTML = `<strong>Category:</strong> ${pokemonCategory}`;
    height.innerHTML = `<strong>Height:</strong> ${pokemonHeight}`;
    weight.innerHTML = `<strong>Weight:</strong> ${pokemonWeight} lbs`;
    abilities.innerHTML = `<strong>Abilities:</strong> ${pokemonAbilities}`;
    weakness.innerHTML = '&#9662 Weakness &#9662';
    evolution.innerHTML = '<strong>Evolution</strong>';

    const discriptorContainer = document.createElement('div');
    discriptorContainer.classList.add('discriptorContainer');
    discriptorContainer.append(category, abilities, weight, height)

    // appended front components go here
    pokemonCardFront.append(pokemonId);
    pokemonCardFront.append(pokemonImg);
    pokemonCardFront.append(pokemonName);
    pokemonCardFront.append(pokemonType1);
    pokemonCardFront.append(pokemonType2);
    // appended back components go here
    pokemonCardBack.append(discriptorContainer);
    pokemonCardBack.append(weakness);
    pokemonCardBack.append(weakTypeContainer);
    pokemonCardBack.append(arrowContainer);
    pokemonCardBack.append(singleArrowContainer);
    pokemonCardBack.append(evoImagesContainer);
    pokemonCardBack.append(evoNamesContainer);

    // appended cards
    card.append(pokemonCardFront);
    card.append(pokemonCardBack);
    cardContainer.append(card);
    container.append(cardContainer);
    // event handler 
    let selectedCard;
    container.onclick = function(event) {
    let target = event.target;
        while (target != this) {
            if (target.classList == 'card') {
                flipCard(target);
                return;
            }
        target = target.parentNode;
        }
    }
    function flipCard(node) {
        if (selectedCard) {
            selectedCard.classList.remove('flipCard');
        }
        selectedCard = node;
        selectedCard.classList.add('flipCard');
    }
    window.addEventListener('scroll', () => {
        card.classList.remove('flipCard')
    })
}

window.onblur=function(){
    //change favicon
    const pokeCall = ['Pika!', 'Bulbasaur!', 'Charmander!', 'Squirtle!']
    // const pokeCall = ['Check out my music!', 'The song just started!', 'This beat slaps!', 'Where did you go!']
    
    let randomCall = pokeCall[Math.floor(Math.random()*pokeCall.length)];

    document.title = (randomCall);
}

window.onfocus=function(){
    document.title="Pokemon API";
}