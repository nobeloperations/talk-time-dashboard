window.onload = function () {
    const URL = window.location.href.split('/').at(-2);
    const DATE = window.location.href.split('/').at(-1);
    let _conclusionInputWrapper = document.querySelector('.conclusion__input__wrapper')
    let _addNoteButton = document.querySelector('.add__note')
    let _addConclusionInput = document.querySelector('.conclusion__input')
    let _conclusions = document.querySelector('.conclusions')
    let _emptyConclusionsWarning = document.querySelector('.empty__conclusions__warning')
    let _meetingParticipants = document.querySelectorAll('.meeting__participant')
    let _statisticsRatios = document.querySelectorAll('.statistics__ratio')
    let _tagsList = document.querySelector('.tags__list')
    let _tagsInput = document.querySelector('.tags__input')
    let _plusTag = document.querySelector('.plus__tag')


    let _tags = []

    _addConclusionInput.oninput = function() {
        this.value.trim() ? _addNoteButton.disabled = false : _addNoteButton.disabled = true
    }

    _plusTag.onclick = function () {
        let _tag = _tagsInput.value;
        if (_tag.trim()) {
            let _tagElem = document.createElement('div')
            _tagElem.className = "tag"
            _tagElem.innerHTML = `× ${_tag}`
            _tagsList.appendChild(_tagElem)
            _tags.push(_tag)
            _tagsInput.value = ''
        }
    }

    _tagsList.onclick = e => {
        let target = e.target;
        if(target.className === 'tag') {
            _tagsList.removeChild(target)
            _tags = _tags.filter(_tag => _tag != target.textContent.slice(2))
        }
    }

    _meetingParticipants.forEach(_meetingParticipant => {
        _meetingParticipant.onclick = function () {
            window.location = `/feedbacks/${URL}/${this.querySelector('.participant__name').textContent}/${DATE}`
        }
    })

    _addNoteButton.onclick = async function () {
        let value = _addConclusionInput.value;
        if (!value.trim()) {
            _conclusionInputWrapper.classList.toggle('wrong__conclusion')
            return;
        }
        let _conclusionHTML = `
        ${_tags.map(_tag => {
            return `<span class="conclusion__tag">${_tag}</span>`
        }).join('')}
        <span class="conclusion">${'- ' + value}</span>
        <span class="conclusion__star">☆</span>
        <span class="conclusion__id"></span>
        <img src="/img/trash.png" class="conclusion__delete" />
    `
        let _conclusionWrapper = document.createElement('div')
        _conclusionWrapper.className = 'conclusion__wrapper'
        _conclusionWrapper.innerHTML = _conclusionHTML
        _conclusions.prepend(_conclusionWrapper)

        await fetch(`/newconclusion/${URL}/${DATE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: _addConclusionInput.value,
                URL,
                tags: _tags
            })
        })
            .then(response => response.json())
            .then(res => {
                _conclusionWrapper.querySelector('.conclusion__id').innerHTML = res._id
            })
        _tags = []
        _addConclusionInput.value = ''
        _emptyConclusionsWarning.style.display = 'none'
        _tagsList.innerHTML = ''           
    }

    _conclusions.onclick = function (e) {
        let _target = e.target
        if (_target.className == 'conclusion__delete') {
            fetch('/deleteconclusion', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: _target.previousElementSibling.textContent
                })
            })
            _conclusions.removeChild(_target.parentElement)
            if (_conclusions.children[0].tagName == 'SPAN') {
                _conclusions.children[0].style.display = 'inline'
            }
        }
        if (_target.className == 'conclusion__star') {
            _target.innerHTML = '★'
            fetch(`/importantconclusion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: _target.nextElementSibling.textContent
                })
            })
        }

    }

    _statisticsRatios.forEach(_statisticRatio => {
        let _percentValue = _statisticRatio.parentElement.querySelector('.statistics__percents').textContent.trim().slice(0, -1)
        let _readyPercentValue = _percentValue < 10 ? _percentValue / 10 : _percentValue / 100
        _statisticRatio.style.setProperty('--before__prop', `conic-gradient(white 0 calc(${_readyPercentValue} * 361deg), #7352c6 calc(${_readyPercentValue} * 360deg) 360deg)`)
    })

}