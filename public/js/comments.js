window.onload = function() {
    const _leaveCommentButton = document.querySelector('.leave__comment__button');
    const _cancelComment = document.querySelector('.leave__comment__cancel');
    const _commentWrapper = document.querySelector('.comment__section__wrapper');
    const _comments = document.querySelector('.comments')

    let _commentsOptions = {
        _cancel: (e) => {
            e.preventDefault()
            _commentWrapper.style.display = 'none'
            _leaveCommentButton.style.display = 'block'
            _comments.style.display = 'flex'
        },
        _leaveComment: () => {
            _leaveCommentButton.style.display = 'none';
            _commentWrapper.style.display = 'flex'
            _comments.style.display = 'none'
        }
    }

    _cancelComment.onclick = function(e) {
        _commentsOptions._cancel(e)
    }

    _leaveCommentButton.onclick = function() {
        _commentsOptions._leaveComment()
    }
}