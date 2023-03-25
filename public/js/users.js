window.onload = function() {
    let _container = document.querySelector('.container')
    let _users = document.querySelectorAll('.user')
    let _usersList = document.querySelector('.users__list')
    let _searchInput = document.querySelector('.users__search')
    let _viewBadges = document.querySelectorAll('.user__badges__button')
    let _closeModalButtons = document.querySelectorAll('.close__badges__button')
    let _datasets = []

    _closeModalButtons.forEach(_closeModalButton => {
        _closeModalButton.onclick = function() {
            this.parentElement.style.visibility = 'hidden'
            this.parentElement.style.opacity = '0'
            _container.className = 'container close__modal'
        }
    })

    _viewBadges.forEach(_viewBadge => {
        _viewBadge.onclick = function() {
            let _modal = this.parentElement.nextElementSibling
            _modal.style.visibility = 'visible'
            _modal.style.opacity = '1'  
            _container.className = 'container open__modal'
        }
    })

    _users.forEach(_user => {
        if(_datasets.includes(_user.dataset.name)) {
            _usersList.removeChild(_user)
        }   
        _datasets.push(_user.dataset.name)
    })

    _search(_searchInput, _users)
}