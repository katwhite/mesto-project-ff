import { deleteCardApi } from "./api";
import { likeCardApi, unlikeCardApi } from "./api";
import { openModal, closeModal } from "./modal";

const cardTmp = document.querySelector('#card-template').content;
const popupDeleteCard = document.querySelector('.popup_type_delete');

export const handleDelete = (card, cardId) => {
  deleteCardApi(cardId).then(() => {
    card.remove();
    closeModal(popupDeleteCard);
  })
  .catch((err) => {
    console.log(err);
  });
}

function getCardTemplate() {
  const cardElement = cardTmp.querySelector('.card').cloneNode(true);
  return cardElement;
}

export function createCard(userId, {link, name, likes, _id, owner}, onDelete, onLike, onImg) {
    const cardElement = getCardTemplate();
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.card__like-button');
    const cardImg = cardElement.querySelector('.card__image');
    const likeCounter = cardElement.querySelector('.card__like-button_counter');
    cardImg.src = link;
    cardImg.alt = name;
    likeCounter.textContent = likes.length;
    cardElement.querySelector('.card__title').textContent = name;
    if (userId === owner._id) {
      deleteBtn.addEventListener('click', () => {
        openModal(popupDeleteCard);
        const closeDeleteBtn = popupDeleteCard.querySelector('.popup__close');
        closeDeleteBtn.addEventListener('click', () => closeModal(popupDeleteCard));
        function submitDeleteCard(evt) {
          evt.preventDefault(); 
          onDelete(cardElement, _id);
        }
        popupDeleteCard.addEventListener('submit', submitDeleteCard);
      });
    }
    else deleteBtn.setAttribute('disabled', true);
    
    if (likes.some((like) => {return like._id === userId})) likeBtn.classList.add('card__like-button_is-active');
    likeBtn.addEventListener('click', (evt) => onLike(evt, _id, likeCounter));
    cardImg.addEventListener('click', () => onImg(cardElement));

    return cardElement;
}

export const likeCard = (evt, cardId, likeCounter) => {
  if (evt.target.classList.contains('card__like-button')) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      unlikeCardApi(cardId).then((res) => {
        evt.target.classList.remove('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
    })
    }
    else {
      likeCardApi(cardId).then((res) => {
        evt.target.classList.add('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
    })
    }
  }
}