window.onload = function () {
    let _controllNext = document.querySelector('.information__next')
    let _aboutExtension = document.querySelector('.extension')
    let _aboutBadges = document.querySelector('.badges')

    _controllNext.onclick = function () {
        let current = this.dataset.current
        _aboutBadges.style.display = current == 'extension' ? 'flex' : 'none'
        _aboutExtension.style.display = current == 'extension' ? 'none' : 'flex'
        _controllNext.dataset.current = current == 'extension' ? 'badges' : 'extension'
    }
}