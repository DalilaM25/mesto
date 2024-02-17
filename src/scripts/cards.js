import {cardTemplate, popupImage} from './index.js';
import { openModal, closeModal } from './modal.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const deleteCard = (evt) => evt.target.closest('.card').remove();

const likeCard = (evt) => evt.target.classList.toggle('card__like-button_is-active');



function createCard(card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImg.src = card.link;
    cardImg.alt = card.name;
    cardTitle.textContent = card.name;
    
    const popupCard = () => {
      popupImage.querySelector('.popup__image').src = cardImg.src;
      popupImage.querySelector('.popup__caption').textContent = cardImg.alt
    }

    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);
    cardImg.addEventListener('click', (evt) => {
      popupCard();
      openModal(popupImage);
    });
    return cardElement;
}

export {initialCards, deleteCard, createCard, likeCard};