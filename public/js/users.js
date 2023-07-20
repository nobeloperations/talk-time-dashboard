window.onload = function() {
    let _users = document.querySelectorAll('.user')
    let _searchInput = document.querySelector('.users__search')
    let _viewBadgesButtons = document.querySelectorAll('.users__view__badges')
    let _closeBadgesButtons = document.querySelectorAll('.close__badges__modal')
    let _container = document.querySelector('.container')

    _closeBadgesButtons.forEach(_closeBadgesButton => {
        _closeBadgesButton.onclick = function() {
            const _modal = this.parentElement
            _container.className = 'container close__modal'
            _modal.style.visibility = 'hidden'
            _modal.style.opacity = '0'
        }
    })

    _viewBadgesButtons.forEach(_viewBadgesButton => {
        _viewBadgesButton.onclick = function() {
            const _modal = this.parentElement.nextElementSibling
            _container.className = 'container open__modal'
            _modal.style.visibility = 'visible'
            _modal.style.opacity = '1'
        }
    })

    _search(_searchInput, _users)
}