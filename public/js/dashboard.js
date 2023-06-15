window.onload = function () {
    // const URL = window.location.href.split('/').at(-2);
    // const DATE = window.location.href.split('/').at(-1);
    // const X_COEF = 1.5;
    // const Y_COEF = 7;
    // const CENTER_COEF = 40;
    // const CANVAS_HEIGHT = 150;
    // let _conclusionInputWrapper = document.querySelector('.conclusion__input__wrapper')
    // let _addConclusionButton = document.querySelector('.add__conclusion')
    // let _addConclusionInput = document.querySelector('.conclusion__input')
    // let _conclusions = document.querySelector('.conclusions')
    // let _emptyConclusionsWarning = document.querySelector('.empty__conclusions__warning')
    // let _meetingParticipants = document.querySelectorAll('.meeting__participant')
    // let _tagsList = document.querySelector('.tags__list')
    // let _tagsInput = document.querySelector('.tags__input')
    // let _plusTag = document.querySelector('.plus__tag')
    // let _audioActivities = document.querySelectorAll(".audio__activity");

    // _audioActivities.forEach(_audioActivity => {
    //     let _ctx = _audioActivity.getContext('2d')
    //     let _data = _audioActivity.dataset.peaks.split(',').map(e => +e).filter(i => i != 1)
    //     _data.slice(5, _data.length).forEach((_e, _idx) => {
    //         let _x = _idx * X_COEF
    //         let _y = (CANVAS_HEIGHT - (_e * Y_COEF)) - CENTER_COEF
    //         _ctx.lineTo(_x, _y);
    //     })
    //     _ctx.strokeStyle = 'white'
    //     _ctx.stroke()
    // })

    // let _tags = []

    // _plusTag.onclick = function () {
    //     let _tag = _tagsInput.value;
    //     if (_tag.trim()) {
    //         let _tagElem = document.createElement('div')
    //         _tagElem.className = "tag"
    //         _tagElem.innerHTML = `× ${_tag}`
    //         _tagsList.appendChild(_tagElem)
    //         _tags.push(_tag)
    //         _tagsInput.value = ''
    //     }
    // }

    // _tagsList.onclick = e => {
    //     let target = e.target;
    //     if(target.className === 'tag') {
    //         _tagsList.removeChild(target)
    //         _tags = _tags.filter(_tag => _tag != target.textContent.slice(2))
    //     }
    // }

    // _meetingParticipants.forEach(_meetingParticipant => {
    //     _meetingParticipant.onclick = function () {
    //         window.location = `/feedbacks/${URL}/${this.querySelector('.participant__name').textContent}/${DATE}`
    //     }
    // })

    // _addConclusionButton.onclick = async function () {
    //     let value = _addConclusionInput.value;
    //     if (!value.trim()) {
    //         _conclusionInputWrapper.classList.toggle('wrong__conclusion')
    //         return;
    //     }
    //     let _conclusionHTML = `
    //     ${_tags.map(_tag => {
    //         return `<span class="conclusion__tag">${_tag}</span>`
    //     }).join('')}
    //     <span class="conclusion">${'- ' + value}</span>
    //     <span class="conclusion__star">☆</span>
    //     <span class="conclusion__id"></span>
    //     <img src="/img/trash.png" class="conclusion__delete" />
    // `
    //     let _conclusionWrapper = document.createElement('div')
    //     _conclusionWrapper.className = 'conclusion__wrapper'
    //     _conclusionWrapper.innerHTML = _conclusionHTML
    //     _conclusions.prepend(_conclusionWrapper)

    //     await fetch(`/newconclusion/${URL}/${DATE}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             text: _addConclusionInput.value,
    //             URL,
    //             tags: _tags
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(res => {
    //             _conclusionWrapper.querySelector('.conclusion__id').innerHTML = res._id
    //         })
    //     _tags = []
    //     _addConclusionInput.value = ''
    //     _emptyConclusionsWarning.style.display = 'none'
    //     _tagsList.innerHTML = ''           
    // }

    // _conclusions.onclick = function (e) {
    //     let _target = e.target
    //     if (_target.className == 'conclusion__delete') {
    //         fetch('/deleteconclusion', {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 id: _target.previousElementSibling.textContent
    //             })
    //         })
    //         _conclusions.removeChild(_target.parentElement)
    //         if (_conclusions.children[0].tagName == 'SPAN') {
    //             _conclusions.children[0].style.display = 'inline'
    //         }
    //     }
    //     if (_target.className == 'conclusion__star') {
    //         _target.innerHTML = '★'
    //         fetch(`/importantconclusion`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 id: _target.nextElementSibling.textContent
    //             })
    //         })
    //     }

    // }
    const URL = window.location.href.split('/').at(-2);
    const DATE = window.location.href.split('/').at(-1);
    const _usersList = document.querySelectorAll('.dashboard__user')
    const _searchUsersInput = document.querySelector('.dashboard__search')
    const _viewTags = document.querySelector('.view__tags');
    const _tags = document.querySelector('.tags')
    const _addTag = document.querySelector('.add__tag')
    const _tagsInput = document.querySelector('.tags__input')
    const _staticTag = document.querySelector('.tag[data-tag]')
    const _addNote = document.querySelector('.add__note')
    const _addNoteInput = document.querySelector('.notes__input')
    const _notes = document.querySelector('.notes')
    const _noNotes = document.querySelector('.no__notes')

    let _tagsArray = []
    if (_notes.children.length === 1) _noNotes.style.display = 'inline'

    _addNote.onclick = async function () {
        let _noteValue = _addNoteInput.value;
        if (_noteValue.trim()) {
            let _noteHTML = `
            <span class="note__text">• ${_noteValue}</span>
            <div class="note__options">
            <img class="delete__note" src="/img/trash.png" alt="">
            <img class="open__tags__note" src="/img/tag.png" alt="">
            <div class="notes__tags">
                ${_tagsArray.map(_tag => {
                return `<span class="notes__tag">${_tag}</span>`
            }).join('')}
            </div>
        </div>
    `
            let _note = document.createElement('div')
            _note.className = 'note'
            _note.innerHTML = _noteHTML
            _notes.prepend(_note)

            await fetch(`/newconclusion/${URL}/${DATE}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: _noteValue,
                    URL,
                    tags: _tagsArray
                })
            })
                .then(response => response.json())
                .then(res => {
                    _note.querySelector('.note__options').innerHTML += `<span style="display: none;" class="note__id">${res.id}</span>`
                })
            _tagsArray = []
            _addNoteInput.value = ''
            _noNotes.style.display = 'none'
            _tags.innerHTML = `<div class="tag" data-tag="statictag">
        <span>No tags here...</span>
    </div>`
        }
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

        else if (_curr.className == 'note__important') {
            _curr.innerHTML = '★'
            fetch(`/importantconclusion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: _curr.nextElementSibling.textContent
                })
            })
        }

        else if (_curr.className === 'open__tags__note') {
            const _isActive = !!_curr.dataset.tagsactive;
            _curr.dataset.tagsactive = _isActive ? '' : 'true'
            const _tags = _curr.nextElementSibling;
            _tags.style.visibility = _isActive ? 'hidden' : 'visible'
            _tags.style.opacity = _isActive ? '0' : '1'
        }
    }

    _viewTags.onclick = function () {
        this.dataset.open == "false" ? (_tags.style.visibility = 'visible', _tags.style.opacity = '1', this.dataset.open = true) : (_tags.style.visibility = 'hidden', _tags.style.opacity = '0', this.dataset.open = false)
    }

    _tags.onclick = e => {
        if (e.target.className === 'tag__content') {
            _tags.removeChild(e.target.parentElement)
            console.log(e.target.textContent.slice(2))
            _staticTag.style.display = 'flex'
            _tagsArray = _tagsArray.filter(_tag => _tag != e.target.textContent.slice(2))
        }
    }

    _addTag.onclick = function () {
        let _tagValue = _tagsInput.value;

        if (_tagValue.trim()) {
            _tagsArray.push(_tagValue)
            _staticTag.style.display = 'none'
            let _newTag = document.createElement('div')
            _newTag.className = 'tag'
            _newTag.innerHTML = `
                <span class="tag__content">× ${_tagValue}</span>
            `

            _tags.appendChild(_newTag)
            _tagsInput.value = ''
        }
    }



    _search(_searchUsersInput, _usersList)

}