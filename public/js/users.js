window.onload = function() {
    const body = document.body;
    const usersContainer = document.querySelector('.users')
    const profileName = document.querySelector('.profile__username').textContent;
    const _searchInput = document.querySelector('.users__search')
    let isLoading = false;
    let page = 1;

    fetch(`/friends/all-friends/${profileName}`).then(res => res.json())
    .then(response => {

        function addUsersToDOM(newUsers) {
            newUsers.forEach(user => {
                const userElement = document.createElement('div');
                userElement.className = 'user'
                userElement.dataset.name = user.name;
                userElement.innerHTML = `
                    <div class="user__info">
                        <div class="username__participated">
                            <span class="user__name">${user.name}</span>
                        </div>
                    </div>
                    <span class="user__mongodb__id">${user._id}</span>
                    ${response.friends.includes(user.name) || user.friendRequests.includes(profileName)  ? '<button disabled class="user__you__button">Friend request sent</button>' : profileName !== user.name ? `<button class="user__send__friend__request">Send Request</button>` : `<button disabled class="user__you__button">It is you</button>`}
                `;
                usersContainer.appendChild(userElement)
            })

            page++;
        }

        (function addInitialUsers() {
            getUsersFromServer(1).then(newUsers => {
                if (newUsers.length) {
                    addUsersToDOM(newUsers)
                }
            })
        })();

        function loadMoreUsers() {
            if (isLoading) return;

            isLoading = true;

            getUsersFromServer(page).then(newUsers => {
                if (newUsers.length) {
                    addUsersToDOM(newUsers)
                }
                isLoading = false;
            })
        } 

        usersContainer.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
        
            if (scrollTop + clientHeight >= scrollHeight) {
            loadMoreUsers();
            }
        });

        function getUsersFromServer(page) {
            return new Promise(resolve => {
            const usersURL = `/load/range?page=${page}&limit=100`;
        
            fetch(usersURL)
                .then(response => response.json())
                .then(data => {
                    resolve(data)
                });
            });
        }
        body.onclick = function(e) {
            const targetElement = e.target;
        
            if (targetElement.className === 'user__send__friend__request') {
                targetElement.disabled = true;
                targetElement.innerHTML = "Friend request sent"
                let name = targetElement.parentElement.querySelector('.user__name').textContent;

                fetch(`/friends/new-friend/${name}/${profileName}`, {
                    method: "POST",
                    'Content-Type': "application/json",
                })
                
            }
        }

        _searchInput.oninput = function() {
            let _value = _searchInput.value.toLowerCase().trim();
            let _users = document.querySelectorAll('.user')
            _users.forEach(_user => {
                let _condition = !_user.dataset.name.toLowerCase().includes(_value) && _value
                _user.style.display = _condition ? 'none' : 'flex'

            })
        }
  });
}
