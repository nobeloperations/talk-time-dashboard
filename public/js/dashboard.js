window.onload = function () {
    const URL = window.location.href.split('/').at(-2);
    const DATE = window.location.href.split('/').at(-1);
    const _usersList = document.querySelectorAll('.dashboard__user')
    const _searchUsersInput = document.querySelector('.dashboard__search')
    // const _viewTags = document.querySelector('.view__tags');
    // const _tags = document.querySelector('.tags')
    // const _addTag = document.querySelector('.add__tag')
    // const _tagsInput = document.querySelector('.tags__input')
    // const _staticTag = document.querySelector('.tag[data-tag]')
    const _addNote = document.querySelector('.add__note')
    const _addNoteInput = document.querySelector('.notes__input')
    const _notes = document.querySelector('.notes')
    const _noNotes = document.querySelector('.no__notes')

    // let _tagsArray = []
    if (_notes.children.length === 1) _noNotes.style.display = 'inline'

    const _noteTemplate = (_noteValue) => {
        if (_noteValue.trim()) {
            let _noteHTML = `
            <span class="note__text">${_noteValue}</span>
            <div class="note__options">
            <img class="delete__note" src="/img/trash.png" alt="">
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
        await fetch(`/newconclusion/${URL}/${DATE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: _noteValue,
                URL,
                tags: []
            })
        })
            .then(response => response.json())
            .then(res => {
                _note.querySelector('.note__options').innerHTML += `<span style="display: none;" class="note__id">${res.id}</span>`
            })
        // _tagsArray = []
        _addNoteInput.value = ''
        _noNotes.style.display = 'none'
    //     _tags.innerHTML = `<div class="tag" data-tag="statictag">
    //     <span>No tags here...</span>
    // </div>`
    
    }

    _addNote.onclick = async function () {
        let _noteValue = _addNoteInput.value;
        const _note = _noteTemplate(_noteValue)
        if(_note) _newNoteRequest(_noteValue, _note)
    }

    _notes.onclick = e => {
        let _curr = e.target;

        if (_curr.className == 'delete__note') {
            _notes.removeChild(_curr.parentElement.parentElement)
            if (_notes.children.length === 1) _noNotes.style.display = 'inline'
            fetch('/deleteconclusion', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: _curr.previousElementSibling.textContent
                })
            })
        }

        // else if (_curr.className === 'open__tags__note') {
        //     const _isActive = !!_curr.dataset.tagsactive;
        //     _curr.dataset.tagsactive = _isActive ? '' : 'true'
        //     const _tags = _curr.nextElementSibling;
        //     _tags.style.visibility = _isActive ? 'hidden' : 'visible'
        //     _tags.style.opacity = _isActive ? '0' : '1'
        // }
    }

    // _viewTags.onclick = function () {
    //     this.dataset.open == "false" ? (_tags.style.visibility = 'visible', _tags.style.opacity = '1', this.dataset.open = true) : (_tags.style.visibility = 'hidden', _tags.style.opacity = '0', this.dataset.open = false)
    // }

    // _tags.onclick = e => {
    //     if (e.target.className === 'tag__content') {
    //         _tags.removeChild(e.target.parentElement)
    //         console.log(e.target.textContent.slice(2))
    //         _staticTag.style.display = 'flex'
    //         _tagsArray = _tagsArray.filter(_tag => _tag != e.target.textContent.slice(2))
    //     }
    // }

    // _addTag.onclick = function () {
    //     let _tagValue = _tagsInput.value;

    //     if (_tagValue.trim()) {
    //         _tagsArray.push(_tagValue)
    //         _staticTag.style.display = 'none'
    //         let _newTag = document.createElement('div')
    //         _newTag.className = 'tag'
    //         _newTag.innerHTML = `
    //             <span class="tag__content">× ${_tagValue}</span>
    //         `

    //         _tags.appendChild(_newTag)
    //         _tagsInput.value = ''
    //     }
    // }

    _search(_searchUsersInput, _usersList)

}