const _profileMenuItems = document.querySelectorAll('.profile__menu__item')
const _profileTabs = document.querySelectorAll('.profile__tab')
const _viewReceivedFeedbacks = document.querySelectorAll('.profile__feedback__view__received__feedback')

let _activeMenuItem = null;

_profileMenuItems.forEach(_menuItem => {
    _menuItem.onclick = function() {
        if(_activeMenuItem) _activeMenuItem.classList.remove('profile__menu__item__active')
        _menuItem.classList.toggle('profile__menu__item__active')
        _activeMenuItem = _menuItem;
        const { textContent: _currentPage } = this.querySelector('.profile__menu__text');
        _profileTabs.forEach(_profileTab => {
            const _profileTabName = _profileTab.dataset.tabname;
            _profileTab.style.visibility = _currentPage === _profileTabName ? 'visible' : 'hidden'
            _profileTab.style.opacity = _currentPage === _profileTabName ? '1' : '0'
            _profileTab.style.height = _currentPage === _profileTabName ? '100%' : '0'
        })
    }
})