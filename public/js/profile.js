const _profileTabs = document.querySelectorAll('.profile__tab')
const _menuItems = document.querySelectorAll('.profile__content__menu__item')
const _logOut = document.querySelector('.profile__logout')


_logOut.onclick = function () {
    fetch('/auth/logout')
        .then(() => {
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = '/';
        })
        .catch((error) => {
            console.error('Logout failed:', error);
        });
}
_menuItems.forEach(_menuItem => {
    _menuItem.onclick = function() {
        const _className = `.${this.dataset.profiletab}`;
        _profileTabs.forEach(_profileTab => {
            _profileTab.classList.remove('profile__tab__active')
        })
        document.querySelector(_className).classList.toggle('profile__tab__active')
    }
})



