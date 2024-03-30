const _profileInformationButton = document.querySelector('.profile__information')
const _username = document.querySelector('.profile__username').textContent.trim();
const _profileOptions = document.querySelector('.profile__options')
const _userAvatarImage = document.querySelector('.profile__user__avatar')
const _myFriendsButton = document.querySelector('.friends__button')
const _myFriendsWrapper = document.querySelector('.friends__wrapper')
const _myFriends = document.querySelector('.my__friends')
const _friendsWrapperContent = document.querySelector('.friends__wrapper__content')
const _noFriendsImage = document.querySelector('.no__friends__image')
const _noFriendsText = document.querySelector('.no__friends__text')
const _container = document.querySelector('.container')

function badgeNameToImage(badgeName) {
    return badgeName.split(/(?=[A-Z])/).map(word => word.toLowerCase()).join('_')
}

function formatBadgeName(badgeName) {
    return badgeName.split(/(?=[A-Z])/).join(' ')
}

fetch(`/friends/friend-requests/${_username}`).then(res => res.json())
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
                <div class="manage__friend__request">
                    <button class="accept__friend__request">✓</button>
                    <button class="reject__friend__request">✕</button>
                </div>
            </div>
        `
        })

    })
 })
 .then(() => {
    fetch(`/friends/all-friends/${_username}`).then(res => res.json()).then(user => {
        const { friends, badges } = user;
    
        friends.forEach(friend => {
            fetch(`/users/${friend}`).then(res => res.json()).then(response => {
                _friendsWrapperContent.innerHTML += `
                    <div class="friend">
                        <div class="friend__name__wrapper">
                            <img class="friend__avatar" src="${response.avatar}" />
                            <span>${friend}</span>
                        </div>
                        <button class="friend__close__badges">Close</button>
                        <button class="friend__view__badges">Badges</button>
                        <div class="friend__badges__modal">
                            ${Object.keys(badges).map(key => {
                                return `<div class="friend__badge__wrapper">
                                    <div>
                                        <img src="/img/${badgeNameToImage(key)}.png" class="friend__image__badge" />
                                        <span>${formatBadgeName(key)}</span>
                                    </div>
                                    <span class="friend__badge__count">${badges[key].count}</span>
                                </div>`
                            }).join('')}
                        </div>
                    </div>
                `
            })
        })
    })
 })
.then(() => {
    setTimeout(() => {
        if (Array.from(_friendsWrapperContent.children.length) === 2) {
            _noFriendsImage.style.display = 'flex'
            _noFriendsText.style.display = 'flex'
            _friendsWrapperContent.style.justifyContent = 'center'
        }
    }, 200)
})


 document.body.onclick = (e) => {
    const _target = e.target;

    if (_target.className === "accept__friend__request") {
        const _sender = _target.parentElement.previousElementSibling.querySelector('span').textContent;
        fetch(`/friends/add-friend/${_sender}/${_username}`, {
            method: "POST"
        })

        const _manageFriendRequest = _target.parentElement.parentElement.querySelector('.manage__friend__request')
        const _friend = _target.parentElement.parentElement;

        _target.parentElement.parentElement.removeChild(_manageFriendRequest) 
        const _acceptedElement = `<span class="accepted__text">✓ Accepted</span>`
        _friend.innerHTML += _acceptedElement

    } else if (_target.className === "reject__friend__request") {
        const _sender = _target.parentElement.previousElementSibling.querySelector('span').textContent;
        fetch(`/friends/delete/${_sender}/${_username}`, {
            method: "DELETE"
        })

        _friendsWrapperContent.removeChild(_target.parentElement.parentElement)

    } else if (_target.className === "friend__view__badges") {
        const _closeBadges = _target.previousElementSibling;
        _closeBadges.style.display = 'block'
        _target.style.display = 'none'
        _target.nextElementSibling.style.transform = 'translate(-50%, -50%)'
        _container.className += ' open__modal'

    } else if (_target.className === "friend__close__badges") {
        const _viewBadges = _target.nextElementSibling;
        _viewBadges.style.display = 'block'
        _target.style.display = 'none'
        _target.nextElementSibling.nextElementSibling.style.transform = 'translate(-50%, -300%)'
        _container.className = 'container'
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