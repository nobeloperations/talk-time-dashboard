window.onload = function() {
    let _feedbackBody = document.querySelector('.send__feedback__body')
    let _characterCount = document.querySelector('.send__feedback__characters')
    let _feedbackSender = document.querySelector('.sender__input');
    let _selectedName = document.querySelector('.selected')
    let _anonymousCheckbox = document.querySelector('.anonymous__checkbox')

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