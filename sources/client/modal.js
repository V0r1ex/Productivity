// показать модальное окно
function showModal(text, className) {
    if (className == 'error') audioError.play()
    else audioSuccess.play()
    const newModal = $(`<div class="response-modal ${className}"><div class="response-modal-icon-container"><img alt="icon" class="response-modal-icon" src="images/modal_icons/${className}.svg" /></div><p class="response-text">${text}</p></div>`)
    $('.modals-container').append(newModal)
    newModal.on('click', () => newModal.remove()) 
    setTimeout(() => {
        newModal.fadeOut(1000);
    }, 2000);
}
// показать модальное окно подтверждения сброса прогресса
function openResetModal() {
    if ($('.modal-prompt').length) return
    audioPopup.play()
    const modal = $(`
    <div class="modal-prompt">
        <button class="modal-prompt-remove remove-btn" onclick="removeModalPrompt($(this))"></button>
        <p class="modal-prompt-text">Сбросить данные профиля?</p>
        <div class="modal-prompt-btns">
            <button class="modal-prompt-btn base-btn" onclick="resetProfile()">Подтвердить</button>
            <button class="modal-prompt-btn base-btn" onclick="removeModalPrompt($(this).parent())">Отменить</button>
        </div>
    </div>`)
    $('.container').append(modal)
}
// скрыть модальное окно подтверждения сброса прогресса
function removeModalPrompt(modal) {
    modal.parent().remove()
}