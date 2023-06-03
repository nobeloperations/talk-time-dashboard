window.onload = function () {
    let _feedbacksSearchInput = document.querySelector('.feedbacks__search')
    let _feedbacksUsers = document.querySelectorAll('.feedbacks__user')
    let _refreshButton = document.querySelector('.feedbacks__refresh')

    _refreshButton.onclick = function() {
        window.location.reload()
    }

    _search(_feedbacksSearchInput, _feedbacksUsers)
}