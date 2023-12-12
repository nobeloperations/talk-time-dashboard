window.onload = function () {
    const _currentUsername = JSON.parse(_parseCookieString(document.cookie).user).name;
    let _userAvatar;
    const URL = window.location.href.split('/').at(-2);
    const DATE = window.location.href.split('/').at(-1);
    const _usersList = document.querySelectorAll('.dashboard__user')
    const _searchUsersInput = document.querySelector('.dashboard__search')
    const _addNoteButton = document.querySelector('.add__note')
    const _addNoteInput = document.querySelector('.notes__input')
    const _notes = document.querySelector('.notes')
    const _noNotesText = document.querySelector('.no__notes')
    const _notesList = document.querySelectorAll('.note')

    _notesList.forEach(_note => {
        const _noteSender = _note.querySelector('.note__sender__name').textContent;
        const _deleteNoteButton = _note.querySelector('.delete__note')
        const _editNoteButton = _note.querySelector('.edit__note')
        if (_noteSender !== _currentUsername) {
            _deleteNoteButton.disabled = true;
            _editNoteButton.disabled = true;
        }
    })

    if (_notes.children.length === 1) _noNotesText.style.display = 'inline'

    async function _deleteNote(_curr, _noteId) {
        _notes.removeChild(_curr.parentElement.parentElement)
        if (_notes.children.length === 1) _noNotesText.style.display = 'inline'
        fetch('/deletenote', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _noteId
            })
        })
    }

    (async function _getUsersAvatar() {
        let response = await fetch(`/users/${_currentUsername}`);
        let user = await response.json();
        _userAvatar = user.avatar;
        return _userAvatar;
    })();

    const _noteTemplate = (_noteValue) => {
        if (_noteValue.trim()) {
            let _noteHTML = `
            <div class="note__sender">
                <img class="note__avatar" src="${_userAvatar}" alt="">
                <span class="note__sender__name">${_currentUsername}</span>
            </div>
            <div class="note__text__wrapper">
                <span class="note__text">${_noteValue.trim()}</span>
            </div>
            <textarea class="edit__note__text">${_noteValue.trim()}</textarea>
            <div class="note__options">
                <button class="delete__note">Delete</button>
                <button class="edit__note">Edit</button>
                <span style="display: none;" class="note__id"></span>
                <button class="save__note">Save</button>
            </div>
    `
            let _note = document.createElement('div')
            _note.className = 'note'
            _note.innerHTML = _noteHTML
            _notes.prepend(_note)
            return _note;
        };
    }


    const _newNoteRequest = async (_noteValue, _note) => {
        await fetch(`/newnote/${URL}/${DATE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: _noteValue,
                URL,
                tags: [],
                sender: _currentUsername
            })
        })
            .then(response => response.json())
            .then(res => {
                _note.querySelector('.note__id').innerHTML += res._id
            })
        _addNoteInput.value = ''
        _noNotesText.style.display = 'none'

    }

    const _updateNote = (_note, _curr) => {
        const _noteText = _note.querySelector('.note__text__wrapper')
        const _noteEditableText = _note.querySelector('.edit__note__text')
        const _saveNote = _note.querySelector('.save__note')
        _noteText.style.display = 'none'
        _noteEditableText.style.display = 'block'
        _curr.disabled = true;
        _saveNote.style.display = 'flex'
    }

    const _saveNote = (_note, _curr) => {
        const _noteId = _curr.previousElementSibling.textContent;
        const _noteEditableText = _note.querySelector('.edit__note__text')
        const _noteText = _note.querySelector('.note__text')
        const _noteTextWrapper = _note.querySelector('.note__text__wrapper')
        const _editNote = _note.querySelector('.edit__note')
        const _newNote = _noteEditableText.value.trim()
        if (!_newNote) return;
        fetch('/updatenote', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _noteId,
                text: _newNote
            })
        })
        _noteEditableText.value = _newNote
        _noteEditableText.style.display = 'none'
        _noteText.innerHTML = _newNote
        _noteTextWrapper.style.display = 'flex'
        _curr.style.display = 'none'
        _editNote.disabled = ''
    }

    _addNoteButton.onclick = async function () {
        let _noteValue = _addNoteInput.value;
        const _note = _noteTemplate(_noteValue)
        if (_note) _newNoteRequest(_noteValue, _note)
    }

    _notes.onclick = e => {
        let _curr = e.target;
        const _note = _curr.parentElement.parentElement;

        const _noteFunctions = {
            'delete__note': () => { _deleteNote(_curr, _noteId) },
            'edit__note': () => { _updateNote(_note, _curr) },
            'save__note': () => { _saveNote(_note, _curr) },
        }

        _noteFunctions[_curr.className]();
    }

    _search(_searchUsersInput, _usersList)

}