// flip one card at a time
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

// toggle flip card and close when scrolling
card.addEventListener('click', flipCard)
window.addEventListener('scroll', () => {
    card.classList.remove('flipCard')
})
function flipCard() {
    card.classList.toggle('flipCard')
}