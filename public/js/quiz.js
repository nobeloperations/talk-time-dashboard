window.onload = function() {
    const _startQuiz = document.querySelector('.quiz__start');
    const _quizWelcomeWrapper = document.querySelector('.quiz__welcome__wrapper');
    const _finishButton = document.querySelector('.finish__quiz');
    const _notAllAnswersModal = document.querySelector('.not__all__answers__modal')

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
        
        _answers.forEach((elem, idx) => {
            if (!elem) {
                _notAllAnswersModal.style.top = '30px'
                _answersBlocks[idx].parentElement.style.borderColor = 'tomato'
            }
        })
    }
}