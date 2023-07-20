window.onload = function() {
    const _emailInput = document.querySelector('.email__input')
    const _passwordInput = document.querySelector('.password__input')
    const _repeatPasswordInput = document.querySelector('.repeat__password__input')
    const _resetButton = document.querySelector('.reset__button')
    const _idFromUrl = window.location.href.split('/').at(-1);

    const _validateUserData = () => {
        const _userData = {
            _email: _emailInput.value.trim(),
            _password: _passwordInput.value.trim(),
            _repeatPassword: _repeatPasswordInput.value.trim()
        }
        const _hasEmptyValues = Object.values(_userData).includes('')
        if (_hasEmptyValues) return;
        if (_userData._password !== _userData._repeatPassword) return;
        return _userData
    }

    const _resetPassword = (_userData) => {
        const { _email, _password } = _userData
        fetch(`/auth/reset/${_idFromUrl}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: _email,
                password: _password
            })
        })
        .then(() => {
            window.location.href = '/auth/signin'
        })
    }

    _resetButton.onclick = (e) => {
        e.preventDefault()
        const _userData = _validateUserData()
        if(_userData) _resetPassword(_userData)
        _emailInput.value = ''
        _passwordInput.value = ''
        _repeatPasswordInput.value = ''
    }
}
