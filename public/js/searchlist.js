window.onload = function () {
    const URL = window.location.href.split('/').at(-1);
    fetch(`/users/${URL}`)
        .then(_res => _res.json())
        .then(_users => {
            _users.forEach(_user => {
                const _cardByDateAndUrl = document.querySelector(`[data-date='${_user.date}'][data-url='${_user.url}']`)
                if(_cardByDateAndUrl) {
                    const _meetingUsers = _cardByDateAndUrl.querySelector('.meeting__info').querySelector('.meeting__users')
                    _meetingUsers.innerHTML += `
                    <div class="meeting__user">
                        <img class="meeting__user__avatar" src="${_user.avatar}"/>
                        <span class="tooltip">${_user.name}</span>
                    </div>
                    `
                }
            })
        })
}