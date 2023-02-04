window.onload = function () {
    const _controllNext = document.querySelector('.information__next')
    const _aboutExtension = document.querySelector('.extension')
    const _aboutBadges = document.querySelector('.badges')

    _controllNext.onclick = function () {
        let current = this.dataset.current
        _aboutBadges.style.display = current == 'extension' ? 'flex' : 'none'
        _aboutExtension.style.display = current == 'extension' ? 'none' : 'flex'
        _controllNext.dataset.current = current == 'extension' ? 'badges' : 'extension'
    }
}