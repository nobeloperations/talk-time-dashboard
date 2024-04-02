window.onload = function() {
    const _startQuiz = document.querySelector('.quiz__start');
    const _quizWelcomeWrapper = document.querySelector('.quiz__welcome__wrapper');
    const _finishButton = document.querySelector('.finish__quiz');
    const _notAllAnswersModal = document.querySelector('.not__all__answers__modal');
    const _profileName = document.querySelector('.profile__username').textContent;

    const _URL = new URL(window.location.href);

    const _generalName = _URL.searchParams.get('q')
    const _params = _URL.pathname.split('/');
    const _url = _params[2]
    const _date = _params[3]

    let _mistake = false;

    _startQuiz.onclick = function() {
        _quizWelcomeWrapper.style.display = 'none'
    }

    _finishButton.onclick = function() {
        let _answers = [false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        const _answersBlocks = document.querySelectorAll('.answers__wrapper');

        _answersBlocks.forEach((_answersBlock, _index) => {
            let { question } = _answersBlock.dataset;

            question = question.split(',').map(item => +item);
            
            const _inputs = _answersBlock.querySelectorAll('input');
            
            _inputs.forEach((_input, _idx) => {
                if (_input.checked) {
                    _answers[_index] = true;
                    question = question.filter(_item => _item !== _idx + 1);
                }
            })

            if (question.length) _mistake = true;
        })
        
        if (_answers.includes(false)) {
            _notAllAnswersModal.textContent = 'Please, answer these questions: '
            _answers.forEach((elem, idx) => {
                if (!elem) {
                    _notAllAnswersModal.style.top = '30px'
                    _answersBlocks[idx].parentElement.style.borderColor = 'tomato'
                    _notAllAnswersModal.textContent += `№${idx + 1}, `

                    setTimeout(() => {
                        _notAllAnswersModal.style.top = '-100px'
                    }, 4000)
                }
            })
        } else {
            window.location.replace(`/quiz/results/${_url}/${_date}?q=${_generalName}&result=${_mistake ? 'false' : 'true'}&name=${_profileName}`)
        }
    }
}