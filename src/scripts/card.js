// import { cardTmp } from ".";
// import { imgPopup } from ".";
// import { closeModal } from "./modal";
// import { openModal } from "./modal";

const cardTmp = document.querySelector('#card-template').content;
const imgPopup = document.querySelector('.popup_type_image');

export const handleDelete = (card) => {
    card.remove();
}

export function createCard({link, name}, onDelete, onLike, onImg, onClose) {
    const cardElement = cardTmp.querySelector('.card').cloneNode(true);
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.card__like-button');
    const cardImg = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    deleteBtn.addEventListener('click', () => onDelete(cardElement));
    likeBtn.addEventListener('click', (evt) => onLike(evt));
    cardImg.addEventListener('click', () => {
      onImg(imgPopup, onClose);
      imgPopup.querySelector('.popup__image').src = 
        cardElement.querySelector('.card__image').src;
      imgPopup.querySelector('.popup__caption').textContent = 
        cardElement.querySelector('.card__title').textContent;
    });
    return cardElement;
}

export const likeCard = (evt) => {
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    }
}