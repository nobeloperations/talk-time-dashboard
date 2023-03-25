function _search(_input, _content) {
    _input.oninput = function() {
        let _value = _input.value.toLowerCase().trim()
        _content.forEach(_element => {
            if(!_element.dataset.name.toLowerCase().includes(_value) && _value) {
                _element.style.display = 'none'
            }
            else {
                _element.style.display = 'flex'
            }
        })
    }
}