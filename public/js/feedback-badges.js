const _badgeLevels = document.querySelectorAll('.user__badge__level')

_badgeLevels.forEach(_badgeLevel => {
    let _regex = /\d+/;
    let _level = _badgeLevel.textContent.match(_regex)[0]
    let _levels = ['Knowlege level', 'Apprentice level', 'Mastery level', 'Leadership level']
    _badgeLevel.innerHTML = _levels[+_level - 1] || _levels[3]
})