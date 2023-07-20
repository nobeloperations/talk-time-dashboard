const _logOut = document.querySelector('.logout')

function _deleteCookie(_cookieName, _callback) {
    document.cookie = _cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    _callback()
}

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

if(_logOut) {
    _logOut.onclick = () => { 
        _deleteCookie('user', () => {
            window.location.href = '/auth/signup'
        })
    }
}

const _authPaths = ['/auth/signin', '/auth/signup', '/auth/reset'];

const _pathName = new URL(window.location.href).pathname;
const _cookie = _parseCookieString(document.cookie);

const _redirectToSignup = () => { window.location.href = '/auth/signup'; };
const _redirectToHome = () => { window.location.href = '/'; };

if (!_cookie.user) {
    if (!_pathName.startsWith('/auth')) _redirectToSignup();
} else {
    const _isPathIncluded = _authPaths.some(e => _pathName.includes(e));
    if (_isPathIncluded && _pathName !== '/') _redirectToHome();
}