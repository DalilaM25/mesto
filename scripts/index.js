const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

const deleteCard = (evt) => evt.target.closest('.card').remove();

function createCard(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').alt = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}

function renderCards(cardsArray) {
    cardsArray.forEach(function(element) {
        const newCard = createCard(element, deleteCard);
        cardList.append(newCard);
    });
}

renderCards(initialCards);