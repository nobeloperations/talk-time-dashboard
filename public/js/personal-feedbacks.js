window.onload = function () {
    const _pathName = window.location.pathname.replaceAll('%20', ' ')
    let _closeImageButtons = document.querySelectorAll('.personal__feedback__close__img');
    let _viewImageButtons = document.querySelectorAll('.personal__feedback__view__image');
    let _container = document.querySelector('.container');
    let _personalFeedbacks = document.querySelectorAll('.personal__feedback')
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
    let _ratingsIn = document.querySelectorAll('.rating__in')
    let _ratingsCount = document.querySelectorAll('.rating__count')
    let _averageRating = document.querySelector('.average__rating')
    let _feedbacksCounter = document.querySelector('.feedbacks__counter')
    let _leaveFeedbackLink = document.querySelector('.leave__feedback__link')

    const LOW_RATING = 'LOW'
    const HIGH_RATING = 'HIGH'

    function _getUserFromCookies() {
        const _cookies = document.cookie.split(';')
        let _user = {};
        _cookies.forEach(_cookie => {
            if(_cookie.startsWith('user={')) {
                _user = JSON.parse(_cookie.split('=').at(-1))
            }
        })
        return _user
    }

    const _currentUser = _getUserFromCookies()
    
    if(_leaveFeedback) _leaveFeedback.style.display = _pathName.includes(_currentUser.name) ? 'none' : 'flex'
    if(_leaveFeedbackLink) _leaveFeedbackLink.style.display = _pathName.includes(_currentUser.name) ? 'none' : 'flex'


    const _ratingOptions = {
        1: {
            percentage: 0,
            count: 0
        },
        2: {
            percentage: 0,
            count: 0
        },
        3: {
            percentage: 0,
            count: 0
        },
        4: {
            percentage: 0,
            count: 0
        },
        5: {
            percentage: 0,
            count: 0
        },
    }

    const _filters = {
        image: false,
        rating: '',
        startDate: null,
        endDate: null,
    };

    function _filtersOptions() {
        let _counter = 0;
        _personalFeedbacks.forEach((_feedback) => {
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
                    if (!_pathName.includes(_currentUser.name)) _leaveFeedback.style.display = 'flex';
                }
            }

            _filtersOptions()

        }
    }

    _readMoreButtons.forEach(_readMoreButton => {
        _readMoreButton.onclick = function () {
            const _threeDots = this.parentElement.parentElement.parentElement.querySelector('.three__dots');
            const _feedbackText = this.closest('.personal__feedback').querySelector('.personal__feedback__hidden')
            const _readLess = this.nextElementSibling
            const _feedback = this.parentElement.parentElement.parentElement
            const _viewImage = _feedback.querySelector('.personal__feedback__view__image')

            const _h = _feedback.scrollHeight;
            const _w = _feedback.scrollWidth;
            const _bh = document.body.scrollHeight;
            const _bw = document.body.scrollWidth - 20;

            _feedback.style.position = 'absolute'
            _feedback.style.left = ((_bw - _w) / 2) + "px"
            _feedback.style.top = ((_bh - _h) / 2) + "px"
            _feedback.style.zIndex = '4'
            
            if (_viewImage) _viewImage.style.display = 'none'

            _feedbackText.style.display = 'inline'
            _readLess.style.display = 'block'
            this.style.display = 'none'
            _container.className = 'container open__modal'
            _threeDots.style.display = 'none'
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

    let _ratingSum = 0

    _personalFeedbacks.forEach(_feedback => {
        const _rating = _feedback.dataset.rating;
        _ratingSum += +_rating
        const _ratingElements = _feedback.querySelectorAll(`.rating:nth-child(-n + ${_rating})`)
        _ratingElements.forEach(_ratingElement => {
            _ratingElement.innerHTML = '★'
        })
        if (_ratingOptions[_rating]) _ratingOptions[_rating]['count']++
        else _ratingOptions[_rating]['count'] = 1
    })
    let _ratingCounter = 0
    for (key in _ratingOptions) {
        _ratingCounter += _ratingOptions[key].count;
    }
    for (key in _ratingOptions) {
        _ratingOptions[key].percentage = Math.floor((_ratingOptions[key].count / _ratingCounter) * 100)
    }

    _ratingsIn.forEach((_ratingIn, idx) => {
        let _ratingCount = _ratingsCount[idx].dataset.ratingcount
        let _ratingMark = _ratingIn.dataset.ratingin;
        _ratingIn.style.width = `${_ratingOptions[_ratingMark].percentage}%`
        _ratingIn.style.height = '100%'
        _ratingsCount[idx].textContent = _ratingOptions[_ratingCount].count
    })

    _averageRating.innerHTML = `<b style="color: #F1C40F;">★</b> ${(_ratingSum / _ratingCounter).toFixed(1)}`
    _feedbacksCounter.textContent = `(${_personalFeedbacks.length} feedbacks)`

    _viewImageButtons.forEach(_viewImageButton => {
        _viewImageButton.onclick = function () {
            let _currentImage = this.parentElement.parentElement.parentElement.nextElementSibling
            _currentImage.style.visibility = 'visible'
            _currentImage.style.opacity = '1'
            _container.className = 'container open__modal'
        }
    })
    _closeImageButtons.forEach(_closeImageButton => {
        _closeImageButton.onclick = function () {
            const _currentImage = this.parentElement
            _currentImage.style.visibility = 'hidden'
            _currentImage.style.opacity = '0'
            _container.className = 'container close__modal'
        }
    })
}