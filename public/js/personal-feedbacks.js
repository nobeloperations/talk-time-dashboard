window.onload = function () {
    let _closeImageButtons = document.querySelectorAll('.personal__feedback__close__img');
    let _viewImageButtons = document.querySelectorAll('.personal__feedback__view__image');
    let _container = document.querySelector('.container');
    let _feedbacks = document.querySelectorAll('.personal__feedback')
    let _feedbacksTexts = document.querySelectorAll('.personal__feedback__text')
    let _feedbacksFilterWrapper = document.querySelector('.personal__feedbacks__filters__wrapper')
    let _lowRatingButton = document.querySelector('.personal__feedbacks__low__filter')
    let _highRatingButton = document.querySelector('.personal__feedbacks__high__filter')
    let _dateWrapper = document.querySelector('.date__range__wrapper')
    let _startDate = document.querySelector('#start__date')
    let _endDate = document.querySelector('#end__date')
    let _noFilteredFeedbacks = document.querySelector('.empty__feedbacks')
    let _leaveFeedback = document.querySelector('.leave__feedback__button')
    let _readMoreButtons = document.querySelectorAll('.personal__feedback__read__more')
    let _readLessButtons = document.querySelectorAll('.personal__feedback__read__less')
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
            if (_showFeedback) _counter++
        });
        _noFilteredFeedbacks.style.display = _counter ? 'none' : 'flex'
    }

    _feedbacksFilterWrapper.onclick = function (e) {
        const _target = e.target;
        if (_target.tagName === 'BUTTON') {
            _target.dataset.active = _target.dataset.active ? '' : 'true';

            if (_target.className !== 'apply__date__filter' && _target.className !== 'leave__feedback__button') {
                _target.style.background = _target.dataset.active ? '#0070B8' : '#99D6FF';
                _target.style.color = _target.dataset.active ? '#99D6FF' : '#0070B8';
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
                _leaveFeedback.style.display = 'none'
                if (!_target.dataset.active) {
                    _filters.startDate = '';
                    _filters.endDate = '';
                    _startDate.value = '';
                    _endDate.value = '';
                    _leaveFeedback.style.display = 'flex'
                }
            }

            _filtersOptions()

        }
    }

    _readMoreButtons.forEach(_readMoreButton => {
        _readMoreButton.onclick = function () {
            const _feedbackText = this.closest('.personal__feedback').querySelector('.personal__feedback__hidden')
            const _readLess = this.nextElementSibling
            const _feedback = this.parentElement.parentElement.parentElement
            const _viewImage = _feedback.querySelector('.personal__feedback__view__image')

            const h = _feedback.scrollHeight;
            const w = _feedback.scrollWidth;
            const bh = document.body.scrollHeight;
            const bw = document.body.scrollWidth - 20;

            _feedback.style.position = 'absolute'
            _feedback.style.left = ((bw - w) / 2) + "px"
            _feedback.style.top = ((bh - h) / 2) + "px"
            _feedback.style.zIndex = '4'
            if (_viewImage) _viewImage.style.display = 'none'

            _feedbackText.style.display = 'inline'
            _readLess.style.display = 'block'
            this.style.display = 'none'
            _container.className = 'container open__modal'
        }
    })

    _readLessButtons.forEach(_readLessButton => {
        _readLessButton.onclick = function () {
            const _feedbackText = this.closest('.personal__feedback').querySelector('.personal__feedback__hidden')
            const _threeDots = this.closest('.personal__feedback').querySelector('.three__dots')
            const _readMore = this.previousElementSibling
            const _feedback = this.parentElement.parentElement.parentElement
            const _viewImage = _feedback.querySelector('.personal__feedback__view__image')

            _feedback.style.position = 'static'
            _feedback.style.left = "none"
            _feedback.style.top = "none"
            _feedback.style.zIndex = '0'
            if (_viewImage) _viewImage.style.display = 'block'

            _container.className = 'container close__modal'
            _feedbackText.style.display = 'none'
            _readMore.style.display = 'inline'
            _threeDots.style.display = 'inline'
            this.style.display = 'none'
        }
    })

    _feedbacksTexts.forEach(_feedbacksText => {
        const _text = _feedbacksText.textContent
        let HIDDEN_TEXT_COEF = _text.length - 40
        if (_text.length > 40) {
            let _visibleText = _text.substring(0, 40).trim()
            let _hiddenText = _text.slice(-HIDDEN_TEXT_COEF)
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