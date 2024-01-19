const _profileTabs = document.querySelectorAll('.profile__tab')
const _menuItems = document.querySelectorAll('.profile__content__menu__item')
const _logOut = document.querySelector('.profile__logout')
const _badgesCount = document.querySelectorAll('.profile__received__badges__count')
const _badgesLevels = document.querySelectorAll('.profile__badges__level')
const _badgeImages = document.querySelectorAll('.profile__badge__image')

function _calculateBadgesLevel(count) {
    return count < 3 ? 'Knowlege' : count >= 3 && count < 5 ? 'Apprentice' : count > 5 && count < 10 ? 'Mastery' : 'Leadership';
}

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

_badgesLevels.forEach(_badgesLevel => {
    const _badgesLevelPopup = _badgesLevel.parentElement.previousElementSibling;
    _badgesLevel.onmouseover = () => {
        _badgesLevelPopup.style.visibility = 'visible'
        _badgesLevelPopup.style.opacity = '1'
    }
    _badgesLevel.onmouseout = () => {
        _badgesLevelPopup.style.visibility = 'hidden'
        _badgesLevelPopup.style.opacity = '0'
    }
})

_badgeImages.forEach(_badgeImage => {
    const _badgeName = _badgeImage.nextElementSibling.textContent.split(' ').join('_').toLowerCase();
    _badgeImage.src = `/img/${_badgeName}.png`
})