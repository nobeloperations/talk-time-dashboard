window.onload = function() {

    const ws = new WebSocket('ws://localhost:3000')
    ws.onopen = () => {console.log('conn')}

    new WOW().init()

    let _mainExplore = document.querySelector('.main__explore')
    let _exploreSelect = document.querySelector('.explore__select')
    let _select = document.querySelector('.select')
    let _closeSelectInput = document.querySelector('.close__input')
    let _meetingSearch = document.querySelector('.meeting__search')
    let _selectItems = document.querySelectorAll('.select__item')
    let _exploreQuestion = document.querySelector('.explore__question')
    let _questionWrapper = document.querySelector('.question__wrapper')
    let _closeQuestion = document.querySelector('.close__question')
    
    _mainExplore.onclick = function() {
        window.scrollBy(0, window.innerHeight)
    }

    _select.onclick = function() {
        _exploreSelect.className = 'explore__select open__select'
    }
    
    _closeSelectInput.onclick = function() {
        _exploreSelect.className = 'explore__select close__select'

        _meetingSearch.value = ''
        _selectItems.forEach(_selectItem => {
            _selectItem.style.display = 'flex'
        })
    }

    _exploreQuestion.onclick = function() {
        _questionWrapper.style.display = 'block'
    }

    _closeQuestion.onclick = function() {
        _questionWrapper.style.display = 'none'
    }

    _search(_meetingSearch, _selectItems)
}