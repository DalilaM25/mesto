const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

const deleteCard = (evt) => evt.target.closest(".card").remove();

function createCards(cardsArray) {
    cardsArray.forEach(function (element) {
        const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

        cardElement.querySelector(".card__image").src = element.link;
        cardElement.querySelector(".card__title").textContent = element.name;

        cardList.append(cardElement);

        const deleteButton = cardElement.querySelector(".card__delete-button");

        deleteButton.addEventListener("click", deleteCard);
    });
}

createCards(initialCards);
