window.onload = function () {
  const _continueButton = document.querySelector('.continue__button')
  const _username = document.querySelector('.username').textContent.trim()
  const _email = document.querySelector('.email').textContent.trim()
  const _avatar = document.querySelector('.user__avatar').src

  const _user = { name: _username, email: _email, avatar: _avatar }

  function _setCookie(_name, _value, _days) {
    var _expires = "";
    var _date = new Date();
    _date.setTime(_date.getTime() + _days * 24 * 60 * 60 * 1000);
    _expires = "; expires=" + _date.toUTCString();
    document.cookie = _name + "=" + JSON.stringify(_value) + _expires + "; path=/";
  }

  _continueButton.onclick = () => { _setCookie('user', _user, 7) }
}