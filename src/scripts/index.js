import '../pages/index.css';
import {initialCards, deleteCard, createCard} from './cards';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');


function renderCards(cardsArray) {
    cardsArray.forEach(function(element) {
        const newCard = createCard(element, deleteCard);
        cardList.append(newCard);
    });
}

renderCards(initialCards);

export {cardTemplate, cardList}