window.onload = function () {
    const _selectGenerals = document.querySelectorAll('.select__general')
    const _searchMeetings = document.querySelector('.search__generals')
    const _generalWrappers = document.querySelectorAll('.general__wrapper')
    const _arrowDown = document.querySelector('.main__button')
    const _profileInfo = document.querySelector('.profile__information')
    const _badgeImages = document.querySelectorAll('.profile__badge__image')
    const _profileBadgeLevels = document.querySelectorAll('.profile__badges__level');
    const _badgesLevels = document.querySelectorAll('.profile__badges__level')



    const _profileInfoWidth = _profileInfo.offsetWidth;
    _profileInfo.style.left = `calc(100% - ${_profileInfoWidth + 15}px)`

    _arrowDown.onclick = function () {
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

    _badgeImages.forEach(_badgeImage => {
        const _badgeName = _badgeImage.nextElementSibling.textContent.split(' ').join('_').toLowerCase();
        _badgeImage.src = `/img/${_badgeName}.png`
    })

    _profileBadgeLevels.forEach(_profileBadgeLevel => {
        if (_profileBadgeLevel.textContent === "Mastery level") {
            _profileBadgeLevel.style.background = "#db7876";
            _profileBadgeLevel.style.color = 'white'
        }
    })

    function _calculateBadgesLevel(count) {
        return count < 3 ? 'Knowlege' : count >= 3 && count < 5 ? 'Apprentice' : count > 5 && count < 10 ? 'Mastery' : 'Leadership';
    }

    _badgesLevels.forEach(_badgesLevel => {
        const _badgesLevelPopup = _badgesLevel.parentElement.previousElementSibling;
        const _level = _badgesLevel.textContent;

        if (_level !== "Mastery level") {
            _badgesLevel.onmouseover = () => {
                _badgesLevelPopup.style.visibility = 'visible'
                _badgesLevelPopup.style.opacity = '1'
            }
            _badgesLevel.onmouseout = () => {
                _badgesLevelPopup.style.visibility = 'hidden'
                _badgesLevelPopup.style.opacity = '0'
            }
        }
    })
}