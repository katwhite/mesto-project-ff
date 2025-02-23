const cardTmp = document.querySelector('#card-template').content;

export const handleDelete = (card) => {
    card.remove();
}

function getCardTemplate() {
  const cardElement = cardTmp.querySelector('.card').cloneNode(true);
  return cardElement;
}

export function createCard({link, name}, onDelete, onLike, onImg) {
    const cardElement = getCardTemplate();
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.card__like-button');
    const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = link;
    cardImg.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    deleteBtn.addEventListener('click', () => onDelete(cardElement));
    likeBtn.addEventListener('click', (evt) => onLike(evt));
    cardImg.addEventListener('click', () => onImg(cardElement));

    return cardElement;
}

export const likeCard = (evt) => {
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    }
}