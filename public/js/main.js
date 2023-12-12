window.onload = function () {
    const _selectGenerals = document.querySelectorAll('.select__general')
    const _searchMeetings = document.querySelector('.search__generals')
    const _generalWrappers = document.querySelectorAll('.general__wrapper')
    const _arrowDown = document.querySelector('.main__button')
    const _profileInfo = document.querySelector('.profile__information')

    
    const _profileInfoWidth = _profileInfo.offsetWidth;
    _profileInfo.style.left = `calc(100% - ${_profileInfoWidth + 15}px)`

    _arrowDown.onclick = function() {
        window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: "smooth",
          });
    }

    _selectGenerals.forEach(_selectGeneral => {
        _selectGeneral.onclick = function () {
            this.dataset.active = this.dataset.active ? '' : true
            const _meetings = this.parentElement.nextElementSibling
            if (this.dataset.active) {
                _meetings.style.display = 'block'
                this.style.transform = 'rotate(270deg)'
                return;
            }
            _meetings.style.display = 'none'
            this.style.transform = 'rotate(90deg)'

        }
    })

    _search(_searchMeetings, _generalWrappers)
}