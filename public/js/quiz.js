window.onload = async function() {
    const _startQuiz = document.querySelector('.quiz__start');
    const _quizWelcomeWrapper = document.querySelector('.quiz__welcome__wrapper');
    const _quiz = document.querySelector('.quiz');
    const _quizSwitchs = document.querySelectorAll('.quiz__switch');
    const _questionWrappers = document.querySelectorAll('.question__wrapper');
    const _finishQuizButtons = document.querySelectorAll(".finish__quiz");
    const _profileUsername = document.querySelector('.profile__username').textContent;
    const _questionWrapperTitle = document.querySelector('.questions__wrapper__title');
    const _wrongAnswersModal = document.querySelector('.wrong__answers__modal');

    const _pathname = new URL(window.location.href).pathname.split('/');
    const _date = _pathname.at(-1).trim();
    const _url = _pathname.at(-2).trim();
    
    const _generalName = window.location.href.split('?').at(-1).slice(2);

    const _quizResultsFetch = await fetch(`/quiz/get/results/${_profileUsername}`);
    const _quizResults = await _quizResultsFetch.json();

    _quizSwitchs.forEach((_quizSwitch, idx) => {
        _quizSwitch.onclick = function() {
            _questionWrapperTitle.style.display = 'none'
            _questionWrappers.forEach(_questionWrapper => {
                _questionWrapper.style.display = 'none'
            })

            _questionWrappers[idx].style.display = 'flex'

            _quizSwitchs.forEach(_elem => { 
                _elem.style.background = 'white'
                _elem.style.color = '#0070BA'
             })

             _quizSwitch.style.color = 'white'
             _quizSwitch.style.background = '#0070BA'
        }
    })

    _startQuiz.onclick = function() {
        _quizWelcomeWrapper.style.display = 'none'
        _quiz.style.display = 'flex'

        _quizSwitchs.forEach((_quizSwitch, _idx) => {
            if (_quizResults[_idx]) {
                _quizSwitch.disabled = true;
                _quizSwitch.textContent = 'Already passed'
            }
        })  
    }

    _finishQuizButtons.forEach((_finishQuizButton, _finishButtonIndex) => {
        _finishQuizButton.onclick = function() {
            const _answers = []
            const _quizList = this.parentElement;
            
            const _questionInputsWrappers = _quizList.querySelectorAll('.question__inputs');
            
            _questionInputsWrappers.forEach((_questionInputsWrapper) => {
                const _answer = +_questionInputsWrapper.dataset.answer;
                const _inputs = _questionInputsWrapper.querySelectorAll('input')

                _inputs.forEach((_input, _inputIndex) => {
                    if (_input.checked && _inputIndex + 1 === _answer) {
                        _answers.push(true)
                    } else if (_input.checked && _inputIndex + 1 !== _answer) _answers.push(false)
                })
            })
            if (_answers.includes(false) || _answers.length !== 3) {
                window.location.href = `/quiz/finish/${_url}/${_date}/wrong?q=${_generalName}`
            } else {
                fetch(`/quiz/update/results/${_profileUsername}/${_finishButtonIndex}?q=${_generalName}`, {
                    method: 'PUT'
                }).then(() => {
                    window.location.href = `/quiz/finish/${_url}/${_date}/passed?q=${_generalName}`
                })
            }
        }
    })


}