
export let allWeakness = {
        Fairy: ['Poison', 'Steel'],
        Steel: ['Fire', 'Fighting', 'Ground'],
        Dark: ['Fire', 'Bug', 'Fighting'],
        Dragon: ['Ice', 'Fairy', 'Dragon'],
        Ghost: ['Ghost', 'Dark'],
        Rock: ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'],
        Bug: ['Fire', 'Rock', 'Flying'],
        Psychic: ['Bug', 'Ghost', 'Dark'],
        Flying: ['Electric', 'Ice', 'Rock'],
        Ground: ['Water', 'Ice', 'Grass'],
        Poison: ['Ground', 'Psychic'],
        Fighting: ['Psychic', 'Fairy', 'Flying'],
        Grass: ['Fire', 'Ice', 'Bug', 'Poison', 'Flying'],
        Ice: ['Fire', 'Fighting', 'Rock', 'Steel'],
        Normal: ['Fighting'],
        Electric: ['Ground'],
        Fire: ['Rock', 'Ground', 'Water'],
        Water: ['Grass', 'Electric'],
    };

    function removeLetters(word) {
        if(word.includes('-')) {
            return word.slice(-2)
        }
    }