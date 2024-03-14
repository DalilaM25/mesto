import '../pages/index.css';
import '../scripts/card';
import '../scripts/modal';
import '../scripts/validation';
import { initialCards } from './cards';
import { getCardTemplate, deleteCard, createCard, likeCard } from './card';
import { openModal, closeModal } from './modal';
import {enableValidation, clearValidation} from './validation';
import { getInitialCards, getInitialUser, patchUserData, postNewCard, deleteCardFromServer } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formAddCard = document.forms['new-place'];
const cardNameInput = formAddCard.elements['place-name'];
const cardLinkInput = formAddCard.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImageContent = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: 'a306f177-c6ab-4a77-8c2f-7f3972575f99',
    'Content-Type': 'application/json',
  },
};

function renderCards(cardsArray) {
  cardsArray.forEach(function (element) {
    const newCard = createCard(
      element,
      cardTemplate,
      getCardTemplate,
      deleteCard,
      deleteCardFromServer,
      likeCard,
      openPopupImage,
      config
    );
    cardList.append(newCard);
  });
}


buttonOpenEditProfileForm.addEventListener('click', (evt) => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEditProfile);
});

buttonOpenAddCardForm.addEventListener('click', (evt) => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openModal(popupNewCard);
});

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

patchUserData(config, name, job);
  
  closeModal(popupEditProfile);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

function addNewCard(evt) {
  evt.preventDefault();

  const card = {};
  card.name = cardNameInput.value;
  card.link = cardLinkInput.value;

postNewCard(config, card.name, card.link)
.then((res)=>res.json())
.then((card)=>{ 
  cardList.prepend(createCard(
    card,
    cardTemplate,
    getCardTemplate,
    deleteCard,
    deleteCardFromServer,
    likeCard,
    openPopupImage,
    config
  ))})
  closeModal(popupNewCard);
}

formAddCard.addEventListener('submit', addNewCard);

function openPopupImage(cardImg) {
  popupImageContent.src = cardImg.src;
  popupImageContent.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openModal(popupImage);
}

enableValidation(validationConfig);

Promise.all([getInitialCards(config), getInitialUser(config)])
  .then(([cards, user]) => {
    // обрабатываем результат
    renderCards(cards);
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });