import { deleteCardFromServer } from "./api";

const deleteCard = (evt) => evt.target.closest('.card').remove();

const likeCard = (evt) =>
  evt.target.classList.toggle('card__like-button_is-active');

function getCardTemplate(template) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  return cardElement;
}

function createCard(
  card,
  template,
  getCardTemplate,
  deleteCard,
  deleteCardFromServer,
  likeCard,
  openPopupImage,
  config
) {
  const cardElement = getCardTemplate(template);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;

  // if(userID !== card._id) {
  //   deleteButton.style.display = 'none';
  // }

  deleteButton.addEventListener('click', (evt) => {
    deleteCardFromServer(config, card._id)
    .then(()=>deleteCard(evt))
    .catch((err) => {
      console.log(err);
    })
    });
  likeButton.addEventListener('click', likeCard);
  cardImg.addEventListener('click', (evt) => {
    openPopupImage(cardImg);
  });
  return cardElement;
}

export { getCardTemplate, deleteCard, createCard, likeCard };
