window.onload = function () {

    function sortUsers(_sortAscending) {
        return function () {
            const _users = document.querySelectorAll('.meeting-stats__user');
            const _sortedUsers = Array.from(_users).sort((_a, _b) => {
                const _aTotal = Number(_a.querySelector('.total__badges__number').textContent);
                const _bTotal = Number(_b.querySelector('.total__badges__number').textContent);
                return _sortAscending ? _aTotal - _bTotal : _bTotal - _aTotal;
            });
            const _container = document.querySelector('.meeting-stats__users');
            _container.innerHTML = '';
            _sortedUsers.forEach(_user => _container.appendChild(_user));
        }
    }

    function resetSorting() {
        const _container = document.querySelector('.meeting-stats__users');
        const _users = Array.from(_container.querySelectorAll('.meeting-stats__user'));
        _users.sort((_a, _b) => _a.dataset.index - _b.dataset.index);
        _container.innerHTML = '';
        _users.forEach(_user => _container.appendChild(_user));
    }

    const _descendingTotalBadgesButton = document.querySelector('.descending__total__badges__filter')
    const _ascendingTotalBadgesButton = document.querySelector('.ascending__total__badges__filter')

    _descendingTotalBadgesButton.onclick = function () {
        this.dataset.applied = this.dataset.applied ? "" : true;
        _ascendingTotalBadgesButton.style.display = this.dataset.applied ? 'none' : 'block';
        _descendingTotalBadgesButton.style.background = this.dataset.applied ? "#0070B8" : "#99D6FF";
        _descendingTotalBadgesButton.style.color = this.dataset.applied ? "#99D6FF" : "#0070B8";

        this.dataset.applied ? sortUsers(false)() : resetSorting();
    }

    _ascendingTotalBadgesButton.onclick = function () {
        this.dataset.applied = this.dataset.applied ? "" : true;
        _descendingTotalBadgesButton.style.display = this.dataset.applied ? 'none' : 'block';
        _ascendingTotalBadgesButton.style.background = this.dataset.applied ? "#0070B8" : "#99D6FF";
        _ascendingTotalBadgesButton.style.color = this.dataset.applied ? "#99D6FF" : "#0070B8";

        this.dataset.applied ? sortUsers(true)() : resetSorting();

    }
}