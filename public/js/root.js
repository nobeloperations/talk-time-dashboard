const _profileInformationButton = document.querySelector('.profile__information')
const _username = document.querySelector('.profile__username').textContent.trim();
const _profileOptions = document.querySelector('.profile__options')
const _userAvatarImage = document.querySelector('.profile__user__avatar')
const _myFriendsButton = document.querySelector('.friends__button')
const _myFriendsWrapper = document.querySelector('.friends__wrapper')
const _myFriends = document.querySelector('.my__friends')
const _friendsWrapperContent = document.querySelector('.friends__wrapper__content')

const request = fetch(`/friends/friend-requests/${_username}`).then(res => res.json())
.then(response => { 
    const { friendRequests } = response;

    friendRequests.forEach(friendRequest => {

        fetch(`/users/${friendRequest}`).then(res => res.json()).then(user => {
            const { avatar } = user;

            _friendsWrapperContent.innerHTML += `
            <div class="friend">
                <div class="friend__name__wrapper">
                    <img class="friend__avatar" src=${avatar} />
                    <span>${friendRequest}</span>
                </div>
                <button class="accept__friend__request">Accept</button>
            </div>
        `
        })

    })
 })

 fetch(`/friends/all-friends/${_username}`).then(res => res.json()).then(user => {
    const { friends } = user;

    friends.forEach(friend => {
        fetch(`/users/${friend}`).then(res => res.json()).then(response => {
            _friendsWrapperContent.innerHTML += `
                <div class="friend">
                    <div class="friend__name__wrapper">
                        <img class="friend__avatar" src="${response.avatar}" />
                        <span>${friend}</span>
                    </div>
                    <span class="accepted__text">✓ Accepted</span>
                </div>
            `
        })
    })


})

 document.body.onclick = (e) => {
    const _target = e.target;

    if (_target.className === "accept__friend__request") {
        const _sender = _target.previousElementSibling.querySelector('span').textContent;
        fetch(`/friends/add-friend/${_sender}/${_username}`, {
            method: "POST"
        })
    }
 }

_myFriendsButton.onclick = function() {
    this.dataset.active = this.dataset.active ? "" : true;
    _myFriendsWrapper.style.visibility = this.dataset.active ? "visible" : "hidden"
    _myFriendsWrapper.style.opacity = this.dataset.active ? "1" : "0"
}

fetch(`/users/${_username}`)
.then(_res => _res.json())
.then(_response => {
    _userAvatarImage.src = _response.avatar;
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