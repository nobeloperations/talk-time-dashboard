const _profileInformationButton = document.querySelector('.profile__information')
const _username = document.querySelector('.profile__username').textContent.trim();
const _profileOptions = document.querySelector('.profile__options')
const _userAvatarImage = document.querySelector('.profile__user__avatar')

fetch(`/users/${_username}`)
.then(res => res.json())
.then(response => {
    _userAvatarImage.src = response.avatar;
})

function _parseCookieString(_cookieString) {
    let _cookies = {};
    if (_cookieString) {
        let _cookieArray = _cookieString.split(';');
        for (let i = 0; i < _cookieArray.length; i++) {
            let _cookie = _cookieArray[i].trim();
            let _separatorIndex = _cookie.indexOf('=');
            if (_separatorIndex !== -1) {
                let _name = _cookie.substring(0, _separatorIndex);
                let _value = _cookie.substring(_separatorIndex + 1);
                _cookies[_name] = decodeURIComponent(_value);
            }
        }
    }
    return _cookies;
}

const _pathName = new URL(window.location.href).pathname;
const _cookie = _parseCookieString(document.cookie)