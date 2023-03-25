window.onload = function () {
    const URL = window.location.href.split('/').at(-2);
    const DATE = window.location.href.split('/').at(-1);
    let _feedbacksSearchInput = document.querySelector('.feedbacks__search')
    let _feedbacksUsers = document.querySelectorAll('.feedbacks__user')
    let _leaveFeedbackButtons = document.querySelectorAll('.feedbacks__leave__feedback')
    let _seeFeedbacksButtons = document.querySelectorAll('.feedbacks__see__feedbacks')
    let _seeBadgesButtons = document.querySelectorAll('.feedbacks__see__badges')
    let _refreshButton = document.querySelector('.feedbacks__refresh')

    _refreshButton.onclick = function() {
        window.location.reload()
    }

    _leaveFeedbackButtons.forEach(_leaveFeedbackButton => {
        _leaveFeedbackButton.onclick = function() {
            window.location = `/feedbacks/create/${URL}/${this.previousElementSibling.textContent}/${DATE}` 
        }
    })

    _seeFeedbacksButtons.forEach(_seeFeedbacksButton => {
        _seeFeedbacksButton.onclick = function() {
            window.location = `/feedbacks/${URL}/${this.nextElementSibling.textContent}/${DATE}`               
        }
    })

    _seeBadgesButtons.forEach(_seeBadgesButton => {
        _seeBadgesButton.onclick = function() {
            window.location = `/badges/${URL}/${this.nextElementSibling.textContent}/${DATE}`
        }
    })  

    _search(_feedbacksSearchInput, _feedbacksUsers)
}