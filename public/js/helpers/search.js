function _search(_input, _content) {
    _input.oninput = function() {
        let _value = _input.value.toLowerCase().trim()
        _content.forEach(_element => {
            let _condition = !_element.dataset.name.toLowerCase().includes(_value) && _value
            _element.style.display = _condition ? 'none' : 'flex'

        })
    }
}