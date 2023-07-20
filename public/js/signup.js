window.onload = function () {
    const _signupButton = document.querySelector('.signup__button');
    const _nameInput = document.querySelector('.username__input')
    const _emailInput = document.querySelector('.email__input')
    const _passwordInput = document.querySelector('.password__input')
    const _repeatPasswordInput = document.querySelector('.repeat__password__input')
    const _signupAlert = document.querySelector('.signup__alert')
    const _closeSignupAlert = document.querySelector('.close__signup__alert')
    const _signupAlertText = document.querySelector('.signup__alert__text')

    _closeSignupAlert.onclick = function() {
        _signupAlert.style.top = '-50px'
    }

    const _validateUserData = () => {
        const _userData = {
            _name: _nameInput.value.trim(),
            _email: _emailInput.value.trim(),
            _password: _passwordInput.value.trim(),
            _repeatPassword: _repeatPasswordInput.value.trim()
        }
        const { _email } = _userData;
        if(!_email.includes('nobelcoaching.com')) {
            _signupAlert.style.top = '50px'
            _signupAlertText.innerHTML = 'Email should include nobelcoaching.com'
            return;
        }
        const _hasEmptyValues = Object.values(_userData).includes('')
        if (_hasEmptyValues) return;
        if (_userData._password !== _userData._repeatPassword) return;
        return _userData
    }

    const _signup = (_userData) => {
        const { _name, _email, _password } = _userData
        fetch('/auth/signup', {
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
            _signupAlert.style.top = '50px'
            _nameInput.value = ''
            _emailInput.value = ''
            _passwordInput.value = ''
            _repeatPasswordInput.value = ''
            if(response.message === 'ALREADY_EXIST') {
                _signupAlertText.innerHTML = 'User already exist, <a href="/auth/signin">Sign In</a>'
                return;
            }
            _signupAlertText.innerHTML = 'You`ve signed up! <a href="/auth/signin">Sign In</a>'
        })
        .then(() => {
        })
    }

    _signupButton.onclick = e => {
        e.preventDefault()
        const _userData = _validateUserData()
        if(_userData) _signup(_userData)
    }
}