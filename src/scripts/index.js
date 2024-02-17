import '../pages/index.css';
import { initialCards, deleteCard, createCard } from './cards';
import { openModal, closeModal } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
let popup;
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const addCardForm = document.forms['new-place'];
const cardNameInput = addCardForm.elements['place-name'];
const cardLinkInput = addCardForm.elements.link;


function renderCards(cardsArray) {
  cardsArray.forEach(function (element) {
    const newCard = createCard(element, deleteCard);
    cardList.append(newCard);
  });
}

renderCards(initialCards);

buttonEdit.addEventListener('click', (evt) => {
  popup = popupEdit;
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(popup);
});

buttonAdd.addEventListener('click', (evt) => {
  popup = popupNewCard;
  openModal(popup);
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(popup);
}

formElement.addEventListener('submit', handleFormSubmit);

function addNewCard(evt) {
    evt.preventDefault();
    
    const card = {};
    card.name = cardNameInput.value;
    card.link = cardLinkInput.value;
    
    const newCard = createCard(card, deleteCard);
    cardList.prepend(newCard);
    
    closeModal(popup);
    cardNameInput.value = '';
    cardLinkInput.value = '';
}


addCardForm.addEventListener('submit', addNewCard);



export { cardTemplate, popupImage};
