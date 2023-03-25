window.onload = function() {
    let _leaveCommentButton = document.querySelector('.leave__comment__button');
    let _cancelComment = document.querySelector('.leave__comment__cancel');
    let _commentWrapper = document.querySelector('.comments__wrapper');

    _cancelComment.onclick = function(e) {
        e.preventDefault()
        _commentWrapper.className = 'comments__wrapper close__form'
    }

    _leaveCommentButton.onclick = function() {
        _commentWrapper.className = 'comments__wrapper open__form'
    }
}