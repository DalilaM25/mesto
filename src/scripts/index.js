import '../pages/index.css';
import '../scripts/cards';
import '../scripts/card';
import '../scripts/modal';
import { initialCards } from './cards';
import { getCardTemplate, deleteCard, createCard, likeCard } from './card';
import { openModal, closeModal } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const buttonOpenEditProfileForm = document.querySelector(
  '.profile__edit-button'
);
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

function renderCards(cardsArray) {
  cardsArray.forEach(function (element) {
    const newCard = createCard(
      element,
      cardTemplate,
      getCardTemplate,
      deleteCard,
      likeCard,
      openPopupImage,
      popupImage
    );
    cardList.append(newCard);
  });
}

renderCards(initialCards);

buttonOpenEditProfileForm.addEventListener('click', (evt) => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

buttonOpenAddCardForm.addEventListener('click', (evt) => {
  formAddCard.reset();
  openModal(popupNewCard);
});

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(popupEditProfile);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

function addNewCard(evt) {
  evt.preventDefault();

  const card = {};
  card.name = cardNameInput.value;
  card.link = cardLinkInput.value;

  const newCard = createCard(
    card,
    cardTemplate,
    getCardTemplate,
    deleteCard,
    likeCard,
    openPopupImage,
    popupImage
  );
  cardList.prepend(newCard);

  closeModal(popupNewCard);
}

formAddCard.addEventListener('submit', addNewCard);

function openPopupImage(cardImg) {
  popupImageContent.src = cardImg.src;
  popupImageContent.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openModal(popupImage);
}
