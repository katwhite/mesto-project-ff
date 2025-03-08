import { likeCardApi, unlikeCardApi } from "./api";

const cardTmp = document.querySelector('#card-template').content;

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
        onDelete(cardElement, _id);
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