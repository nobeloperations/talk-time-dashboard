window.onload = function() {
    const _feedbackBody = document.querySelector('.send__feedback__body')
    const _characterCount = document.querySelector('.send__feedback__characters')
    const _feedbackSender = document.querySelector('.sender__input');
    const _selectedName = document.querySelector('.selected')
    const _anonymousCheckbox = document.querySelector('.anonymous__checkbox')

    _anonymousCheckbox.onclick = function() {
        this.checked ? (_selectedName.innerHTML = 'Selected: Anonymous', _feedbackSender.value = 'Anonymous') : _selectedName.innerHTML = 'Selected: '
    }

    _feedbackSender.onchange = function() {
        _selectedName.innerHTML = `Selected: ${this.value}`
    }

    _feedbackBody.onkeyup = function() {
        _characterCount.innerHTML = `Characters left: ${400 - this.value.length}`
    }
}