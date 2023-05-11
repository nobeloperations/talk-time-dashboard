window.onload = function () {
    let _closeImageButtons = document.querySelectorAll('.personal__feedback__close__img');
    let _viewImageButtons = document.querySelectorAll('.personal__feedback__view__image');
    let _container = document.querySelector('.container');
    let _feedbacks = document.querySelectorAll('.personal__feedback')
    let _feedbacksTexts = document.querySelectorAll('.personal__feedback__text')
    let _feedbacksFilterWrapper = document.querySelector('.personal__feedbacks__filter__wrapper')
    let _lowRatingButton = document.querySelector('.personal__feedbacks__low__filter')
    let _highRatingButton = document.querySelector('.personal__feedbacks__high__filter')
    let _dateWrapper = document.querySelector('.date__range__wrapper')
    let _startDate = document.querySelector('#start__date')
    let _endDate = document.querySelector('#end__date')
    let _noFilteredFeedbacks = document.querySelector('.no__filtered__feedbacks')
    const LOW_RATING = 'LOW'
    const HIGH_RATING = 'HIGH'

    const _filters = {
        image: false,
        rating: '',
        startDate: null,
        endDate: null,
    };

    function _filtersOptions() {
        let _counter = 0;
        _feedbacks.forEach((_feedback) => {
            const _showFeedback =
                (!_filters.image || _feedback.dataset.image) &&
                (!_filters.rating ||
                    (_filters.rating === LOW_RATING && _feedback.dataset.rating <= 3) ||
                    (_filters.rating === HIGH_RATING && _feedback.dataset.rating >= 4)) &&
                (!_filters.startDate ||
                    new Date(_feedback.dataset.date) >= _filters.startDate) &&
                (!_filters.endDate || new Date(_feedback.dataset.date) <= _filters.endDate);

            _feedback.style.display = _showFeedback ? 'block' : 'none';
            if(_showFeedback) _counter++
        });
        _noFilteredFeedbacks.style.display = _counter ? 'none' : 'inline'
    }

    _feedbacksFilterWrapper.onclick = function (e) {
        const _target = e.target;
        if (_target.tagName === 'BUTTON') {
            _target.dataset.active = _target.dataset.active ? '' : 'true';
            if(_target.className !== 'apply__date__filter') {
                _target.style.background = _target.dataset.active ? 'white' : 'transparent';
                _target.style.color = _target.dataset.active ? '#754BDF' : 'white';
            }

            if (_target.className === 'personal__feedbacks__image__filter') {
                _filters.image = !!_target.dataset.active
            }

            else if (_target.className === 'personal__feedbacks__low__filter') {
                _filters.rating = _target.dataset.active ? LOW_RATING : '';
                _highRatingButton.style.zIndex = _target.dataset.active ? '-2' : '1';
                _highRatingButton.style.opacity = _target.dataset.active ? '.6' : '1';
            }

            else if (_target.className === 'personal__feedbacks__high__filter') {
                _filters.rating = _target.dataset.active ? HIGH_RATING : '';
                _lowRatingButton.style.zIndex = _target.dataset.active ? '-2' : '1';
                _lowRatingButton.style.opacity = _target.dataset.active ? '.6' : '1';
            }

            else if (_target.className === 'apply__date__filter') {
                const _startDateValue = _startDate.value.trim()
                const _endDateValue = _endDate.value.trim()
                if (!_startDateValue || !_endDateValue) return;

                const _convertedStartDate = new Date(_startDateValue)

                _filters.startDate = _convertedStartDate.setDate(_convertedStartDate.getDate() - 1);
                _filters.endDate = new Date(_endDateValue);
            }

            else if (_target.className === 'personal__feedbacks__date__filter') {
                _dateWrapper.style.display = _target.dataset.active ? 'flex' : 'none'
                if (!_target.dataset.active) {
                    _filters.startDate = '';
                    _filters.endDate = '';
                    _startDate.value = '';
                    _endDate.value = '';
                }
            }


            _filtersOptions()

        }
    }

    _container.onclick = function (e) {
        const _target = e.target;
        if (_target.matches('.personal__feedback__read__more')) {
            const _feedbackText = _target.closest('.personal__feedback').querySelector('.personal__feedback__hidden')
            const _threeDots = _target.closest('.personal__feedback').querySelector('.three__dots')
            const _readLess = _target.nextElementSibling

            _feedbackText.style.display = 'inline'
            _readLess.style.display = 'block'
            _threeDots.style.display = 'none'
            _target.style.display = 'none'
        }
        else if (_target.matches('.personal__feedback__read__less')) {
            const _feedbackText = _target.closest('.personal__feedback').querySelector('.personal__feedback__hidden')
            const _threeDots = _target.closest('.personal__feedback').querySelector('.three__dots')
            const _readMore = _target.previousElementSibling

            _feedbackText.style.display = 'none'
            _readMore.style.display = 'inline'
            _threeDots.style.display = 'inline'
            _target.style.display = 'none'
        }
    }

    _feedbacksTexts.forEach(_feedbacksText => {
        const _text = _feedbacksText.textContent
        let _hiddenTextCoef = _text.length - 70
        if (_text.length > 70) {
            let _visibleText = _text.substring(0, 70).trim()
            let _hiddenText = _text.slice(-_hiddenTextCoef)
            _feedbacksText.innerHTML = `
                <span class="personal__feedback__visible">${_visibleText}<span class="three__dots">...</span><span class="personal__feedback__hidden">${_hiddenText}</span></span>
            `
        }
    })

    _feedbacks.forEach(_feedback => {
        const _rating = _feedback.dataset.rating;
        const _ratingElements = _feedback.querySelectorAll(`.rating:nth-child(-n + ${_rating})`)
        _ratingElements.forEach(_ratingElement => {
            _ratingElement.innerHTML = '★'
        })
    })


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
        _viewImageButton.onclick = function () {
            let _currentImage = this.parentElement.parentElement.nextElementSibling
            _viewImageOptions._viewImage(_currentImage)
        }
    })
    _closeImageButtons.forEach(_closeImageButton => {
        _closeImageButton.onclick = function () {
            _viewImageOptions._closeImage(this.parentElement)
        }
    })
}