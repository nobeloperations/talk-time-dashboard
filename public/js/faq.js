window.onload = function() {
    const _openFAQs = document.querySelectorAll('.faq__plus')
    const _closeFAQs = document.querySelectorAll('.faq__close')

    _openFAQs.forEach(_openFAQ => {
        _openFAQ.onclick = function() {
            const _parent = this.parentElement.parentElement
            const _faqInfo = _parent.querySelector('.faq__info')
            const _closeFAQ = _parent.querySelector('.faq__close')
            _faqInfo.style.display = 'block'
            _openFAQ.style.display = 'none'
            _closeFAQ.style.display = 'flex'
        }
    })

    _closeFAQs.forEach(_closeFAQ => {
        _closeFAQ.onclick = function() {
            const _parent = this.parentElement.parentElement
            const _faqInfo = _parent.querySelector('.faq__info')
            const _openFAQ = _parent.querySelector('.faq__plus')
            _faqInfo.style.display = 'none'
            _openFAQ.style.display = 'flex'
            _closeFAQ.style.display = 'none'
        }
    })
}