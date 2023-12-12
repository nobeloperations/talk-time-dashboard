window.onload = function() {
    const _openFAQs = document.querySelectorAll('.faq__plus')
    const _closeFAQs = document.querySelectorAll('.faq__close')

    _openFAQs.forEach(_openFAQ => {
        const _parent = _openFAQ.parentElement.parentElement
        const _closeFAQ = _openFAQ.nextElementSibling;
        const _faqInfo = _parent.querySelector('.faq__info') 

        _openFAQ.onclick = function() {
            _faqInfo.style.display = 'block'
            _openFAQ.style.display = 'none'
            _closeFAQ.style.display = 'flex'
        }
    })

    _closeFAQs.forEach(_closeFAQ => {
        const _openFAQ = _closeFAQ.previousElementSibling;
        const _parent = _openFAQ.parentElement.parentElement
        const _faqInfo = _parent.querySelector('.faq__info')

        _closeFAQ.onclick = function() {
            _faqInfo.style.display = 'none'
            _openFAQ.style.display = 'flex'
            _closeFAQ.style.display = 'none'
        }
    })
}