window.onload = function () {
    const _selectGenerals = document.querySelectorAll('.select__general')
    const _searchMeetings = document.querySelector('.search__generals')
    const _generalWrappers = document.querySelectorAll('.general__wrapper')
    const _profileInfo = document.querySelector('.profile__information')
    const _badgeImages = document.querySelectorAll('.profile__badge__image')
    const _badgesLevels = document.querySelectorAll('.profile__badges__level')
    const _badgesWrapperTitle = document.querySelector('.badges__wrapper__title')
    const _profileUsername = document.querySelector('.profile__username').textContent;
    const _profileBadgesNumbers = document.querySelectorAll('.profile__received__badges__count')
    const _badgesOverallLevel = document.querySelector('.badges__overall__level')

    function _calculateBadgesLevel(numbers) {
        const _max = Math.max(...numbers)
        const _min = Math.min(...numbers)
  
        if ((_max <= 3 && _min <= 3) ||  (_max <= 5 && _max >= 4 && _min <= 3) || (_max >= 7 && _min <= 3)) return 'Knowlege'
        else if ((_max >= 4 && _max <= 5 && _min >= 4 && _max <= 5) || (_max > 5 && _min <= 5 && _min >= 4)) return 'Apprentice'
        else if ((_max >= 6 && _max < 10 && _min >= 6 && _max <= 10) || (_max >= 10 && _min >= 6 && _min < 10)) return 'Mastery'
        else return 'Leadership'
    }

    let _badgesNumbers = [];

    _profileBadgesNumbers.forEach(_profileBadgesNumber => {
       _badgesNumbers.push(+_profileBadgesNumber.textContent.trim()) 
    })


    _badgesOverallLevel.innerHTML = `Your badges level: ${_calculateBadgesLevel(_badgesNumbers)}`

    _badgesWrapperTitle.textContent = `Welcome, ${_profileUsername}!`

    const _profileInfoWidth = _profileInfo.offsetWidth;
    _profileInfo.style.left = `calc(100% - ${_profileInfoWidth + 15}px)`

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

    _badgesLevels.forEach(_profileBadgeLevel => {
        if (_profileBadgeLevel.textContent === "Mastery level") {
            _profileBadgeLevel.style.background = "#db7876";
            _profileBadgeLevel.style.color = 'white'
        }
    })

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