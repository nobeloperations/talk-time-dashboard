window.onload = function() {
    const body = document.body;
    const container = document.querySelector('.container')
    const usersContainer = document.querySelector('.users')
    let isLoading = false;
    let page = 1;

    function addUsersToDOM(newUsers) {
        newUsers.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user'
            userElement.innerHTML = `
                <div class="user__info">
                    <div class="username__participated">
                        <span class="user__name">${user.name}</span>
                    </div>
                </div>
                <button class="users__view__badges">View Badges</button>
            </div>
            <div class="user__badges__modal">
                <div class="users__badges">
                    ${Object.keys(user.badges).map(key => `
                        <div class="users__badge">
                            <div class="badge__info">
                                <img class="badge__image" src="/img/${key.split(/(?=[A-Z])/).join('_').toLowerCase()}.png" />
                                <span class="badge__name">${key.split(/(?=[A-Z])/).join(' ')}</span>
                            </div>
                            <div class="badge__count">${user.badges[key].count} badge(s) collected</div>
                        </div>`
                    ).join('')}
                </div>
                <button class="close__badges__modal">Close</button>
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
      
          if (targetElement.className === 'users__view__badges') {
              const badgesModal = targetElement.nextElementSibling;
              badgesModal.style.visibility = 'visible'
              badgesModal.style.opacity = '1'
              container.className = 'container open__modal'
          } else if (targetElement.className === 'close__badges__modal') {
            const badgesModal = targetElement.parentElement;
            badgesModal.style.visibility = 'hidden'
            badgesModal.style.opacity = '0'
            container.className = 'container close__modal'
          }
      }
}
