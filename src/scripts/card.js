import { deleteCardFromServer, addLike, removeLike } from './api.js';

const deleteCard = (evt) => evt.target.closest('.card').remove();

const handleCardLike = (evt, likeCounter, card) => {
  if (!evt.target.classList.contains('card__like-button_is-active')) {
    addLike(card._id)
      .then((data) => {
        evt.target.classList.add('card__like-button_is-active');
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLike(card._id)
      .then((data) => {
        evt.target.classList.remove('card__like-button_is-active');
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

function createCard(
  cardTemplate,
  card,
  userID,
  deleteCard,
  handleCardLike,
  openPopupImage
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = card.likes.length;

  card.likes.forEach(function (likeElement) {
    if (likeElement._id === userID) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  if (userID !== card.owner._id) {
    deleteButton.style.display = 'none';
  } else {
    console.log('есть твои карточки');
  }

  deleteButton.addEventListener('click', (evt) => {
    deleteCardFromServer(card._id)
      .then(() => deleteCard(evt))
      .catch((err) => {
        console.log(err);
      });
  });

  likeButton.addEventListener('click', (evt) =>
    handleCardLike(evt, likeCounter, card)
  );
  cardImg.addEventListener('click', (evt) => openPopupImage(cardImg));
  return cardElement;
}

export { deleteCard, createCard, handleCardLike };
