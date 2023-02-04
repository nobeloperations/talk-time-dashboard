window.onload = function() {
    let _peaksToDelete = document.querySelectorAll('.peaks__wrapper div:nth-child(-n + 3)')
    let _peaks = document.querySelectorAll('.peak')
    let _peaksWrappers = document.querySelectorAll('.peaks__wrapper')
    
    _peaks.forEach(_peak => {
        if(_peak.style.height == '0px') _peak.parentElement.removeChild(_peak)
    })

    _peaksToDelete.forEach(_peakToDelete => {
        _peakToDelete.parentNode.removeChild(_peakToDelete)
    })

    _peaksWrappers.forEach(_peaksWrapper => {
        if(_peaksWrapper.children.length === 1 && _peaksWrapper.children[0].tagName == 'SPAN') {
            _peaksWrapper.querySelector('.user__activity__nodata').style.display = 'inline'
        }
    })
}