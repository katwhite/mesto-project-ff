// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTmp = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const addBtn = document.querySelector('.profile__add-button');

function createCard({link, name}, onDelete) {
    const cardElement = cardTmp.querySelector('.card').cloneNode(true);
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    deleteBtn.addEventListener('click', () => onDelete(cardElement));
    return cardElement;
}

const handleDelete = (card) => {
    card.remove();
}

initialCards.forEach(elem => {
    const card = createCard(elem, handleDelete);
    cardsContainer.append(card);
});


