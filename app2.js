const container = document.querySelector('.container')

const makeCards = () => {
    const card = document.createElement('div');
    card.classList.add('card')
    container.appendChild(card)
    let cards = document.querySelector('.container')

    let selectedCard;

        cards.onclick = function(event) {
          let target = event.target;
          console.log(event)
    
          while (target != this) {
            console.log(target)
            if (target.classList == 'card') {
              highlight(target);
              return;
            }
            target = target.parentNode;
          }
        }
    
        function highlight(node) {
          if (selectedCard) {
            selectedCard.classList.remove('highlight');
          }
          selectedCard = node;
          selectedCard.classList.add('highlight');
        }
}

for(i = 0; i < 10; i++) {
    makeCards(i)
}

// let table = document.getElementById('bagua-table');

//     let selectedTd;

//     table.onclick = function(event) {
//       let target = event.target;

//       while (target != this) {
//         if (target.tagName == 'TD') {
//           highlight(target);
//           return;
//         }
//         target = target.parentNode;
//       }
//     }

//     function highlight(node) {
//       if (selectedTd) {
//         selectedTd.classList.remove('highlight');
//       }
//       selectedTd = node;
//       selectedTd.classList.add('highlight');
//     }
