window.onload = function () {
    const _signinButton = document.querySelector('.signin__button');
    const _nameInput = document.querySelector('.username__input')
    const _emailInput = document.querySelector('.email__input')
    const _passwordInput = document.querySelector('.password__input')
    const _signinWrong = document.querySelector('.signin__wrong')
    const _signinWrongText = document.querySelector('.signin__wrong__text')
    const _closeSigninWrong = document.querySelector('.close__signin__wrong')
    const _forgotPassword = document.querySelector('.forgot__password')
    const _resetWrapper = document.querySelector('.send__email__wrapper')
    const _container = document.querySelector('.container')
    const _sendEmailButton = document.querySelector('.send__email__button')
    const _closeSendEmail = document.querySelector('.close__send__email')
    const _sendEmailInput = document.querySelector('.send__email__input')

    function _parseJwt(_token) {
        let _base64Url = _token.split('.')[1];
        let _base64 = _base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let _jsonPayload = decodeURIComponent(window.atob(_base64).split('').map(function (_c) {
            return '%' + ('00' + _c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(_jsonPayload);
    }

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    _closeSigninWrong.onclick = function () {
        _signinWrong.style.top = '-50px'
    }

    _forgotPassword.onclick = function () {
        _container.className = 'container open__modal'
        _resetWrapper.style.top = 'calc(100% - 35px)'
    }

    _closeSendEmail.onclick = function () {
        _container.className = 'container close__modal'
        _resetWrapper.style.top = 'calc(100% + 35px)'
    }

    const _addNewResetId = () => {
        const _id = uuidv4()
        fetch('/auth/reset/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        })
        return _id
    }

    const _sendEmail = (_id) => {
        fetch('/auth/mail/send', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: _sendEmailInput.value,
                id: _id
            })
        })
            .then(() => {
                _container.className = 'container close__modal'
                _resetWrapper.style.top = 'calc(100% + 35px)'
            })
    }

    _sendEmailButton.onclick = function (e) {
        e.preventDefault()
        if (_sendEmailInput.value.trim()) {
            const _id = _addNewResetId()
            if (_id) _sendEmail(_id)
        }
    }

    const _validateUserData = () => {
        const _userData = {
            _name: _nameInput.value.trim(),
            _email: _emailInput.value.trim(),
            _password: _passwordInput.value.trim(),
        }
        const _hasEmptyValues = Object.values(_userData).includes('')
        if (_hasEmptyValues) return;
        return _userData
    }

    const setAccessToken = (response) => {
        if (response.message === 'INVALID_PASS') {
            _signinWrong.style.top = '50px'
            _signinWrongText.textContent = 'Wrong password, try one more time'
            return;
        }
        else if (response.message === 'USER_NOT_FOUND') {
            _signinWrong.style.top = '50px'
            _signinWrongText.textContent = 'Incorrect name or email, user not found'
            return;
        }

        const _expirationDate = new Date();
        _expirationDate.setDate(_expirationDate.getDate() + 7);

        const _accessToken = response?.access_token;
        const _currentUser = _parseJwt(_accessToken)

        document.cookie = `user=${JSON.stringify(_currentUser)}; expires=${_expirationDate.toUTCString()}; path=/;`;
        window.location.href = '/'
    }

    const _signin = (_userData) => {
        const { _name, _email, _password } = _userData
        fetch('/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: _name,
                email: _email,
                password: _password
            })
        })
            .then(res => res.json())
            .then(response => {
                setAccessToken(response)
            })
    }

    _signinButton.onclick = (e) => {
        e.preventDefault()
        const _userData = _validateUserData()
        if (_userData) _signin(_userData)
    }
}