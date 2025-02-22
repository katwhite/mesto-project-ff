// export function openModal
// export function closeModal

export function openModal(popup, onClose) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    const closeBtn = popup.querySelector('.popup__close');
    function handleEscape(evt) {
        if (evt.key === 'Escape') {
            onClose(popup, handleEscape);
            document.removeEventListener('keydown', handleEscape);
        }
    }
    closeBtn.addEventListener('click', () => onClose(popup, handleEscape));
    
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup'))
            onClose(popup, handleEscape);
    });
    document.addEventListener('keydown', handleEscape);
    popup.addEventListener('submit', () => onClose(popup, handleEscape));
}

export function closeModal(popup, onEsc) {
    popup.classList.remove('popup_is-opened');
}