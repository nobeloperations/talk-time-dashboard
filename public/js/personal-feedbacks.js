window.onload = function() {
    let _closeImageButtons = document.querySelectorAll('.personal__feedback__close__img');
    let _viewImageButtons = document.querySelectorAll('.personal__feedback__view__image__button');
    let _container = document.querySelector('.container');

    const _viewImageOptions = {
        _viewImage: (_currentImage) => {
            _currentImage.style.visibility = 'visible'
            _currentImage.style.opacity = '1'
            _container.className = 'container open__modal'
        },
        _closeImage: (_parentElement) => {
            _parentElement.style.visibility = 'hidden';
            _parentElement.style.opacity = '0';
            _container.className = 'container close__modal'
        }
    }

    _viewImageButtons.forEach(_viewImageButton => {
        _viewImageButton.onclick = function() {
            let _currentImage = this.parentElement.parentElement.parentElement.nextElementSibling
            _viewImageOptions._viewImage(_currentImage)
        }
    })
    _closeImageButtons.forEach(_closeImageButton => {
        _closeImageButton.onclick = function() {
            _viewImageOptions._closeImage(this.parentElement)
        }
    })
}